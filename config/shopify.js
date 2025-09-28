import "@shopify/shopify-api/adapters/node";
import { shopifyApi, ApiVersion } from "@shopify/shopify-api";
import { restResources } from "@shopify/shopify-api/rest/admin/2025-01";
import dotenv from "dotenv";

dotenv.config();

const shopify = shopifyApi({
  apiKey: process.env.API_KEY,
  apiSecretKey: process.env.API_SECRET,
  scopes: [
    "write_assigned_fulfillment_orders",
    "read_assigned_fulfillment_orders",
    "write_draft_orders",
    "read_draft_orders",
    "write_merchant_managed_fulfillment_orders",
    "read_merchant_managed_fulfillment_orders",
    "write_order_edits",
    "read_order_edits",
    "write_orders",
    "read_orders",
    "write_script_tags",
    "read_script_tags",
    "write_third_party_fulfillment_orders",
    "read_third_party_fulfillment_orders",
    "write_products",
    "read_products",
    "write_publications",
    "read_publications",
    "write_customers",
    "read_customers",
    "write_discounts",
    "read_discounts",
    "write_price_rules",
    "read_price_rules",
    "write_discounts_allocator_functions",
    "read_discounts_allocator_functions",
  ],
  hostName: process.env.HOST_NAME,
  restResources,
  apiVersion: ApiVersion.January25,
});

const session = {
  shop: process.env.SHOP_NAME,
  accessToken: process.env.ADMIN_API_ACCESS_TOKEN,
};

export { shopify, session };
