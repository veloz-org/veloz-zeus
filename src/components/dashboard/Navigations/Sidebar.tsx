import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import Button from "@/components/ui/button";
import { DataContext } from "@/context/DataContext";
import { LayoutContext } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Settings, WalletCards, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

interface SidebarProps {
  // activePage: string;
}

const navigations = [
  {
    name: "Dashboard",
    link: "/app/dashboard",
  },
  {
    name: "Settings",
    link: "/app/settings",
  },
  {
    name: "Billing",
    link: "/app/billing",
  },
];

function Sidebar({}: SidebarProps) {
  const { userInfo } = useContext(DataContext);
  const { activePage } = useContext(LayoutContext);
  const navListStyle = (pageName: string, navName: string) => {
    const notActive = "text-gray-100 bg-none",
      Active = "text-white-100 bg-blue-100",
      iconActive = "#fff",
      iconNotActive = "#ccc";

    if (pageName === navName) return { btn: Active, icon: iconActive };
    else return { btn: notActive, icon: iconNotActive };
  };

  return (
    <FlexColStart className="w-full h-full max-w-[220px] bg-dark-100 relative border-r-solid border-r-[1px] border-r-dark-400 hideScrollBar py-1 ">
      <FlexRowStartCenter className="w-full py-3 px-5">
        <Image
          src={"/images/logo/logo.png"}
          className=""
          alt="logo"
          width={40}
          height={0}
        />
        <FlexColStart className="gap-1 leading-none">
          <span className="font-ppSB text-white-100 text-[20px]">Veloz</span>
          <span className="font-ppReg text-white-300 text-[10px]">
            Dashboard ({userInfo?.role})
          </span>
        </FlexColStart>
      </FlexRowStartCenter>
      <FlexColStart className="w-full h-full px-5">
        {navigations.map((nav, i) => (
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
        ))}
      </FlexColStart>

      {/* upgrade plan widget */}
      <UpgradePlanWidget />
    </FlexColStart>
  );
}

export default Sidebar;

function UpgradePlanWidget() {
  return (
    <FlexColCenter className="w-full px-5 py-4 absolute bottom-2">
      <FlexColStart className="w-full bg-dark-200 p-3 rounded-md border-solid border-[.5px] border-gray-100/30 ">
        <FlexRowCenterBtw>
          <p className="text-white-300 text-[10px] leading-none font-ppL">
            Current Plan
          </p>
          <span
            className={cn(
              "text-white-100 text-[10px] px-3 py-1 rounded-[30px] border-solid border-[1px] border-white-600 leading-none font-jbSB"
            )}
          >
            Free
            {/* {getPlanTitle(userPlan)} */}
          </span>
        </FlexRowCenterBtw>
        <p className="text-gray-100 font-jbPR text-[10px] ">
          Upgrade your account to get access to incredible features.
        </p>
        <FlexColCenter className="w-full mt-2">
          <Button
            className={cn(
              "w-full bg-blue-100 hover:bg-blue-100/80 rounded-md py-2 h-[40px] font-ppSB text-[14px] gap-2"
            )}
          >
            <Zap size={15} />{" "}
            <span className="text-[13px] font-ppSB">Upgrade</span>
          </Button>
        </FlexColCenter>
      </FlexColStart>
    </FlexColCenter>
  );
}

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

  return icon;
}
