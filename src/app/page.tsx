"use client";
import { FlexColStart } from "@/components/Flex";
import Header from "@/components/landing/header";
import Image from "next/image";
import { useEffect } from "react";

export default function Home() {
  return (
    <FlexColStart className="w-full min-h-screen mt-[4.5em]">
      <Header />
    </FlexColStart>
  );
}
