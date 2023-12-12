"use client";
import {
  FlexColStart,
  FlexRowCenterBtw,
  FlexRowEnd,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { DataContext } from "@/context/DataContext";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { useContext } from "react";

function TopBar() {
  const { userInfo } = useContext(DataContext);

  return (
    <FlexRowCenterBtw className="w-full h-auto px-4 py-2 bg-white-100 shadow-sm">
      <div></div>
      <FlexRowEnd className="w-1/4">
        <Popover>
          <PopoverTrigger>
            <button className="w-fit">
              <FlexRowStartCenter className="w-full">
                <Image
                  src={"/images/logo/logo.png"}
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
            </button>
          </PopoverTrigger>
          <PopoverContent>
            <FlexColStart className="w-full">
              <span className="text-dark-100 font-ppSB">Content</span>
            </FlexColStart>
          </PopoverContent>
        </Popover>
      </FlexRowEnd>
    </FlexRowCenterBtw>
  );
}

export default TopBar;
