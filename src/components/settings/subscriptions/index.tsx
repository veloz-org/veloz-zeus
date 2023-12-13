import { FlexColStart, FlexRowStart, FlexRowStartBtw } from "@/components/Flex";
import Button from "@/components/ui/button";
import { DataContext } from "@/context/DataContext";
import { cn, currencyFormatter } from "@/lib/utils";
import React, { useContext } from "react";

function SubscriptionTab() {
  const { userInfo } = useContext(DataContext);
  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full">
        <p className="text-dark-100 font-ppSB text-[15px] ">Plan</p>
        {userInfo.role === "admin" && (
          <p className="text-white-400 font-ppReg text-[11px] ">
            You currently dont have a plan.
            <button className="text-dark-100 font-ppSB underline ml-1">
              Create Plan
            </button>
          </p>
        )}
        <FlexRowStart className="w-full mt-4">
          <PricingPlanCard
            activePlan={userInfo.role === "admin" ? null : "free"}
            planName="Free"
            planPrice={0}
            currency="USD"
            duration="monthly"
          />
          <PricingPlanCard
            activePlan={"premium"}
            planName="Premium"
            planPrice={10}
            currency="USD"
            duration="monthly"
          />
        </FlexRowStart>
      </FlexColStart>
    </FlexColStart>
  );
}

export default SubscriptionTab;

type PricingPlanCardProps = {
  activePlan: string | "free" | null;
  planName: string;
  planPrice: number;
  currency: string;
  duration: "monthly" | "yearly" | "weekly" | "daily";
};

function PricingPlanCard({
  activePlan,
  planName,
  planPrice,
  currency,
  duration,
}: PricingPlanCardProps) {
  return (
    <FlexColStart
      className={cn(
        "w-full max-w-[250px] py-3 px-4 rounded-md border-solid border-transparent",
        activePlan ? "bg-blue-201 border-[2px] border-blue-101 " : "bg-blue-101"
      )}
    >
      <FlexRowStartBtw className="w-full">
        <p
          className={cn(
            "text-dark-100 font-ppSB text-[13px] ",
            activePlan ? "text-dark-100" : "text-white-100"
          )}
        >
          {planName}
        </p>
        <p
          className={cn(
            "font-ppL text-[13px] ",
            !activePlan ? "text-white-100/70" : "text-white-400"
          )}
        >
          <span
            className={cn(
              "font-ppSB",
              activePlan ? "text-dark-100" : " text-white-100"
            )}
          >
            {currencyFormatter(0, currency)}
          </span>{" "}
          / {duration.replace("ly", "")}
        </p>
      </FlexRowStartBtw>
      <FlexRowStartBtw className="w-full mt-2">
        {!activePlan ? (
          <Button
            intent={"primary"}
            className="h-[35px] bg-white-100 text-blue-100 hover:bg-blue-201/80 py-0 px-5 "
          >
            <span className="text-[12px] font-ppSB">Upgrade</span>
          </Button>
        ) : (
          <Button className="h-[35px] bg-blue-201 hover:bg-blue-101 hover:text-white-100 py-0 px-5 border-solid border-[1px]  border-blue-101 text-blue-100  ">
            <span className="text-[10px] font-ppSB">Cancel Plan</span>
          </Button>
        )}
      </FlexRowStartBtw>
    </FlexColStart>
  );
}
