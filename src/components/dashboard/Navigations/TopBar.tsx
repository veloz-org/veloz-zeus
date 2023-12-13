"use client";
import {
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import { Spinner } from "@/components/Spinner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DataContext } from "@/context/DataContext";
import { ChevronDown, PanelRightClose, PanelRightOpen } from "lucide-react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useContext } from "react";

function TopBar() {
  const { userInfo, sidebarOpen, setSidebarOpen, globalLoadingState } =
    useContext(DataContext);

  return (
    <FlexRowCenterBtw className="w-full h-auto px-4 py-2 bg-white-100 shadow-sm">
      <div className="w-auto">
        {/* panel */}
        <button className="" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? (
            <PanelRightOpen size={15} className="text-dark-100" />
          ) : (
            <PanelRightClose size={15} className="text-dark-100" />
          )}
        </button>
      </div>
      <FlexRowEnd className="w-1/4">
        <Popover>
          <PopoverTrigger>
            <button className="w-fit">
              {globalLoadingState ? (
                <Spinner size={15} color="#000" />
              ) : (
                <FlexRowStartCenter className="w-full">
                  <Image
                    src={userInfo.avatar}
                    className="rounded-[50%] p-1 bg-white-200"
                    alt="logo"
                    width={35}
                    height={0}
                  />
                  <FlexColStart className="gap-1 leading-none">
                    <span className="font-ppSB text-dark-100 text-[14px]">
                      {userInfo?.username}
                    </span>
                    <span className="font-ppReg text-white-400 text-[10px]">
                      {userInfo?.email}
                    </span>
                  </FlexColStart>
                  <ChevronDown size={15} />
                </FlexRowStartCenter>
              )}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-full min-w-[200px] bg-white-100 px-1 py-1 m-0">
            <FlexColStart className="w-full gap-1">
              <button className="w-full text-dark-100 flex items-start justify-start rounded-md px-4 py-2 hover:bg-white-200/40 text-[12px] font-ppReg">
                Settings
              </button>
              <button
                className="w-full text-dark-100 flex items-start justify-start rounded-md px-4 py-2 hover:bg-red-305 hover:text-white-100 text-[12px] font-ppSB"
                onClick={() => signOut()}
              >
                Logout
              </button>
            </FlexColStart>
          </PopoverContent>
        </Popover>
      </FlexRowEnd>
    </FlexRowCenterBtw>
  );
}

export default TopBar;
