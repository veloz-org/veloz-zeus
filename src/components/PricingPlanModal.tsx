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
import { CheckCheck, Zap } from "lucide-react";
import Button from "./ui/button";
import { cn, currencyFormatter } from "@/lib/utils";
import { pricingPlans } from "@/data/pricing/plan";
import { ValidPricingDuration } from "@/types";
import pricingPlanFeatures from "@/data/pricing/features";

// show pricing modal on dashboard when upgrade button is clicked.
function PricingPlanModal() {
  return (
    <Modal isOpen className="fixed bg-dark-100">
      <FlexColCenter className="w-full min-h-screen">
        {/* main body */}
        <FlexColStart className="w-full max-w-[90%] bg-white-200 pb-9 ">
          <FlexColCenter className="w-full py-4 px-4 ">
            <p className="text-dark-100 font-ppSB text-2xl">Pricing</p>
            <p className="text-white-400 font-ppReg"></p>
          </FlexColCenter>

          <br />
          <FlexRowCenterBtw className="w-full p-6">
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
          </FlexRowCenterBtw>
        </FlexColStart>
      </FlexColCenter>
    </Modal>
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
    <FlexColStart className="w-full max-w-[300px] h-full bg-white-100 shadow-lg rounded-md ">
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
      <FlexColStart className="w-full px-4 py-3">
        {features?.map((f, i) => (
          <FlexRowStartCenter className="w-full" key={i}>
            <CheckCheck size={15} className="text-green-100" />
            <span className="text-dark-100 font-ppReg text-[13px] ">
              {f.title}
            </span>
          </FlexRowStartCenter>
        ))}
      </FlexColStart>
      <br />
      <FlexColCenter className="w-full px-5 py-3">
        <Button
          className={cn(
            "w-full py-0 h-[50px] hover:bg-blue-100/70 bg-blue-100 text-white-100 disabled:bg-blue-201 border-solid border-transparent",
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
    </FlexColStart>
  );
}
