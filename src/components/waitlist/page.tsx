import React from "react";
import { FlexColCenter, FlexColStartCenter } from "../Flex";
import Image from "next/image";
import { blEB } from "@/config/font";
import WaitlistFormComponent from "./component";

function WaitlistPage() {
  return (
    <FlexColStartCenter className="w-full h-screen py-[4em]">
      <FlexColCenter className="w-full max-w-[90%]">
        <FlexColCenter className="w-full text-center mb-4">
          <Image
            src="/images/logo/logo.png"
            width={50}
            height={0}
            alt="logo"
            className=""
          />
          <p className="dark:text-white-300/30 text-white-400 text-xs font-ppL">
            YOUR SAAS LAUNCH PAD
          </p>
          <p className="dark:text-white-100 font-ppSB">
            <span className=" bg-gradient-to-b from-white-100/30 to-white-100/70 inline-block text-transparent bg-clip-text text-3xl md:text-3xl">
              Get early access to
            </span>
            <br />
            <span
              className=" text-white-100 text-4xl md:text-5xl "
              style={blEB.style}
            >
              Veloz
            </span>
          </p>
        </FlexColCenter>
        <br />
        <WaitlistFormComponent />
      </FlexColCenter>
    </FlexColStartCenter>
  );
}

export default WaitlistPage;
