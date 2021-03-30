// apis
import * as ShopifyApi from "../api/ShopifyApi";

// utilities
import { makeARequest } from "../../utilities/api";

export default class ShopifyService {
  constructor({ origin, shopify_access_token }) {
    this.origin = origin;
    this.shopify_access_token = shopify_access_token;
  }

  async getProductByProductId(product_id) {
    const data = await makeARequest({
      name: "Get product by product ID",
      is_check_success: false,
      requestFunction: ShopifyApi.getProductByProductId,
      payload: {
        origin: this.origin,
        shopify_access_token: this.shopify_access_token,
        product_id,
      },
    });

    return data;
  }

  async getProductHandleByProductId(product_id) {
    const {
      data: { product: { handle } = {} } = {},
    } = await this.getProductByProductId(product_id);

    return handle;
  }

  async getVariantByVariantId(variant_id) {
    const data = await makeARequest({
      name: "Get variant by variant ID",
      is_check_success: false,
      requestFunction: ShopifyApi.getVariantByVariantId,
      payload: {
        origin: this.origin,
        shopify_access_token: this.shopify_access_token,
        variant_id,
      },
    });

    const { data: { variant = {} } = {} } = data;

    return variant;
  }

  async getVariantsByProductId({ product_id }) {
    const data = await makeARequest({
      name: "Get variants by product ID",
      is_check_success: false,
      requestFunction: ShopifyApi.getVariantsByProductId,
      payload: {
        origin: this.origin,
        shopify_access_token: this.shopify_access_token,
        product_id,
      },
    });

    return data;
  }

  async getProductImagesByProductId(product_id) {
    const data = await makeARequest({
      name: "Get product images by product ID",
      is_check_success: false,
      requestFunction: ShopifyApi.getProductImagesByProductId,
      payload: {
        origin: this.origin,
        shopify_access_token: this.shopify_access_token,
        product_id,
      },
    });

    const { data: { images = [] } = {} } = data;
    const image_urls = images.map(({ src = "" }) => src);
    return image_urls;
  }

  async getProductImageByProductIdAndImageId({ product_id, image_id }) {
    const data = await makeARequest({
      name: "Get product images by product ID and image ID",
      is_check_success: false,
      requestFunction: ShopifyApi.getProductImageByProductIdAndImageId,
      payload: {
        origin: this.origin,
        shopify_access_token: this.shopify_access_token,
        product_id,
        image_id,
      },
    });

    const { data: { image: { src = "" } = {} } = {} } = data;
    return src;
  }

  async createDraftOrder({ draft_order }) {
    const data = await makeARequest({
      name: "Place draft order",
      is_check_success: false,
      requestFunction: ShopifyApi.createDraftOrder,
      payload: {
        origin: this.origin,
        shopify_access_token: this.shopify_access_token,
        draft_order,
      },
    });

    return data;
  }
}
