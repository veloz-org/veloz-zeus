"use client";
import { withAuth } from "@/lib/helpers";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React from "react";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import StatsCard from "@/components/dashboard/StatsCard";

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
  const [activeStatsCard, setActiveStatsCard] = React.useState("totalUsers");

  return (
    <DashboardLayout activePage="dashboard" className="w-full h-screen">
      <FlexRowStartCenter className="w-full h-auto flex-wrap py-3 px-4 gap-5">
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
      <FlexColStart className="w-full h-full p-4">
        <FlexColCenter className="w-full h-full max-h-[300px] bg-white-300/50 text-center">
          <p className="text-white-400 font-ppReg text-sm">
            Place Content Here
          </p>
        </FlexColCenter>
      </FlexColStart>
    </DashboardLayout>
  );
}

export default withAuth(Dashboard);
