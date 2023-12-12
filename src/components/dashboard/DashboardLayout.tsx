"use client";
import React, { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "@/components/dashboard/Navigations/Sidebar";
import { LayoutContext } from "@/context/LayoutContext";
import TopBar from "./Navigations/TopBar";
import { useSession } from "next-auth/react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
  activePage: string;
}

// use this component as a wrapper for all dashboard authenticated pages
function DashboardLayout({
  children,
  activePage,
  className,
}: DashboardLayoutProps) {
  const { setActivePage } = useContext(LayoutContext);
  const { status } = useSession();

  useEffect(() => {
    activePage && setActivePage(activePage);
  }, [activePage]);

  if (status === "loading" || status === "unauthenticated") return null;

  return (
    <div
      className={twMerge(
        "w-full relative h-screen overflow-y-auto hideScrollBar bg-white-200 dark:bg-dark-100",
        className
      )}
    >
      <div className="w-full h-screen flex">
        <SideBar activePage={activePage as string} />
        <div className="w-full z-upper relative  overflow-hidden">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
