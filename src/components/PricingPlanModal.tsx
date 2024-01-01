"use client";
import React, { useContext } from "react";
import Modal from "./Modal";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "./Flex";
import { ArrowLeftToLine, CheckCheck, X, Zap } from "lucide-react";
import Button from "./ui/button";
import { cn, currencyFormatter } from "@/lib/utils";
import { pricingPlans } from "@/data/pricing/plan";
import { ResponseData, ValidPricingDuration } from "@/types";
import pricingPlanFeatures from "@/data/pricing/features";
import { DataContext } from "@/context/DataContext";
import { useMutation } from "@tanstack/react-query";
import { subscribeToPlan } from "@/http/requests";
import toast from "react-hot-toast";

type Props = {
  closeModal: () => void;
};

// show pricing modal on dashboard when upgrade button is clicked.
function PricingPlanModal({ closeModal }: Props) {
  const { userInfo, subscribed_plans } = useContext(DataContext);
  const [subscribeLoading, setSubscribeLoading] = React.useState<
    {
      id: any;
      loading: boolean;
    }[]
  >([]);
  const subscribePlanMut = useMutation({
    mutationFn: async (data: any) => await subscribeToPlan(data),
  });

  const subscribe = (product_id: number) => {
    subscribePlanMut.mutate({ product_id });
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

  // console.log({ userInfo });
  return (
    <FlexColStart className="w-full h-screen absolute top-0 right-0 z-[100] bg-white-100 dark:bg-dark-100 p-0 overflow-y-scroll">
      <FlexRowStart className="px-4 py-4">
        <button
          className="underline w-auto flex gap-2 items-center justify-start"
          onClick={closeModal}
        >
          <ArrowLeftToLine
            size={15}
            className="text-white-400 transition-all"
          />
          <span className="text-white-400 text-[12px] transition-all font-ppSB">
            Back
          </span>
        </button>
      </FlexRowStart>
      <FlexColCenter className="w-full text-center pb-5 py-2 mt-5">
        <h1 className="text-dark-105 dark:text-white-200 font-ppSB text-2xl">
          Purchase a subscription
        </h1>
        <p className="text-white-400 dark:text-white-400 text-[12px] font-ppReg">
          Choose the plan that works for you.
        </p>
      </FlexColCenter>
      <FlexRowCenter className="w-full flex-wrap p-3 ">
        {pricingPlans.map((plan, i) => (
          <PricingCard
            key={i}
            name={plan.name}
            currency={plan.pricing.currency}
            amount={plan?.pricing.amount}
            duration={plan.duration}
            id={plan.id}
            product_id={plan.product_id}
            subscribed_plans={subscribed_plans}
            subscribeToPlan={subscribe}
            loading={subscribeLoading}
          />
        ))}
      </FlexRowCenter>
    </FlexColStart>
  );
}

export default PricingPlanModal;

type PricingCardProps = {
  id: string;
  product_id: number;
  name: string;
  duration: ValidPricingDuration;
  currency: string;
  amount: number;
  subscribed_plans: string[];
  subscribeToPlan: (planId: number) => void;
  loading: {
    id: string;
    loading: boolean;
  }[];
};

function PricingCard({
  id,
  product_id,
  name,
  duration,
  currency,
  amount,
  subscribed_plans,
  subscribeToPlan,
  loading,
}: PricingCardProps) {
  const hasSubscribedToPlan = subscribed_plans?.includes(String(product_id));
  const product = pricingPlans.find((d) => d.id === id);
  const _loading = loading.find((d) => String(d.id) === String(product_id));

  return (
    <FlexColStart
      className={cn(
        "w-full max-w-[400px] md:max-w-[250px] h-auto bg-white-100 dark:bg-dark-102 shadow-md rounded-md ",
        "border-solid border-[1px] border-white-300 dark:border-white-300/30 "
      )}
    >
      <FlexRowStartBtw className="w-full px-4 py-5 ">
        <FlexColStart>
          <h1 className="text-1xl font-ppSB text-blue-101">{name}</h1>
        </FlexColStart>
        <FlexRowStart>
          <h1 className="relative text-2xl font-ppSB">
            {currencyFormatter(amount, currency)}
            <span className="absolute text-xs top-[-1em] scale-[.80] right-[-3px] font-ppL text-dark-100/20 dark:text-white-400">
              / {product?.id === id ? product.duration.replace("ly", "") : null}
            </span>
          </h1>
        </FlexRowStart>
      </FlexRowStartBtw>
      <FlexColCenter className="w-full px-5 py-3">
        <Button
          className={cn(
            "w-full rounded-full py-0 h-[40px] hover:bg-blue-100/70 bg-blue-100 text-white-100 disabled:bg-white-400/40 border-solid border-transparent",
            hasSubscribedToPlan &&
              "cursor-not-allowed opacity-[.5] hover:cursor-not-allowed"
          )}
          onClick={() =>
            !hasSubscribedToPlan &&
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
            {hasSubscribedToPlan ? <CheckCheck size={20} /> : <Zap size={20} />}
            <span className="font-ppReg text-[14px] ">
              {hasSubscribedToPlan ? "Subscribed" : "Switch to this plan"}
            </span>
          </FlexRowStartCenter>
        </Button>
      </FlexColCenter>
    </FlexColStart>
  );
}
