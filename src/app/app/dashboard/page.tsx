"use client";
import React from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import StatsCard from "@/components/dashboard/StatsCard";
import { LayoutContext } from "@/context/LayoutContext";
import { useSession } from "next-auth/react";

const dashboardStats = [
  {
    title: "Total Users",
    name: "totalUsers",
    value: 20000,
    percentageChange: {
      increase: true,
      value: "10%",
    },
  },
  {
    title: "Total Bounce Rate",
    name: "totalBounceRate",
    value: 16500,
    percentageChange: {
      increase: false,
      value: "37%",
    },
  },
  {
    title: "Conversion Rate",
    name: "conversionRate",
    value: 37850,
    percentageChange: {
      increase: true,
      value: "13.5%",
    },
  },
];

function Dashboard() {
  const { status } = useSession();
  const { setActivePage } = React.useContext(LayoutContext);
  const [activeStatsCard, setActiveStatsCard] = React.useState("totalUsers");

  // set active page in layout context to reflect sidebar /active state
  setActivePage("dashboard");

  return (
    <>
      {status === "loading" ? (
        <p className="">Loading...</p>
      ) : (
        <FlexColStart className="w-full">
          <FlexRowStartCenter className="w-full h-auto flex-wrap py-3 px-3 md:px-7 gap-3">
            {dashboardStats.map((stat, i) => (
              <StatsCard
                key={i}
                title={stat.title}
                name={stat.name}
                activeCardName={activeStatsCard}
                value={stat.value}
                activeCardColor="#3770fe"
                percentageChange={stat.percentageChange}
                setActiveStatsCard={setActiveStatsCard}
              />
            ))}
          </FlexRowStartCenter>
          <FlexColStart className="w-full h-full px-3 md:px-7 py-4">
            <FlexColCenter className="w-full h-full max-h-[300px] bg-white-300/50 dark:bg-dark-200 text-center">
              <p className="text-white-400 font-ppReg text-sm">
                Place Content Here
              </p>
            </FlexColCenter>
          </FlexColStart>
        </FlexColStart>
      )}
    </>
  );
}

export default Dashboard;
