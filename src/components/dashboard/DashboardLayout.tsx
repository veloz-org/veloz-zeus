"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "@/components/dashboard/Navigations/Sidebar";
import { LayoutContext } from "@/context/LayoutContext";
import TopBar from "./Navigations/TopBar";
import { useSession } from "next-auth/react";
import { withAuth } from "@/lib/helpers";
import PricingPlanModal from "../PricingPlanModal";
import { ThemeContext } from "@/context/Theme";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}

// use this component as a wrapper for all dashboard authenticated pages
function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { setDarkMode } = useContext(ThemeContext);
  const { pricingModalOpen, setPricingModalOpen } = useContext(LayoutContext);
  const { status } = useSession();

  if (status === "loading") return null;
  if (status === "unauthenticated") {
    if (window) window.location.href = "/auth";
  }

  return (
    <div
      className={twMerge(
        "w-full relative h-screen overflow-y-auto hideScrollBar bg-white-105 dark:bg-dark-100",
        className
      )}
    >
      <div className="w-full h-screen flex">
        <SideBar />
        <div className="w-full z-upper relative  overflow-hidden">
          <TopBar />
          {children}
          {pricingModalOpen && (
            <PricingPlanModal closeModal={() => setPricingModalOpen(false)} />
          )}
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
