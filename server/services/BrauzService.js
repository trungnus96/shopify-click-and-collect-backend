// apis
import * as BrauzApi from "../api/BrauzApi";

// utilities
import { makeARequest } from "../utilities/api";

export async function getShopifyAccessTokenFromBrauzDB() {
  return {
    shopify_access_token: `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`,
  };
}

export async function lookUpGroupNumberFromEcommerceData() {
  return {
    group_number: `TC_shBq`,
  };
}
