import { PricingPlan } from "@/types";

// update this data to your prefer pricing plans
// if you choose to support yearly, copy one of the object below and paste then change to yearly
// also include the variant for that option created.

/**
 * Variants
 * @test_variant_id is the id of the variant created in your lemonsqueezy dashboard and should be used in development mode
 * @id is the id of the plan for lemonsqueezy store in production and not test_mode.
 * 
 * When creating checkout, the variant test_variant_id and id would be switched depending on the mode (development or production)
 * Once your store Activated ( not test mode) you would need to create a new variant for the plan and update the id. Follow this guide https://docs.tryveloz.com/payments#collecting-payment
 
*/

export const pricingPlans = [
  {
    id: "lite_84507",
    name: "Lite",
    key: "lite",
    variants: [
      {
        id: 183156,
        test_variant_id: 183156,
        duration: "monthly",
        pricing: {
          currency: "USD",
          amount: 4,
        },
      },
      {
        id: 198725,
        test_variant_id: 198725,
        duration: "yearly",
        pricing: {
          currency: "USD",
          amount: 48,
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
        test_variant_id: 183213,
        duration: "yearly",
        pricing: {
          currency: "USD",
          amount: 108,
        },
      },
      {
        id: 198720,
        test_variant_id: 198720,
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
        test_variant_id: 180561,
        duration: "monthly",
        pricing: {
          currency: "USD",
          amount: 20,
        },
      },
      {
        id: 198727,
        test_variant_id: 198727,
        duration: "yearly",
        pricing: {
          currency: "USD",
          amount: 240,
        },
      },
    ],
    product_id: 147501,
  },
] satisfies PricingPlan[];
