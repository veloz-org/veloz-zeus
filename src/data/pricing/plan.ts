import { PricingPlan } from "@/types";

// update this data to your prefer pricing plans
// if you choose to support yearly, copy one of the object below and paste then change to yearly
// also include the variant for that option created.

export const pricingPlans = [
  {
    id: "lite_84507",
    name: "Lite",
    key: "lite",
    variants: [
      {
        id: 183156,
        duration: "monthly",
        pricing: {
          currency: "USD",
          amount: 4,
        },
      },
      {
        id: 198725,
        duration: "yearly",
        pricing: {
          currency: "USD",
          amount: 4,
        },
      },
    ],
    product_id: 147184,
  },
  {
    id: "basic_104548",
    name: "Basic",
    key: "basic",
    variants: [
      {
        id: 183213,
        duration: "yearly",
        pricing: {
          currency: "USD",
          amount: 8,
        },
      },
      {
        id: 183213,
        duration: "monthly",
        pricing: {
          currency: "USD",
          amount: 9,
        },
      },
    ],
    product_id: 149209,
    recommended: true,
  },
  {
    id: "premium_123918",
    name: "Premium",
    key: "premium",
    variants: [
      {
        id: 180561,
        duration: "monthly",
        pricing: {
          currency: "USD",
          amount: 20,
        },
      },
      {
        id: 198727,
        duration: "yearly",
        pricing: {
          currency: "USD",
          amount: 108,
        },
      },
    ],
    product_id: 147501,
  },
] satisfies PricingPlan[];
