import { CurrentUserPlan, LS_SubscriptionStatus } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { signOut } from "next-auth/react";
import { pricingPlans } from "@/data/pricing/plan";

dayjs.extend(relativeTime);

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// format number to 100, 10k, 1M, 1B, 1T, etc
export function formatNumber(number: number) {
  // International number formatting
  let formatter = Intl.NumberFormat("en", { notation: "compact" });
  return formatter.format(number);
}

// currencyFormatter
export function currencyFormatter(number: number, currency: string) {
  let formatter = Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency ?? "USD",
  });
  return formatter.format(number);
}

// format number to 100,000, 10,000,000, 1,000,000,000, etc
export function numberWithCommas(x: number) {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
}

export function generateSubscriptionRenewalMessage(
  status: LS_SubscriptionStatus,
  renews_at: string
) {
  if (status === "active") {
    return `Renew on ${dayjs(renews_at).format(`ddd MMM D, YYYY`)}`;
  } else if (status === "on_trial") {
    return `Trial ends on ${dayjs(renews_at).format("ddd MMM DD, YYYY")}`;
  } else if (status === "cancelled") {
    return `To be cancelled on ${dayjs(renews_at).format("ddd MMM DD, YYYY")}`;
  } else {
    return "";
  }
}

export const Logout = () => {
  // next-auth
  signOut();
};

export const getCurrUserPlan = (
  product_id: string,
  current_subscription: CurrentUserPlan | null
) => {
  if (!current_subscription) return null;

  const planDetail = pricingPlans.find(
    (p) => String(p.product_id) === String(product_id)
  );
  const currVariant = planDetail?.variants.find(
    (v) => String(v.id) === String(current_subscription?.variant_id)
  );
  const plan_name = planDetail?.name;
  const plan_price = currVariant?.pricing.amount as number;
  const plan_currency = currVariant?.pricing.currency as string;
  const duration = currVariant?.duration as string;

  return {
    plan_name,
    plan_price,
    plan_currency,
    duration,
  };
};
