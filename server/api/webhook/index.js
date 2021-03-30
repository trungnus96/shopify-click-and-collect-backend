// services
import * as BrauzService from "../services/BrauzService";
import ShopifyService from "../services/ShopifyService";

// constants
import {
  FULFILLMENT_METHOD_KEY,
  FULFILLMENT_METHOD_VALUE_CLICK_AND_COLLECT,
  INTERNAL_ID_KEY,
} from "../../constants";
import { COLLECTION_NAME_SHOPIFY_DRAFT_ORDER } from "../../constants/firebase";

// firebase
import { db } from "../../libs/firebase";

// router
const router = require("express").Router();

import json_data from "./order.json";

router.all(`/order-creation`, async (req, res) => {
  try {
    const origin = "https://brauz-store.myshopify.com";

    // get Shopify access token
    var {
      error_message,
      shopify_access_token,
    } = await BrauzService.getShopifyAccessTokenFromBrauzDB();

    if (error_message) {
      return res.status(401).json({
        message: error_message,
      });
    }

    if (!shopify_access_token) {
      return res.status(401).json({
        message: "Access token not found",
      });
    }

    const shopifyService = new ShopifyService({
      shopify_access_token,
      origin,
    });

    const { line_items = [] } = json_data;

    // find Click & Collect line items
    const click_and_collect_line_items = line_items.filter((line_item) => {
      const { properties = [] } = line_item;

      if (properties.length === 0) {
        return false;
      }

      const fulfillment_method_property = properties.find((property) => {
        const values = Object.values(property);

        if (
          values.indexOf(FULFILLMENT_METHOD_KEY) !== -1 &&
          values.indexOf(FULFILLMENT_METHOD_VALUE_CLICK_AND_COLLECT) !== -1
        ) {
          return true;
        }

        return false;
      });

      if (fulfillment_method_property) {
        return true;
      }

      return false;
    });

    if (click_and_collect_line_items.length === 0) {
      return res.json({
        success: true,
        message: "No click & collect items found",
      });
    }

    // console.log({ click_and_collect_line_items });

    // find Ref (internal ID) in Click & Collect line items
    const [
      first_click_and_collect_line_item = {},
    ] = click_and_collect_line_items;
    const { properties = [] } = first_click_and_collect_line_item;

    const internal_id = properties.find(
      (property) => property.name === INTERNAL_ID_KEY
    ).value;

    const shopify_draft_order_ref = db.collection(
      COLLECTION_NAME_SHOPIFY_DRAFT_ORDER
    );

    const query = shopify_draft_order_ref.where(
      "internal_id",
      "==",
      internal_id
    );

    const snapshot = await query.get();

    if (snapshot.empty) {
      // not found??? impossible
      // log error
      return res.status(200).json({
        success: false,
      });
    } else {
      let draft_order_id = "";
      let epoch_start_time = Date.now();
      let epoch_end_time = Date.now();
      let group_number = "";
      let store_id = "";

      snapshot.forEach((doc) => {
        const data = doc.data();
        draft_order_id = data.draft_order_id;
        epoch_start_time = data.epoch_start_time;
        epoch_end_time = data.epoch_end_time;
        group_number = data.group_number;
        store_id = data.store_id;
      });

      const {
        customer = {},
        total_price_set = {},
        id: order_id,
        order_number,
      } = json_data;

      const {
        first_name,
        last_name,
        phone: phone_number = "N/A",
        email,
      } = customer;

      const { shop_money: { amount: total_price } = {} } = total_price_set;

      let items = [];
      for (let i = 0; i < line_items.length; i++) {
        const line_item = line_items[i];
        const {
          id,
          variant_id,
          quantity,
          variant_title,
          vendor,
          name,
          price,
          total_discount,
        } = line_item;

        let image_url = "";
        let page_url = "";

        const variant = await shopifyService.getVariantByVariantId(variant_id);

        if (variant) {
          const { product_id, image_id } = variant;

          if (image_id) {
            // get product image from product ID, image ID
            const _image_url = await shopifyService.getProductImageByProductIdAndImageId(
              {
                product_id,
                image_id,
              }
            );

            image_url = _image_url;
          } else {
            // get product images from product ID
            const image_urls = await shopifyService.getProductImagesByProductId(
              product_id
            );

            const [first_image_url = ""] = image_urls;

            image_url = first_image_url;
          }

          if (product_id) {
            const product_handle = await shopifyService.getProductHandleByProductId(
              "6626997010601"
            );

            page_url = `${origin}/products/${product_handle}`;
          }
        }

        if (!image_url) {
          image_url = "";
        }

        if (!page_url) {
          page_url = "";
        }

        let item = {
          brand: vendor,
          image_url,
          third_party_order_line_item_id: id,
          list_price: Number(price),
          name,
          page_url,
          qty: 1,
          store_thirdparty_id: store_id,
          thirdparty_id: variant_id,
          selected_attributes: [],
        };

        if (variant_title) {
          item = {
            ...item,
            selected_attributes: [{ type: "Variant", value: variant_title }],
          };
        }

        const sale_price = Number(price) - Number(total_discount);

        if (isNaN(sale_price) === false && Number(sale_price) < Number(price)) {
          item = {
            ...item,
            sale_price: Number(sale_price),
          };
        }

        // if quantity is 2 => create 2 items; and so on
        let _items = [];
        for (let j = 0; j < quantity; j++) {
          _items = [..._items, item];
        }

        items = [...items, ..._items];
      }

      const payload = {
        click_n_collect: {
          time_from: epoch_start_time,
          time_to: epoch_end_time,
        },
        confirm_on_session: true,
        customer: {
          email,
          first_name,
          last_name,
          phone_number: phone_number ? phone_number : "N/A",
        },
        group_number,
        order_id,
        third_party_order_number: order_number,
        items,
        metadata: {
          event_id: order_id,
        },
        payment_gateway: {
          card_details_token: "Shopify sale transaction ID",
          payment_gateway: "SHOPIFY",
        },
        total_price,
      };

      return res.status(200).json({
        success: true,
        internal_id,
        payload,
      });
    }
  } catch (e) {
    return res.json({
      success: false,
      message: e.toString(),
    });
  }
});

export default router;
