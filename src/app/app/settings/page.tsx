"use client";
import { LayoutContext } from "@/context/LayoutContext";
import React from "react";

function SettingsPage() {
  const { setActivePage } = React.useContext(LayoutContext);

  setActivePage("settings");

  return <div>SettingsPage</div>;
}

export default SettingsPage;
