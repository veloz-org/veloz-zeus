import { PricingPlanFeature } from "@/types";

const pricingPlanFeatures = [
  {
    plan_key: "free",
    features: [
      {
        title: "1 User",
        isAvailable: true,
      },
      {
        title: "3 Projects",
        isAvailable: true,
      },
      {
        title: "500MB Storage",
        isAvailable: true,
      },
      {
        title: "Email Support",
        isAvailable: true,
      },
      {
        title: "Lifetime Updates",
        isAvailable: true,
      },
      {
        title: "Free",
        isAvailable: true,
      },
    ],
  },
  {
    plan_key: "basic",
    features: [
      {
        title: "1 User",
        isAvailable: true,
      },
      {
        title: "10 Projects",
        isAvailable: true,
      },
      {
        title: "2GB Storage",
        isAvailable: true,
      },
      {
        title: "Email Support",
        isAvailable: true,
      },
      {
        title: "Lifetime Updates",
        isAvailable: true,
      },
      {
        title: "Free",
        isAvailable: true,
      },
    ],
  },
  {
    plan_key: "premium",
    features: [
      {
        title: "5 User",
        isAvailable: true,
      },
      {
        title: "50 Projects",
        isAvailable: true,
      },
      {
        title: "20GB Storage",
        isAvailable: true,
      },
      {
        title: "Email Support",
        isAvailable: true,
      },
      {
        title: "Lifetime Updates",
        isAvailable: true,
      },
      {
        title: "Free",
        isAvailable: true,
      },
    ],
  },
  {
    plan_key: "enterprise",
    features: [
      {
        title: "Unlimited User",
        isAvailable: true,
      },
      {
        title: "Unlimited Projects",
        isAvailable: true,
      },
      {
        title: "Unlimited Storage",
        isAvailable: true,
      },
      {
        title: "Email Support",
        isAvailable: true,
      },
      {
        title: "Lifetime Updates",
        isAvailable: true,
      },
      {
        title: "Free",
        isAvailable: true,
      },
    ],
  },
] satisfies PricingPlanFeature[];

export default pricingPlanFeatures;
