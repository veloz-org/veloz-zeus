"use client";
import { FlexColStart } from "@/components/Flex";
import Footer from "@/components/Footer";
import { FAQ, Features, Header, Pricing } from "@/components/landing";
import React from "react";

export default function Home() {
  return (
    <FlexColStart className="w-full min-h-screen mt-[4.5em]">
      <Header />
      <Features />
      <FAQ />
      <Pricing />
      <Footer />
    </FlexColStart>
  );
}
