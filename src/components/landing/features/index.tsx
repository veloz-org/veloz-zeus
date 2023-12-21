import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
} from "@/components/Flex";
import { Diamond, DiamondIcon, Gem } from "lucide-react";
import React from "react";

function Features() {
  return (
    <FlexColStartCenter className="w-full py-9">
      <h1 className="text-4xl font-ppEB text-white-100">Features</h1>
      <p className="text-white-300 text-sm font-ppReg">
        Showwcase the features your product has to offer!.
      </p>
      <br />
      <FeatureCard />
    </FlexColStartCenter>
  );
}

export default Features;

function FeatureCard() {
  return (
    <FlexColStart className="w-full max-w-[300px] h-auto p-5 rounded-lg border-[.5px] dark:border-white-300/20 ">
      <Gem size={40} className=" p-2 bg-blue-200 text-blue-101 rounded-full " />
      <FlexColStart className="w-full">
        <h1 className="text-2xl font-ppSB">Title</h1>
        <p className="text-white-300 text-xs font-ppReg">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos earum
          eligendi quasi odio magnam cupiditate, officiis iusto aliquam dicta
          impedit!
        </p>
      </FlexColStart>
    </FlexColStart>
  );
}
