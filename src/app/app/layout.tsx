"use client";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import React from "react";

// root layout meant for authenticated pages
export default function AppRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
