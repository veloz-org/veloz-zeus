"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "@/components/dashboard/Navigations/Sidebar";
import TopBar from "../Navigations/TopBar";
import withAuth from "@/lib/auth-helpers/withAuth";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}

// use this component as a wrapper for all dashboard authenticated pages
function DashboardLayout({ children, className }: DashboardLayoutProps) {
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
        </div>
      </div>
    </div>
  );
}

export default withAuth(DashboardLayout);
