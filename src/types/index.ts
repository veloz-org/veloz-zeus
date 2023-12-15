// Client Types Definition

export type ValidPricingDuration = "daily" | "weekly" | "monthly" | "yearly";

export type ResponseData = {
  errorStatus: boolean;
  message: string;
  code: string;
  statusCode: number;
  data?: any;
  error?: {
    message: string;
    error: any;
  };
};

export type UserInfo = {
  username: string;
  email: string;
  avatar: string;
  id: string;
  role: string;
};

// pricing plan Types Definition
export interface PricingPlan {
  id: any;
  name: string;
  key: string;
  duration: ValidPricingDuration;
  pricing: {
    currency: string;
    amount: number;
  };
  variant_id: string;
  product_id: string;
}

// pricing plan feature Types Definition
export interface PricingPlanFeature {
  id: string;
  features: {
    title: string;
    isAvailable: boolean;
  }[];
}
