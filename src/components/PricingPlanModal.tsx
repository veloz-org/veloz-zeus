import React from "react";
import Modal from "./Modal";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "./Flex";
import { ArrowLeftToLine, CheckCheck, X, Zap } from "lucide-react";
import Button from "./ui/button";
import { cn, currencyFormatter } from "@/lib/utils";
import { pricingPlans } from "@/data/pricing/plan";
import { ValidPricingDuration } from "@/types";
import pricingPlanFeatures from "@/data/pricing/features";

type Props = {
  closeModal: () => void;
};

// show pricing modal on dashboard when upgrade button is clicked.
function PricingPlanModal({ closeModal }: Props) {
  return (
    <FlexColStart className="w-full h-screen absolute top-0 right-0 z-[100] bg-white-100 p-0 overflow-y-scroll">
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
        <h1 className="text-dark-100 font-ppSB text-2xl">
          Purchase a subscription
        </h1>
        <p className="text-white-400 text-[12px] font-ppReg">
          Choose the plan that works for you.
        </p>
      </FlexColCenter>
      <FlexRowStart className="w-full flex-wrap p-6 ">
        {pricingPlans.map((plan, i) => (
          <PricingCard
            key={i}
            name={plan.name}
            currency={plan.pricing.currency}
            amount={plan?.pricing.amount}
            duration={plan.duration}
            id={plan.id}
            subscribed_plans={[""]}
          />
        ))}
      </FlexRowStart>
    </FlexColStart>
  );
}

export default PricingPlanModal;

type PricingCardProps = {
  id: string;
  name: string;
  duration: ValidPricingDuration;
  currency: string;
  amount: number;
  subscribed_plans: string[];
};

function PricingCard({
  id,
  name,
  duration,
  currency,
  amount,
  subscribed_plans,
}: PricingCardProps) {
  const hasSubscribedToPlan = subscribed_plans?.includes(id);

  const features = pricingPlanFeatures.find((d) => d.id === id)?.features;

  return (
    <FlexColStart
      className={cn(
        "w-full max-w-[400px] md:max-w-[300px] h-auto bg-white-100 shadow-md rounded-md ",
        "border-solid border-[1px] border-white-300 "
      )}
    >
      <FlexRowStartBtw className="w-full px-4 py-5 ">
        <FlexColStart>
          <h1 className="text-1xl font-ppSB text-blue-101">{name}</h1>
        </FlexColStart>
        <FlexRowStart>
          <h1 className="text-2xl font-ppSB">
            {currencyFormatter(amount, currency)}
          </h1>
        </FlexRowStart>
      </FlexRowStartBtw>
      <FlexColCenter className="w-full px-5 py-3">
        <Button
          className={cn(
            "w-full py-0 h-[40px] hover:bg-blue-100/70 bg-blue-100 text-white-100 disabled:bg-blue-201 border-solid border-transparent",
            hasSubscribedToPlan
              ? "border-[2px] border-blue-101 bg-blue-201 text-white-400 "
              : ""
          )}
          //   disabled
        >
          <FlexRowStartCenter>
            {hasSubscribedToPlan ? <CheckCheck size={20} /> : <Zap size={20} />}
            <span className="font-ppReg text-[14px] ">
              {hasSubscribedToPlan ? "Subscribed" : "Subscribe"}
            </span>
          </FlexRowStartCenter>
        </Button>
      </FlexColCenter>
      <FlexColStart className="w-full px-4 py-3">
        {features?.map((f, i) => (
          <FlexRowStartCenter className="w-full" key={i}>
            {f.isAvailable ? (
              <CheckCheck size={15} className="text-green-100" />
            ) : (
              <X size={15} className="text-red-305" />
            )}
            <span className="text-dark-100 font-ppReg text-[13px] ">
              {f.title}
            </span>
          </FlexRowStartCenter>
        ))}
      </FlexColStart>
    </FlexColStart>
  );
}
