import { PricingPlan } from "@/types";

// update this data to your prefer pricing plans
// if you choose to support yearly, copy one of the object below and paste then change to yearly
// also include the variant for that option created.

export const pricingPlans = [
  {
    id: "lite_84507",
    name: "Lite",
    key: "lite",
    duration: "monthly",
    pricing: {
      currency: "USD",
      amount: 4,
    },
    product_id: 147184,
    variant_id: 183156,
  },
  {
    id: "basic_104548",
    name: "Basic",
    key: "basic",
    duration: "monthly",
    pricing: {
      currency: "USD",
      amount: 9,
    },
    product_id: 149209,
    variant_id: 183213,
  },
  {
    id: "premium_123918",
    name: "Premium",
    key: "premium",
    duration: "monthly",
    pricing: {
      currency: "USD",
      amount: 20,
    },
    product_id: 147501,
    variant_id: 180561,
  },
] satisfies PricingPlan[];
