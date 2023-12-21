import { FlexColCenter, FlexColStartCenter } from "@/components/Flex";
import React from "react";
import TrustedBy from "../testimonials/TrustedBy";

function Header() {
  return (
    <FlexColCenter className="w-full h-full min-h-[600px] text-center border-b-solid border-b-[1px] border-b-white-300 dark:border-b-white-600 ">
      <h1 className="text-5xl font-ppEB text-white-100">
        Ship your startup in{" "}
        <span className=" line-through text-3xl font-ppSB text-white-300 ">
          Months
        </span>{" "}
        Weeks
      </h1>
      <p className="text-white-300 text-md font-ppReg">
        Launch your startup with our startup launchpad saving development time
        and cost.
      </p>
      <br />
      <TrustedBy />
    </FlexColCenter>
  );
}

export default Header;
