import { FlexColStart, FlexRowStartCenter } from "@/components/Flex";
import { DataContext } from "@/context/DataContext";
import { cn } from "@/lib/utils";
import { LayoutDashboard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

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
  const { userInfo } = useContext(DataContext);
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
