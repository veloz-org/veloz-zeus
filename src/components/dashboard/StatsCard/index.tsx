import {
  FlexColStart,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import { cn, formatNumber, numberWithCommas } from "@/lib/utils";
import {
  ArrowDownUp,
  TrendingDown,
  TrendingUp,
  Users,
  Weight,
} from "lucide-react";
import React from "react";

type Props = {
  name: string;
  activeCardName: string;
  title: string;
  value: number;
  activeCardColor: string;
  percentageChange: {
    increase: boolean;
    value: string;
  };
  setActiveStatsCard?: (name: string) => void;
};

export default function StatsCard({
  title,
  name,
  activeCardName,
  value,
  activeCardColor,
  percentageChange,
  setActiveStatsCard,
}: Props) {
  const isCardActive = name === activeCardName;

  return (
    <button
      className="w-[300px]"
      onClick={() => setActiveStatsCard && setActiveStatsCard(name)}
    >
      <FlexColStart
        className={cn(
          "w-full rounded-md bg-white-100 dark:bg-dark-102 px-4 py-5 shadow-sm "
        )}
      >
        <FlexRowStart className="w-full">
          {renderStatIcon(name, activeCardName)}
        </FlexRowStart>
        <FlexRowEnd className="w-full">
          <FlexColStart className="w-full">
            <span
              className={cn(
                "text-white-400 dark:text-white-100/80 text-[12px] font-ppReg"
              )}
            >
              {title}
            </span>
            <h1
              className={cn(
                "text-dark-100 dark:text-white-100 text-3xl font-ppSB"
              )}
            >
              {numberWithCommas(value)}
            </h1>
          </FlexColStart>
          <FlexRowStartCenter
            className={cn(
              "w-auto px-2 py-1 rounded-md",
              percentageChange.increase ? "bg-green-200" : "bg-red-100/40"
            )}
          >
            {percentageChange.increase ? (
              <TrendingUp
                size={15}
                className={cn(
                  percentageChange.increase ? "text-green-100" : "text-red-305"
                )}
              />
            ) : (
              <TrendingDown
                size={15}
                className={cn(
                  percentageChange.increase ? "text-green-100" : "text-red-305"
                )}
              />
            )}
            <span
              className={cn(
                "text-[10px] font-ppReg",
                percentageChange.increase ? "text-green-100" : "text-red-305"
              )}
            >
              {percentageChange.value}
            </span>
          </FlexRowStartCenter>
        </FlexRowEnd>
      </FlexColStart>
    </button>
  );
}

function renderStatIcon(name: string, activeCardName: string) {
  let icon = null;
  const isCardActive = name === activeCardName;
  if (name === "totalUsers") {
    icon = (
      <Users
        size={35}
        className={cn(
          "p-2 rounded-md dark:bg-dark-200 transition ease-in-out",
          "bg-white-200/40 text-white-400 dark:text-white-100"
        )}
      />
    );
  }
  if (name === "totalBounceRate") {
    icon = (
      <ArrowDownUp
        size={35}
        className={cn(
          "p-2 rounded-md dark:bg-dark-200 transition ease-in-out",
          "bg-white-200/40 text-white-400 dark:text-white-100"
        )}
      />
    );
  }
  if (name === "conversionRate") {
    icon = (
      <Weight
        size={35}
        className={cn(
          "p-2 rounded-md dark:bg-dark-200 transition ease-in-out",
          "bg-white-200/40 text-white-400 dark:text-white-100"
        )}
      />
    );
  }

  return icon;
}
