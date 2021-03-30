// services
import * as BrauzService from "../../services/BrauzService";
import ShopifyService from "../../services/ShopifyService";

// constants
import {
  FULFILLMENT_METHOD_KEY,
  FULFILLMENT_METHOD_VALUE_CLICK_AND_COLLECT,
  FULFILLMENT_METHOD_VALUE_DELIVERY,
  INTERNAL_ID_KEY,
} from "../../constants";

// utilities
import { generateUniqueId } from "../../utilities";

// db & model dependencies
import DraftOrder from "../../models/draft-order";

// router
const router = require("express").Router();

router.post(`/create-draft-order`, async (req, res) => {
  try {
    const {
      origin,
      group_number,
      items = [],
      epoch_start_time,
      epoch_end_time,
      click_and_collect_time,
      click_and_collect_date,
      store_name,
      store_id,
    } = req.body;

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

    const unique_id = generateUniqueId({ group_number });

    let line_items = [];

    const pick_up_date_time_string = `${click_and_collect_time}, ${click_and_collect_date}`;

    items.forEach((item) => {
      const { quantity, variant_id, is_click_and_collect = false } = item;

      let properties = [];

      if (is_click_and_collect === true) {
        // click & collect
        properties = [
          {
            name: INTERNAL_ID_KEY,
            value: unique_id,
          },
          {
            name: FULFILLMENT_METHOD_KEY,
            value: FULFILLMENT_METHOD_VALUE_CLICK_AND_COLLECT,
          },
          {
            name: "location_id",
            value: store_id,
          },
          {
            name: "store_name",
            value: store_name,
          },
          {
            name: "pick_up_time",
            value: pick_up_date_time_string,
          },
        ];
      } else {
        // delivery
        // click & collect
        properties = [
          {
            name: FULFILLMENT_METHOD_KEY,
            value: FULFILLMENT_METHOD_VALUE_DELIVERY,
          },
        ];
      }

      line_items = [
        ...line_items,
        {
          quantity,
          variant_id,
          properties,
        },
      ];
    });

    const draft_order = {
      line_items,
      shipping_line: {
        price: 0,
        custom: true,
        title: `Pickup from ${store_name}, ${pick_up_date_time_string}`,
      },
    };

    const shopifyService = new ShopifyService({
      shopify_access_token,
      origin,
    });

    var { error_message, data = {} } = await shopifyService.createDraftOrder(
      draft_order
    );

    const { draft_order: _draft_order = {} } = data;
    const { invoice_url = "", id: draft_order_id = "" } = _draft_order;

    await DraftOrder.create({
      internal_id: unique_id,
      status: "draft",
      draft_order: _draft_order,
      epoch_start_time: `1617091401000`,
      epoch_end_time: `1617091401000`,
      click_and_collect_time,
      click_and_collect_date,
      origin: "https://brauz-store.myshopify.com",
      group_number: "trunggroupnumber",
      items,
      store_name,
      store_id,
    });

    return res.status(200).json({
      success: true,
      invoice_url,
      success: true,
      draft_order,
      data,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: e.toString(),
    });
  }
});

export default router;
