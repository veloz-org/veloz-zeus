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
  subscriptions: UserSubscriptions[];
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
  variant_id: number;
  product_id: number;
}

// pricing plan feature Types Definition
export interface PricingPlanFeature {
  id: string;
  features: {
    title: string;
    isAvailable: boolean;
  }[];
}

export type UserSubscriptions = {
  id: string;
  status: LS_SubscriptionStatus;
  product_id: string;
  product_name: string;
  variant_id: string;
  variant_name: string;
  ends_at: string;
  renews_at: string;
  created_at: string;
};

export type LS_SubscriptionStatus =
  | "on_trial"
  | "active"
  | "paused"
  | "past_due"
  | "unpaid"
  | "cancelled"
  | "expired";
