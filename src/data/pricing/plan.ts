import { PricingPlan } from "@/types";

// update this data to your prefer pricing plan
export const pricingPlans = [
  {
    id: "free_84507",
    name: "Free",
    key: "free",
    duration: "monthly",
    pricing: {
      currency: "USD",
      amount: 0,
    },
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
  },
] satisfies PricingPlan[];
