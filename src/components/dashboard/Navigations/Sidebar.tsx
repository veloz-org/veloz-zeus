"use client";
import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Modal from "@/components/Modal";
import { OnlyAdmin } from "@/components/ProtectedComp";
import { Spinner } from "@/components/Spinner";
import Button from "@/components/ui/button";
import { DataContext } from "@/context/DataContext";
import { LayoutContext } from "@/context/LayoutContext";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import {
  Contact,
  LayoutDashboard,
  PanelRightClose,
  PanelRightOpen,
  Settings,
  WalletCards,
  Zap,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

interface SidebarProps {
  // activePage: string;
}

const navigations = [
  {
    name: "Dashboard",
    link: "/app/dashboard",
  },
  {
    name: "Waitlist",
    link: "/app/waitlist",
  },
  {
    name: "Settings",
    link: "/app/settings",
  },
];

function Sidebar({}: SidebarProps) {
  const { userInfo, setSidebarOpen, sidebarOpen, globalLoadingState } =
    useContext(DataContext);
  const { activePage } = useContext(LayoutContext);
  const { theme } = useTheme();

  const navListStyle = (
    pageName: string,
    navName: string
  ): { btn: string; icon: string } => {
    const notActive = "text-gray-100 bg-none",
      Active = "text-white-100 bg-blue-100",
      iconActive = "#fff",
      iconNotActive = "#ccc";

    if (pageName === navName) return { btn: Active, icon: iconActive };
    else return { btn: notActive, icon: iconNotActive };
  };

  return (
    <FlexColStart
      className={cn(
        "w-0 h-full md:max-w-[220px] overflow-hidden bg-dark-100 fixed top-0 left-0 md:relative border-r-solid border-r-[1px] border-r-dark-400 dark:border-r-white-600 dark:border-[.5px] hideScrollBar py-1 transition-all ease-in-out z-[9999] md:z-[1] ",
        sidebarOpen ? "w-[250px]" : "w-0 overflow-hidden"
      )}
    >
      <FlexRowStartCenter className="relative w-full py-3 px-5">
        <Image
          src={"/images/logo/logo.png"}
          className=""
          alt="logo"
          width={40}
          height={0}
        />
        <FlexColStart className="gap-1 leading-none">
          <span className="font-ppSB text-white-100 text-[20px]">Veloz</span>
          {globalLoadingState ? (
            <Spinner size={12} color={theme === "dark" ? "#6b77f1" : "#fff"} />
          ) : (
            <span className="font-ppReg text-white-300 text-[10px]">
              {userInfo?.role}
            </span>
          )}
        </FlexColStart>

        {/* only visible on mobile screen */}
        <button
          className="md:hidden absolute top-1 right-2"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <PanelRightOpen size={15} className="text-white-100" />
          ) : (
            <PanelRightClose size={15} className="text-white-100" />
          )}
        </button>
      </FlexRowStartCenter>
      <FlexColStart className="w-full h-full px-5">
        {navigations.map((nav, i) => {
          if (nav.name.toLowerCase() === "waitlist") {
            return (
              <OnlyAdmin key={i}>
                <Link
                  key={i}
                  href={nav.link}
                  className={cn(
                    "w-full h-auto group px-4 py-3 rounded-sm flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
                    navListStyle(activePage, nav.name.toLowerCase()).btn
                  )}
                >
                  {renderNavIcons(
                    nav.name,
                    navListStyle(activePage, nav.name.toLowerCase()).icon
                  )}
                  <span className="group-hover:text-white-100 transition ease-in-out">
                    {nav.name}
                  </span>
                </Link>
              </OnlyAdmin>
            );
          }
          return (
            <Link
              key={i}
              href={nav.link}
              className={cn(
                "w-full h-auto group px-4 py-3 rounded-sm flex items-center justify-start gap-2 font-ppReg transition ease-in-out text-[14px]",
                navListStyle(activePage, nav.name.toLowerCase()).btn
              )}
            >
              {renderNavIcons(
                nav.name,
                navListStyle(activePage, nav.name.toLowerCase()).icon
              )}
              <span className="group-hover:text-white-100 transition ease-in-out">
                {nav.name}
              </span>
            </Link>
          );
        })}
      </FlexColStart>
    </FlexColStart>
  );
}

export default Sidebar;

function renderNavIcons(name: string, style: string) {
  const _name = name.toLowerCase();
  let icon = null;
  if (_name === "dashboard") {
    icon = (
      <LayoutDashboard
        size={15}
        className={cn(
          "group-hover:text-white-100 transition ease-in-out",
          style
        )}
      />
    );
  }
  if (_name === "settings") {
    icon = (
      <Settings
        size={20}
        className={cn(
          "group-hover:text-white-100 transition ease-in-out",
          style
        )}
      />
    );
  }

  if (_name === "billing") {
    icon = (
      <WalletCards
        size={20}
        className={cn(
          "group-hover:text-white-100 transition ease-in-out",
          style
        )}
      />
    );
  }
  if (_name === "waitlist") {
    icon = (
      <Contact
        size={20}
        className={cn(
          "group-hover:text-white-100 transition ease-in-out",
          style
        )}
      />
    );
  }

  return icon;
}
