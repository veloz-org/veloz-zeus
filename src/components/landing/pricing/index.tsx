import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Button from "@/components/ui/button";
import pricingPlanFeatures from "@/data/pricing/features";
import { pricingPlans } from "@/data/pricing/plan";
import { cn, currencyFormatter } from "@/lib/utils";
import { TogglePlanDurations, ValidPricingDuration } from "@/types";
import { CheckCheck, Zap, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Pricing() {
  const { status } = useSession();
  // toggling plan between month and year
  const [activePlanDuration, setActivePlanDuration] =
    useState<TogglePlanDurations>("MONTH");

  const togglePlans = (duration: TogglePlanDurations) =>
    setActivePlanDuration(duration);

  const subscribe = () => {
    window.location.href =
      status === "authenticated" ? "/app/dashboard" : "auth";
  };

  return (
    <FlexColCenter className="relative w-full h-auto py-[4em] border-t-[1px] border-t-white-300 dark:border-t-white-600">
      <div id={"pricing"} className="absolute -top-12"></div>
      <FlexColStartCenter className="w-auto md:w-auto min-w-[30%] px-8 ">
        <h1 className="text-4xl font-ppEB text-dark-100 dark:text-white-100">
          Pricing
        </h1>
        <p className="text-white-400 dark:text-white-300 text-sm font-ppReg">
          Choose your plan and get started for free!
        </p>
        <br />
      </FlexColStartCenter>
      <FlexRowCenter>
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
      </FlexRowCenter>
      <br />
      <FlexRowCenter className="w-full flex-wrap p-3 gap-7 ">
        {pricingPlans.map((plan, i) => (
          <PricingCard
            key={i}
            id={plan.id}
            product_id={plan.product_id}
            name={plan.name}
            subscribeToPlan={subscribe}
            recommended={plan.recommended}
            activePlanDuration={activePlanDuration}
          />
        ))}
      </FlexRowCenter>
    </FlexColCenter>
  );
}

type PricingCardProps = {
  id: string;
  product_id: number;
  name: string;
  subscribeToPlan: () => void;
  recommended?: boolean;
  activePlanDuration: TogglePlanDurations;
};

function PricingCard({
  id,
  product_id,
  name,
  activePlanDuration,
  subscribeToPlan,
  recommended,
}: PricingCardProps) {
  const features = pricingPlanFeatures.find((d) => d.id === id)?.features;
  const product = pricingPlans.find((d) => d.id === id);
  const variant = product?.variants.find(
    (v) =>
      v.duration.toLowerCase().replace("ly", "") ===
      activePlanDuration.toLowerCase()
  );

  if (!variant || !product) return null;

  const duration = variant.duration;
  const { amount, currency } = variant.pricing;

  return (
    <FlexColStart
      className={cn(
        "relative w-full max-w-[400px] md:max-w-[300px] h-auto bg-white-100 dark:bg-dark-102 shadow-md rounded-md ",
        "border-solid border-[1px] ",
        recommended && recommended
          ? "border-[3px] border-blue-101"
          : "border-white-300 dark:border-white-300/30 "
      )}
    >
      {recommended && (
        <FlexColCenter className="w-full absolute top-[-1em] translate-y-1">
          <span className="text-[10px] text-white-100 font-ppReg px-2 py-[2px] rounded-full bg-blue-101">
            Recommended
          </span>
        </FlexColCenter>
      )}
      <FlexRowStartBtw className="w-full px-4 py-5 ">
        <FlexColStart>
          <h1 className="text-1xl font-ppSB text-blue-101">{name}</h1>
        </FlexColStart>
        <FlexRowStart>
          <h1 className="text-2xl font-ppSB">
            {currencyFormatter(amount, currency)}
          </h1>
          <span className="text-xs dark:text-white-300 text-white-400 font-ppL">
            / {duration.replaceAll("ly", " ")}
          </span>
        </FlexRowStart>
      </FlexRowStartBtw>

      <FlexColStart className="w-full px-4 py-3">
        {features?.map((f, i) => (
          <FlexRowStartCenter className="w-full" key={i}>
            {f.isAvailable ? (
              <CheckCheck size={15} className="text-green-100" />
            ) : (
              <X size={15} className="text-red-305" />
            )}
            <span className="text-dark-105 dark:text-white-200 font-ppReg text-[13px] ">
              {f.title}
            </span>
          </FlexRowStartCenter>
        ))}
      </FlexColStart>
      <FlexColCenter className="w-full px-5 py-3">
        <Button
          className={cn(
            "w-full py-0 h-[40px] hover:bg-blue-101/70 text-white-100 border-solid border-transparent rounded-full border-[2px] border-blue-101 bg-blue-101"
          )}
          onClick={subscribeToPlan}
        >
          <FlexRowStartCenter>
            <Zap size={20} />
            <span className="font-ppReg text-[14px] ">Subscribe</span>
          </FlexRowStartCenter>
        </Button>
      </FlexColCenter>
    </FlexColStart>
  );
}
