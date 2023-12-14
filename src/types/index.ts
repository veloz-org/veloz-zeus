// Client Types Definition

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
  duration: string;
  pricing: {
    currency: string;
    amount: number;
  };
}

// pricing plan feature Types Definition
export interface PricingPlanFeature {
  plan_key: string;
  features: {
    title: string;
    isAvailable: boolean;
  }[];
}
