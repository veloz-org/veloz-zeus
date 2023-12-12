import { FlexColStart } from "@/components/Flex";
import React from "react";

interface SidebarProps {
  activePage: string;
}

function Sidebar({ activePage }: SidebarProps) {
  return (
    <FlexColStart className="w-[70%] max-w-[350px] h-full bg-dark-100 ">
      <p className="text-white-100">welcome</p>
    </FlexColStart>
  );
}

export default Sidebar;
