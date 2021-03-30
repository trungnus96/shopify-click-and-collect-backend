import { createAxiosRequest } from "./Axios";

// constants
import { BRAUZ_API_URL, BRAUZ_API_URL_LAMBDA } from "../constants/env";

// utilities
import { toUrlEncoded } from "../utilities";

export function getShopifyAccessTokenFromBrauzDB({ domain }) {
  const url =
    `${BRAUZ_API_URL_LAMBDA}/extensions?` +
    toUrlEncoded({ domain, service_code: "3", ecommerce_type: "SHOPIFY" });

  return createAxiosRequest({
    url,
    method: "GET",
  });
}

export function lookUpGroupNumberFromEcommerceData({ client_id }) {
  const url =
    `${BRAUZ_API_URL}/thirdparty/group_number` +
    "?" +
    toUrlEncoded({ client_id, platform: "SHOPIFY" });

  const config = createAxiosConfig(url, "get", {}, {});

  return axios(config);
}
