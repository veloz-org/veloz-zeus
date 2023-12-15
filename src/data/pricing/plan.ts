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
    product_id: "",
    variant_id: "",
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
    product_id: "",
    variant_id: "",
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
    product_id: "",
    variant_id: "",
  },
] satisfies PricingPlan[];
