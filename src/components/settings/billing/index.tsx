import {
  FlexColStart,
  FlexColStartCenter,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Modal from "@/components/Modal";
import Button from "@/components/ui/button";
import { DataContext } from "@/context/DataContext";
import { pricingPlans } from "@/data/pricing/plan";
import { cn, currencyFormatter } from "@/lib/utils";
import { CheckCheck, Wallet } from "lucide-react";
import React, { useContext } from "react";

function BillingTab() {
  const { userInfo } = useContext(DataContext);
  const activePlanIds = ["basic_104548"];
  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full">
        <p className="text-dark-100 font-ppSB text-[15px] ">Plan</p>

        {/* pricing plans */}
        <FlexRowStartCenter className="w-full mt-2">
          {pricingPlans.map((plan, i) => (
            <PricingPlanCard
              key={i}
              activePlan={activePlanIds.includes(plan.id) ? plan.key : null}
              planName={plan.name}
              planPrice={plan.pricing.amount}
              currency={plan.pricing.currency}
              duration={plan.duration as any}
            />
          ))}
        </FlexRowStartCenter>
        <br />
        {Array(2)
          .fill(1)
          .map((_, i) => (
            <FlexRowStartCenter className="w-full" key={i}>
              <CheckCheck size={15} className="text-blue-100" />
              <p className="text-dark-100 font-ppReg text-[12px]">
                <span className="font-ppSB text-[10px] ">(Premium)</span> Your
                subscription is scheduled to be renewed on{" "}
                <span className="font-ppSB">Sat Jan 13 2024</span>
              </p>
            </FlexRowStartCenter>
          ))}
        <br />
        <button className="w-auto px-4 py-2 rounded-md flex items-center justify-start bg-white-201 gap-2 border-solid border-[1px]  border-blue-101 group hover:bg-blue-100  ">
          <Wallet
            size={15}
            className="group-hover:text-white-100 text-blue-100"
          />
          <span className="text-blue-100 group-hover:text-white-100 font-ppReg text-[12px] ">
            Manage Billing
          </span>
        </button>
      </FlexColStart>
    </FlexColStart>
  );
}

export default BillingTab;

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
        <a
          href="/#pricing"
          className={cn(
            "font-ppReg text-[10px] underline",
            activePlan ? "text-blue-100" : "text-white-100"
          )}
        >
          Learn more about this plan
        </a>
        {/* {!activePlan ? (
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
        )} */}
      </FlexRowStartBtw>
    </FlexColStart>
  );
}
