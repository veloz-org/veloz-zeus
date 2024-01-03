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
  getCurrUserPlan,
} from "@/lib/utils";
import { ResponseData, CurrentUserPlan, TogglePlanDurations } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { CheckCheck, Wallet, X } from "lucide-react";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import BillingPricingPlans from "./pricingPlans";

function BillingTab() {
  const { current_plan, userInfo } = useContext(DataContext);
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
        <p className="text-dark-105 dark:text-white-100 font-ppSB text-[15px] ">
          Plan
        </p>
        <p className="text-white-400 dark:text-white-300 font-ppReg text-[12px] ">
          {userInfo?.subscription
            ? "No active subscription plan."
            : "Manage your subscription plans."}
        </p>
        {/* billing card */}
        <FlexRowStart className="w-full mt-2 flex-wrap">
          {userInfo &&
            userInfo?.subscription &&
            pricingPlans
              .filter((p) => {
                const subscription =
                  userInfo.subscription?.product_id === String(p.product_id);
                return subscription;
              })
              .map((plan, i) => (
                <BillingCard
                  key={i}
                  product_id={plan.product_id}
                  subscription={userInfo?.subscription}
                  getCustomerPortal={(prodId) => {
                    getCustomerPortalMut.mutate({ product_id: prodId });
                  }}
                  loading={getCustomerPortalMut.isPending}
                />
              ))}
        </FlexRowStart>
        <br />
        {/* pricing plans */}
        <BillingPricingPlans />
      </FlexColStart>
    </FlexColStart>
  );
}

export default BillingTab;

type BillingCardProps = {
  product_id: number;
  subscription: CurrentUserPlan;
  getCustomerPortal: (prodId: string) => void;
  loading: boolean;
};

function BillingCard({
  subscription,
  product_id,
  getCustomerPortal,
  loading,
}: BillingCardProps) {
  const _subscription =
    subscription?.product_id === String(product_id) ? subscription : null;
  const msg = generateSubscriptionRenewalMessage(
    _subscription?.status as any,
    _subscription?.renews_at as any
  );

  const planDetail = getCurrUserPlan(String(product_id), _subscription);

  if (!planDetail) return null;

  const { duration, plan_currency, plan_name, plan_price } = planDetail;

  return (
    <FlexColStart
      className={cn(
        "w-full md:max-w-[250px] py-3 px-4 rounded-md border-solid border-transparent",
        "bg-blue-201 dark:bg-dark-102 border-[2px] border-blue-101 "
      )}
    >
      <FlexRowStartBtw className="w-full">
        <p
          className={cn(
            "text-dark-105 dark:text-white-100 font-ppSB text-[13px] ",
            "text-dark-105 dark:text-white-100"
          )}
        >
          {plan_name}
        </p>
        <p className={cn("font-ppL text-[13px] ", "text-white-400")}>
          <span
            className={cn("font-ppSB", "text-dark-105 dark:text-white-300")}
          >
            {currencyFormatter(plan_price, plan_currency)}
          </span>{" "}
          / {duration?.replace("ly", "")}
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
          <p className={cn("font-ppReg text-[10px]", "text-blue-100")}>
            {msg ?? "Not Subscribed"}
          </p>
        </FlexRowStartCenter>
        {_subscription && (
          <Button
            intent={"primary"}
            className={cn(
              "h-[35px] bg-blue-201 group hover:bg-blue-101 hover:text-white-100 py-0 px-5 border-solid border-[1px]  border-blue-101 ",
              " disabled:text-white-400 hover:bg-blue-101 hover:text-white-100 text-blue-100 dark:bg-blue-101 dark:text-white-100 dark:hover:bg-blue-101/80 dark:disabled:text-white-100/40"
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
