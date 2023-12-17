"use client";
import React, { useContext } from "react";
import { twMerge } from "tailwind-merge";
import SideBar from "@/components/dashboard/Navigations/Sidebar";
import { LayoutContext } from "@/context/LayoutContext";
import TopBar from "../Navigations/TopBar";
import { useSession } from "next-auth/react";
import PricingPlanModal from "../../PricingPlanModal";
import { Spinner } from "@/components/Spinner";
import withAuth from "@/lib/auth-helpers/withAuth";
import useAuthUser from "@/hooks/useAuthUser";

interface DashboardLayoutProps {
  children?: React.ReactNode;
  className?: React.ComponentProps<"div">["className"];
}

// use this component as a wrapper for all dashboard authenticated pages
function DashboardLayout({ children, className }: DashboardLayoutProps) {
  const { pricingModalOpen, setPricingModalOpen } = useContext(LayoutContext);
  // const { data, loading, error, refetch } = useAuthUser(true);

  return (
    // <>
    //   {!data && loading ? (
    //     <p className="text-red-305 font-ppSB">Loading...</p>
    //   ) : (
    //     <div
    //       className={twMerge(
    //         "w-full relative h-screen overflow-y-auto hideScrollBar bg-white-105 dark:bg-dark-100",
    //         className
    //       )}
    //     >
    //       <div className="w-full h-screen flex">
    //         <SideBar />
    //         <div className="w-full z-upper relative  overflow-hidden">
    //           <TopBar />
    //           {children}
    //           {pricingModalOpen && (
    //             <PricingPlanModal
    //               closeModal={() => setPricingModalOpen(false)}
    //             />
    //           )}
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </>
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
