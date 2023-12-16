import {
  FlexColStart,
  FlexColStartCenter,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Button from "@/components/ui/button";
import { DataContext } from "@/context/DataContext";
import { pricingPlans } from "@/data/pricing/plan";
import { getCustomerPortal } from "@/http/requests";
import {
  cn,
  currencyFormatter,
  generateSubscriptionRenewalMessage,
} from "@/lib/utils";
import { ResponseData, UserSubscriptions } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { CheckCheck, Wallet, X } from "lucide-react";
import React, { useContext } from "react";
import toast from "react-hot-toast";

function BillingTab() {
  const { subscribed_plans, userInfo } = useContext(DataContext);
  const getCustomerPortalMut = useMutation({
    mutationFn: async (data: any) => await getCustomerPortal(data),
  });

  React.useEffect(() => {
    if (getCustomerPortalMut.error) {
      const errMsg = (getCustomerPortalMut.error as any)?.response?.data
        ?.message;
      toast.error(errMsg);
    }
    if (getCustomerPortalMut.data) {
      const { data } = getCustomerPortalMut.data as ResponseData;
      window.open(data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    getCustomerPortalMut.data,
    getCustomerPortalMut.error,
    getCustomerPortalMut.isPending,
  ]);

  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full">
        <p className="text-dark-100 dark:text-white-100 font-ppSB text-[15px] ">
          Plan
        </p>
        <p className="text-white-400 dark:text-white-300 font-ppReg text-[12px] ">
          {userInfo?.subscriptions.length === 0
            ? "No active subscription plan."
            : "Manage your subscription plans."}
        </p>
        {/* pricing plans */}
        <FlexRowStart className="w-full mt-2 flex-wrap">
          {userInfo &&
            userInfo?.subscriptions.length > 0 &&
            pricingPlans
              .filter((p) => {
                const subscriptions = userInfo.subscriptions.map(
                  (s) => s.product_id
                );
                return (
                  userInfo.role === "admin" ||
                  subscriptions.includes(String(p.product_id))
                );
              })
              .map((plan, i) => (
                <PricingPlanCard
                  key={i}
                  activePlan={
                    subscribed_plans.includes(String(plan.product_id))
                      ? plan.key
                      : null
                  }
                  product_id={plan.product_id}
                  planName={plan.name}
                  planPrice={plan.pricing.amount}
                  currency={plan.pricing.currency}
                  duration={plan.duration as any}
                  subscriptions={userInfo?.subscriptions as any}
                  getCustomerPortal={(prodId) => {
                    getCustomerPortalMut.mutate({ product_id: prodId });
                  }}
                  loading={getCustomerPortalMut.isPending}
                />
              ))}
        </FlexRowStart>
        <br />
      </FlexColStart>
    </FlexColStart>
  );
}

export default BillingTab;

type PricingPlanCardProps = {
  product_id: number;
  activePlan: string | "free" | null;
  planName: string;
  planPrice: number;
  currency: string;
  duration: "monthly" | "yearly" | "weekly" | "daily";
  subscriptions: UserSubscriptions[];
  getCustomerPortal: (prodId: string) => void;
  loading: boolean;
};

function PricingPlanCard({
  activePlan,
  planName,
  planPrice,
  currency,
  duration,
  subscriptions,
  product_id,
  getCustomerPortal,
  loading,
}: PricingPlanCardProps) {
  const _subscription = subscriptions?.find(
    (s) => s.product_id === String(product_id)
  );
  const msg = generateSubscriptionRenewalMessage(
    _subscription?.status as any,
    _subscription?.renews_at as any
  );

  return (
    <FlexColStart
      className={cn(
        "w-full max-w-[250px] py-3 px-4 rounded-md border-solid border-transparent",
        activePlan
          ? "bg-blue-201 dark:bg-dark-102 border-[2px] border-blue-101 "
          : "bg-blue-101"
      )}
    >
      <FlexRowStartBtw className="w-full">
        <p
          className={cn(
            "text-dark-100 dark:text-white-100 font-ppSB text-[13px] ",
            activePlan ? "text-dark-100 dark:text-white-100" : "text-white-100"
          )}
        >
          {planName}
        </p>
        <p
          className={cn(
            "font-ppL text-[13px] ",
            !activePlan
              ? "text-white-100/70 dark:text-white-300"
              : "text-white-400"
          )}
        >
          <span
            className={cn(
              "font-ppSB",
              activePlan
                ? "text-dark-100 dark:text-white-300"
                : " text-white-100"
            )}
          >
            {currencyFormatter(planPrice, currency)}
          </span>{" "}
          / {duration.replace("ly", "")}
        </p>
      </FlexRowStartBtw>
      <FlexColStart className="w-full mt-2">
        <FlexRowStartCenter>
          {_subscription ? (
            _subscription?.status !== "active" ? (
              <X className="text-red-305" size={15} />
            ) : (
              <CheckCheck size={15} className="text-blue-100" />
            )
          ) : null}
          <p
            className={cn(
              "font-ppReg text-[10px]",
              activePlan ? "text-blue-100" : "text-white-100"
            )}
          >
            {msg ?? "Not Subscribed"}
          </p>
        </FlexRowStartCenter>
        {_subscription && (
          <Button
            intent={"primary"}
            className={cn(
              "h-[35px] bg-blue-201 group hover:bg-blue-101 hover:text-white-100 py-0 px-5 border-solid border-[1px]  border-blue-101 ",
              activePlan
                ? " disabled:text-white-400 hover:bg-blue-101 hover:text-white-100 text-blue-100 dark:bg-blue-101 dark:text-white-100 dark:hover:bg-blue-101/80 dark:disabled:text-white-100/40"
                : "disabled:bg-blue-201/40 disabled:text-white-100 hover:bg-blue-201/40 text-blue-101"
            )}
            onClick={() => getCustomerPortal(String(product_id))}
            disabled={loading}
          >
            <Wallet
              size={15}
              className="group-disabled:text-white-400 dark:group-disabled:text-white-100/40 dark:text-white-100 group-hover:text-white-100 text-blue-100"
            />
            <span className="font-ppReg text-[12px] ">Manage Billing</span>
          </Button>
        )}
      </FlexColStart>
    </FlexColStart>
  );
}
