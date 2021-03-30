import * as mongoose from "mongoose";

// define the product model (fields and data types)
const draft_order_model = new mongoose.Schema({
  internal_id: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    required: false,
  },
  draft_order: {
    type: Object,
    required: false,
  },
  epoch_start_time: {
    type: Number,
    required: false,
  },
  epoch_end_time: {
    type: Number,
    required: false,
  },
  click_and_collect_time: {
    type: String,
    required: false,
  },
  click_and_collect_date: {
    type: String,
    required: false,
  },
  origin: {
    type: String,
    required: false,
  },
  group_number: {
    type: String,
    required: false,
  },
  items: {
    type: Array,
    required: false,
  },
  store_name: {
    type: String,
    required: false,
  },
  store_id: {
    type: String,
    required: false,
  },
  brauz_order_id: {
    type: String,
    required: false,
  },
  brauz_JSON_request: {
    type: String,
    required: false,
  },
  brauz_JSON_response: {
    type: String,
    required: false,
  },
  shopify_order_number: {
    type: String,
    required: false,
  },
  shopify_order_id: {
    type: String,
    required: false,
  },
});

export default mongoose.model("draft-order", draft_order_model);
