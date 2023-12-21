"use client";
import { FlexColStart } from "@/components/Flex";
import Footer from "@/components/Footer";
import { FullPageLoader } from "@/components/Loader";
import { FAQ, Features, Header, Pricing } from "@/components/landing";
import TopBar from "@/components/landing/navigations/TopBar";
import WaitlistPage from "@/components/waitlist/page";
import usePageLoaded from "@/hooks/usePageLoaded";
import React from "react";

export default function Home() {
  // wait for 1ms so all assets would might have gotten loaded b4 rendering
  const pageloaded = usePageLoaded(1000);

  return (
    <FlexColStart className="w-full min-h-screen mt-[4.5em] scroll-smooth">
      {!pageloaded && <FullPageLoader />}

      {/* navigation section */}
      <TopBar />

      {/* components sections */}
      <Header />
      <Features />
      <Pricing />
      <FAQ />
      <Footer />

      {/* waitlist page (if in use, comment out the above sections including the footer and topbar) */}
      {/* <WaitlistPage /> */}
    </FlexColStart>
  );
}
