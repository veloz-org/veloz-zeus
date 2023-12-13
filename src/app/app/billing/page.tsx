"use client";
import { LayoutContext } from "@/context/LayoutContext";
import React from "react";

function BillingPage() {
  const { setActivePage } = React.useContext(LayoutContext);

  // set active page to billing
  setActivePage("billing");

  return <div>BillingPage</div>;
}

export default BillingPage;
