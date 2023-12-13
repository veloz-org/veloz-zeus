"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { LayoutContext } from "@/context/LayoutContext";
import React from "react";

// root layout meant for authenticated pages
export default function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { activePage } = React.useContext(LayoutContext);

  return <DashboardLayout activePage={activePage}>{children}</DashboardLayout>;
}
