"use client";
import { LayoutContext } from "@/context/LayoutContext";
import { withAuth } from "@/lib/helpers";
import React from "react";

function SettingsPage() {
  const { setActivePage } = React.useContext(LayoutContext);

  setActivePage("settings");

  return <div>SettingsPage</div>;
}

export default withAuth(SettingsPage);
