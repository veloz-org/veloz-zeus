import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import { FEATURES_DATA } from "@/data/landing/features";
import { Gem } from "lucide-react";
import React from "react";

function Features() {
  return (
    <FlexColCenter className="w-full mx-auto md:max-w-[95%] py-9 flex-wrap pb-9 mb-[4em]">
      <FlexColStartCenter className="w-auto md:w-auto min-w-[30%] px-8 ">
        <h1 className="text-4xl font-ppEB text-white-100">Features</h1>
        <p className="text-white-300 text-sm font-ppReg">
          Showwcase the features your product has to offer!.
        </p>
        <br />
      </FlexColStartCenter>
      <FlexRowCenter className="w-full mx-auto flex-wrap gap-5 px-8">
        {FEATURES_DATA.map((f, i) => (
          <FeatureCard key={i} title={f.title} description={f.description} />
        ))}
      </FlexRowCenter>
    </FlexColCenter>
  );
}

export default Features;

type FeatureCardProps = {
  title: string;
  description: string;
};

function FeatureCard({ title, description }: FeatureCardProps) {
  return (
    <FlexColStart className="w-full md:max-w-[250px] h-auto p-5 rounded-lg border-[.5px] dark:border-white-300/20 ">
      <Gem size={40} className=" p-2 bg-blue-200 text-blue-101 rounded-full " />
      <FlexColStart className="w-full">
        <h1 className="text-1xl font-ppSB">{title}</h1>
        <p className="text-white-300 text-xs font-ppReg">{description}</p>
      </FlexColStart>
    </FlexColStart>
  );
}
