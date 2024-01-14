import { PricingPlanFeature } from "@/types";

const pricingPlanFeatures = [
  {
    id: "lite_84507",
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
        isAvailable: false,
      },
      {
        title: "Lifetime Updates",
        isAvailable: false,
      },
      {
        title: "Advanced features",
        isAvailable: false,
      },
    ],
  },
  {
    id: "basic_104548",
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
    id: "premium_123918",
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
] satisfies PricingPlanFeature[];

export default pricingPlanFeatures;
