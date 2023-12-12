"use client";
import { withAuth } from "@/lib/helpers";
import DashboardLayout from "@/modules/dashboard/components/DashboardLayout";
import React from "react";

function Dashboard() {
  return (
    <DashboardLayout activePage="dashboard" className="w-full h-screen">
      dashboard
    </DashboardLayout>
  );
}

export default withAuth(Dashboard);
