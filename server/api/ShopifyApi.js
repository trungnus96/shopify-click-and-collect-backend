import { createAxiosRequest } from "./Axios";

// constants
const SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME = `X-Shopify-Access-Token`;

export function getProductByProductId(payload) {
  const { origin, product_id, shopify_access_token } = payload;
  const url = `${origin}/admin/api/2021-01/products/${product_id}.json`;

  return createAxiosRequest({
    url,
    method: "GET",
    headers: {
      [SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME]: shopify_access_token,
    },
  });
}

export function getVariantByVariantId(payload) {
  const { origin, variant_id, shopify_access_token } = payload;
  const url = `${origin}/admin/api/2021-01/variants/${variant_id}.json`;

  return createAxiosRequest({
    url,
    method: "GET",
    headers: {
      [SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME]: shopify_access_token,
    },
  });
}

export function getVariantsByProductId(payload) {
  const { origin, product_id, shopify_access_token } = payload;
  const url = `${origin}/admin/api/2021-01/products/${product_id}/variants.json`;

  return createAxiosRequest({
    url,
    method: "GET",
    headers: {
      [SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME]: shopify_access_token,
    },
  });
}

export function getProductImagesByProductId(payload) {
  const { origin, product_id, shopify_access_token } = payload;
  const url = `${origin}/admin/api/2021-01/products/${product_id}/images.json`;

  return createAxiosRequest({
    url,
    method: "GET",
    headers: {
      [SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME]: shopify_access_token,
    },
  });
}

export function getProductImageByProductIdAndImageId(payload) {
  const { origin, product_id, image_id, shopify_access_token } = payload;
  const url = `${origin}/admin/api/2021-01/products/${product_id}/images/${image_id}.json`;

  return createAxiosRequest({
    url,
    method: "GET",
    headers: {
      [SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME]: shopify_access_token,
    },
  });
}

export function createDraftOrder(payload) {
  const { origin, shopify_access_token, draft_order = {} } = payload;
  const url = `${origin}/admin/api/2021-01/draft_orders.json`;

  return createAxiosRequest({
    url,
    method: "POST",
    payload: {
      draft_order,
    },
    headers: {
      [SHOPIFY_ACCESS_TOKEN_HEADER_FIELD_NAME]: shopify_access_token,
    },
  });
}
