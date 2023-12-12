import { FlexColStart, FlexRowStartCenter } from "@/components/Flex";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface SidebarProps {
  activePage: string;
}

const navigations = [
  {
    name: "Dashboard",
    link: "/dashboard",
  },
  {
    name: "Users",
    link: "/users",
  },
  {
    name: "Settings",
    link: "/settings",
  },
];

function Sidebar({ activePage }: SidebarProps) {
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
          width={25}
          height={0}
        />
        <span className="font-ppSB text-white-100 text-2xl">Veloz</span>
      </FlexRowStartCenter>
      <FlexColStart className="w-full px-5">
        {navigations.map((nav, i) => (
          <Link
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
        className={cn("group-hover:text-white-100 transition ease-in-out")}
        fill={style}
      />
    );
  }

  return icon;
}
