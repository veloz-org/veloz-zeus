"use client";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowEnd,
  FlexRowEndCenter,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { LANDING_TOP_BAR_NAV } from "@/data/landing/navigation";
import useTheme from "@/hooks/useTheme";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, Moon, SunMoon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [showSlideBar, setShowSlideBar] = React.useState(false);

  //track when screen size changes
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setShowSlideBar(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="w-full fixed top-0 z-[999] ">
      <FlexRowStartCenter className="w-full h-auto py-4 px-5 dark:bg-dark-100 bg-white-100 border-b-solid border-b-[.1px] dark:border-b-white-100/20 border-b-white-400 justify-between ">
        <FlexRowStartCenter className="w-fit gap-1">
          <Image
            src="/images/logo/logo.png"
            width={30}
            height={0}
            alt="logo"
            className=""
          />
          <span className="text-dark-100 dark:text-white-100  text-md font-ppSB ml-2">
            Veloz
          </span>
        </FlexRowStartCenter>
        <FlexRowStartCenter className="w-fit gap-3 hidden md:flex">
          {LANDING_TOP_BAR_NAV.map((n, i) =>
            !n.external ? (
              <Link
                className="text-[12px] font-ppSB text-white-400 dark:text-white-200 hover:text-dark-100 dark:hover:text-white-100 hover:underline transition-all"
                href={n.href}
                key={n.key}
              >
                {n.name}
              </Link>
            ) : (
              <a href={n.href} key={n.key}>
                {n.name}
              </a>
            )
          )}
        </FlexRowStartCenter>
        <FlexRowEndCenter className="w-fit">
          <FlexRowStartCenter className="absolute top-5 md:hidden flex ">
            <button
              className="w-fit"
              onClick={() => setShowSlideBar(!showSlideBar)}
            >
              {!showSlideBar ? <Menu /> : <X />}
            </button>
          </FlexRowStartCenter>

          <button
            className="w-fit relative right-9 md:right-0 text-dark-105 dark:text-white-200 flex items-start justify-start rounded-md text-[12px]"
            onClick={() => toggleTheme()}
          >
            {theme === "dark" ? (
              <SunMoon
                size={25}
                className="p-1 border-solid border-[.5px] border-white-300/40 rounded-[50%] text-dark-105 dark:text-white-100 dark:bg-blue-101 scale-[.89] hover:scale-[.95] transition-all"
              />
            ) : (
              <Moon
                size={25}
                className="p-1 border-solid border-[.5px] border-white-300/40 rounded-[50%] text-dark-105 bg-white-300/60 scale-[.89] hover:scale-[.95] transition-all"
              />
            )}
          </button>

          <Link
            href="/auth"
            className="w-auto px-5 py-3 rounded-[30px] group hover:dark:bg-blue-101 hover:bg-blue-101 hover:text-white-100 bg-white-300 dark:bg-dark-102 transition-all hidden md:block "
          >
            <FlexRowStartCenter className="gap-2">
              <span className="group-hover:text-white-100 dark:text-white-300 text-white-400 text-sm font-ppSB">
                Get started ✨
              </span>
              <ChevronRight
                size={15}
                className="text-dark-100 group-hover:text-white-100 dark:text-white-100 group-hover:translate-x-2 translate-x-0 transition-all"
              />
            </FlexRowStartCenter>
          </Link>
        </FlexRowEndCenter>
      </FlexRowStartCenter>
      <SlideBar visible={showSlideBar} />
    </div>
  );
}

export default TopBar;

/**
 * @description Navigation bar shown when on mobile screen
 * @param {boolean} visible
 */

type SlideBarProps = {
  visible?: boolean;
};

function SlideBar({ visible }: SlideBarProps) {
  return (
    <FlexColStart
      className={cn(
        "w-full bg-dark-100 px-9 py-5 transition-all z-[999] overflow-hidden  ",
        visible ? "h-[100vh] visible" : "h-0 invisible"
      )}
    >
      {/* Hide this by default, preventing the part of the list from showing due to the padding added to the container  */}
      <FlexColStart
        className={cn("w-fit gap-3", visible ? "visible" : "invisible")}
      >
        {LANDING_TOP_BAR_NAV.map((n, i) =>
          !n.external ? (
            <Link
              className="text-[12px] font-ppReg text-white-200 hover:text-white-100 hover:underline transition-all"
              href={n.href}
              key={n.key}
            >
              {n.name}
            </Link>
          ) : (
            <a href={n.href} key={n.key}>
              {n.name}
            </a>
          )
        )}
      </FlexColStart>
      <br />
      <FlexColStart className="w-full">
        <Link
          href="/auth"
          className="w-full px-5 py-3 rounded-[30px] group hover:dark:bg-blue-101 hover:bg-blue-101 bg-white-300 dark:bg-dark-102 transition-all"
        >
          <FlexRowCenter className="gap-2">
            <span className="text-white-300 group-hover:text-white-100 text-sm font-ppReg">
              Get started ✨
            </span>
            <ChevronRight
              size={15}
              className="text-dark-100 group-hover:text-white-100 dark:text-white-100 group-hover:translate-x-2 translate-x-0 transition-all"
            />
          </FlexRowCenter>
        </Link>
      </FlexColStart>
    </FlexColStart>
  );
}
