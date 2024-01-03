"use client";
import React, { useContext, useState } from "react";
import Modal from "../../Modal";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "../../Flex";
import { ArrowLeftToLine, CheckCheck, X, Zap } from "lucide-react";
import Button from "../../ui/button";
import { cn, currencyFormatter } from "@/lib/utils";
import { pricingPlans } from "@/data/pricing/plan";
import {
  CurrentUserPlan,
  ResponseData,
  TogglePlanDurations,
  ValidPricingDuration,
} from "@/types";
import pricingPlanFeatures from "@/data/pricing/features";
import { DataContext } from "@/context/DataContext";
import { useMutation } from "@tanstack/react-query";
import { subscribeToPlan } from "@/http/requests";
import toast from "react-hot-toast";

type Props = {};

function BillingPricingPlans({}: Props) {
  const { userInfo, current_plan } = useContext(DataContext);
  const [subscribeLoading, setSubscribeLoading] = React.useState<
    {
      id: any;
      loading: boolean;
    }[]
  >([]);
  const subscribePlanMut = useMutation({
    mutationFn: async (data: any) => await subscribeToPlan(data),
  });

  // toggling plan between month and year
  const [activePlanDuration, setActivePlanDuration] =
    useState<TogglePlanDurations>("MONTH");

  const togglePlans = (duration: TogglePlanDurations) =>
    setActivePlanDuration(duration);

  const subscribe = (product_id: number) => {
    subscribePlanMut.mutate({
      product_id,
      duration: activePlanDuration.toLowerCase() + "ly",
    });
    setSubscribeLoading((prev) => [...prev, { id: product_id, loading: true }]);
  };

  React.useEffect(() => {
    if (subscribePlanMut.error) {
      setSubscribeLoading([]);
      const errMsg = (subscribePlanMut.error as any)?.response?.data?.message;
      toast.error(errMsg);
    }
    if (subscribePlanMut.data) {
      setSubscribeLoading([]);
      const { data } = subscribePlanMut.data as ResponseData;
      const url = data?.url;
      window.location.href = url;
    }
  }, [
    subscribePlanMut.data,
    subscribePlanMut.error,
    subscribePlanMut.isPending,
  ]);

  return (
    <FlexColStart className="w-full h-auto">
      <FlexRowStartCenter className="w-full">
        <h1 className="font-ppSB text-white-400 dark:text-white-200 text-1xl">
          Upgrade Account
        </h1>
        <FlexRowStartCenter className="w-auto px-[1px] py-[1.5px] gap-0 rounded-full dark:bg-dark-100 border-[1px] border-white-300/80 dark:border-white-300/10 ">
          {["month", "year"].map((d, i) => (
            <button
              key={i}
              className={cn(
                "w-auto px-5 h-[30px] scale-[.95] transition-all rounded-full",
                activePlanDuration.toLowerCase() === d
                  ? "bg-blue-100 text-white-100 font-ppSB"
                  : "bg-transparent text-dark-100 dark:text-white-400 "
              )}
              onClick={() =>
                togglePlans(d.toUpperCase() as TogglePlanDurations)
              }
            >
              <FlexRowCenter>
                <span className="text-xs font-ppReg">
                  {d.slice(0, 1).toUpperCase() + d.slice(1)}
                </span>
              </FlexRowCenter>
            </button>
          ))}
        </FlexRowStartCenter>
      </FlexRowStartCenter>
      <br />
      <FlexRowStart className="w-full h-auto flex-wrap pb-[6em] md:pb-[2em] ">
        {pricingPlans.map((plan, i) => (
          <PricingCard
            key={i}
            id={plan.id}
            product_id={plan.product_id}
            current_plan={current_plan}
            subscribeToPlan={subscribe}
            loading={subscribeLoading}
            activePlanDuration={activePlanDuration}
          />
        ))}
      </FlexRowStart>
    </FlexColStart>
  );
}

export default BillingPricingPlans;

type PricingCardProps = {
  id: string;
  product_id: number;
  current_plan: CurrentUserPlan | null;
  subscribeToPlan: (planId: number) => void;
  activePlanDuration: TogglePlanDurations;
  loading: {
    id: string;
    loading: boolean;
  }[];
};

function PricingCard({
  id,
  product_id,
  subscribeToPlan,
  loading,
  current_plan,
  activePlanDuration,
}: PricingCardProps) {
  const product = pricingPlans.find((d) => d.id === id);
  const _loading = loading.find((d) => String(d.id) === String(product_id));

  // check if user has subscribed to plan based on the plan duration
  const hasSubscribedToPlan = () => {
    if (current_plan?.product_id !== String(product_id)) return false;

    const variant = product?.variants.find(
      (v) => String(v.id) === current_plan?.variant_id
    );
    if (!variant) return false;

    return (
      variant.duration.toLowerCase().replace("ly", "") ===
      activePlanDuration.toLowerCase()
    );
  };

  const variant = product?.variants.find(
    (v) =>
      v.duration.toLowerCase().replace("ly", "") ===
      activePlanDuration.toLowerCase()
  );

  if (!variant || !product) return null;

  const { name: plan_name } = product;
  const duration = variant.duration;
  const { amount: plan_price, currency: plan_currency } = variant.pricing;

  return (
    <FlexColStart
      className={cn(
        "w-[350px] max-w-[400px] md:max-w-[250px] h-auto ",
        "border-solid border-[1px] border-white-400/30 rounded-md dark:border-white-300/30 dark:border-[.5px] "
      )}
    >
      <FlexRowStartBtw className="w-full px-4 py-5 ">
        <FlexColStart>
          <h1 className="text-1xl font-ppSB text-blue-101">{plan_name}</h1>
        </FlexColStart>
        <FlexRowStart>
          <h1 className="relative text-2xl font-ppSB">
            {currencyFormatter(plan_price, plan_currency)}
            <span className="absolute text-xs top-[-1em] scale-[.80] right-[-3px] font-ppL text-dark-100 dark:text-white-400">
              / {duration?.replace("ly", "")}
            </span>
          </h1>
        </FlexRowStart>
      </FlexRowStartBtw>
      <FlexColCenter className="w-full px-5 py-3">
        <Button
          className={cn(
            "w-full rounded-full py-0 h-[40px] hover:bg-blue-100/70 bg-blue-100 text-white-100 disabled:bg-white-400/40 border-solid border-transparent",
            hasSubscribedToPlan() &&
              "cursor-not-allowed opacity-[.5] hover:cursor-not-allowed"
          )}
          onClick={() =>
            !hasSubscribedToPlan() &&
            subscribeToPlan(product?.product_id as number)
          }
          disabled={
            _loading?.loading && String(_loading.id) === String(product_id)
          }
          isLoading={
            _loading?.loading && String(_loading.id) === String(product_id)
          }
        >
          <FlexRowStartCenter>
            {hasSubscribedToPlan() ? (
              <CheckCheck size={20} />
            ) : (
              <Zap size={20} />
            )}
            <span className="font-ppReg text-xs ">
              {hasSubscribedToPlan() ? "Subscribed" : "Switch to this plan"}
            </span>
          </FlexRowStartCenter>
        </Button>
      </FlexColCenter>
    </FlexColStart>
  );
}
