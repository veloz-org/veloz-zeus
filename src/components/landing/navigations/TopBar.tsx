"use client";
import {
  FlexColStart,
  FlexRowCenter,
  FlexRowEnd,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { LANDING_TOP_BAR_NAV } from "@/data/navigations/landing";
import { cn } from "@/lib/utils";
import { ChevronRight, Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function TopBar() {
  const [showSlideBar, setShowSlideBar] = React.useState(false);

  //  track when screen size changes
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
      <FlexRowStartCenter className="w-full h-auto py-4 px-5 bg-dark-100 border-b-solid border-b-[.1px] border-b-white-100/20 justify-between ">
        <FlexRowStartCenter className="w-fit gap-1">
          <Image
            src="/images/logo/logo.png"
            width={30}
            height={0}
            alt="logo"
            className=""
          />
          <span className="text-white-100 text-md font-ppEB ml-2">Veloz</span>
        </FlexRowStartCenter>
        <FlexRowStartCenter className="w-fit gap-3 hidden md:flex">
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
        </FlexRowStartCenter>
        <FlexRowEnd className="w-fit">
          <FlexRowStartCenter className="absolute top-6 md:hidden flex ">
            <button
              className="w-fit"
              onClick={() => setShowSlideBar(!showSlideBar)}
            >
              {!showSlideBar ? <Menu /> : <X />}
            </button>
          </FlexRowStartCenter>
          <Link
            href="/auth"
            className="w-fit px-5 py-3 rounded-[30px] group hover:dark:bg-blue-101 hover:bg-blue-101 bg-white-300 dark:bg-dark-102 transition-all hidden md:block "
          >
            <FlexRowStartCenter className="gap-2">
              <span className="text-white-300 group-hover:text-white-100 text-sm font-ppReg">
                Get started ✨
              </span>
              <ChevronRight
                size={15}
                className="text-dark-100 group-hover:text-white-100 dark:text-white-100 group-hover:translate-x-2 translate-x-0 transition-all"
              />
            </FlexRowStartCenter>
          </Link>
        </FlexRowEnd>
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
        visible ? "h-[100vh]" : "h-0"
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
