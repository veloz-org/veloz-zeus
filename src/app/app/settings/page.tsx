"use client";
import {
  FlexColStart,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import SubscriptionTab from "@/components/settings/subscriptions";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LayoutContext } from "@/context/LayoutContext";
import { withAuth } from "@/lib/helpers";
import { cn } from "@/lib/utils";
import { Copy, RotateCw, Settings, Wallet } from "lucide-react";
import { settings } from "nprogress";
import React, { useState } from "react";
import toast from "react-hot-toast";

const Tabs = [
  {
    title: "General",
    key: "general",
  },
  {
    title: "Subscription",
    key: "subscription",
  },
] as const;

type SettingsTabs = (typeof Tabs)[number];

function SettingsPage() {
  const { setActivePage } = React.useContext(LayoutContext);
  const [activeTab, setActiveTab] = useState<SettingsTabs>({
    title: "General",
    key: "general",
  });

  // set active page in layout context to reflect sidebar active state
  setActivePage("settings");

  return (
    <FlexColStart className="w-full h-full">
      <FlexColStart className="w-full px-4 py-5">
        <h1 className="text-dark-100 text-2xl font-ppSB">Settings</h1>
        <p className="text-gray-100 leading-none font-ppL text-[13px]">
          Manage your account settings.
        </p>
      </FlexColStart>
      <FlexColStart className="w-full px-4 mt-1">
        {/* Tabs */}
        <FlexRowStartCenter className="w-full pb-2 mb-6  gap-5 ">
          {Tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t)}>
              <FlexRowStartCenter className="gap-1">
                {renderTabIcon(t, activeTab)}
                <span
                  className={cn(
                    " font-ppSB text-[12px] group-hover:text-dark-100 transition-all",
                    activeTab.key === t.key ? "text-dark-100" : "text-gray-100"
                  )}
                >
                  {t.title}
                </span>
              </FlexRowStartCenter>
            </button>
          ))}
        </FlexRowStartCenter>

        {/* General Tab Content */}
        {activeTab.key === "general" && (
          <FlexColStart className="w-full mt-4">
            <p className="text-dark-100">Welcome</p>
          </FlexColStart>
        )}

        {/* Subscription Tab Content */}
        {activeTab.key === "subscription" && <SubscriptionTab />}
      </FlexColStart>
    </FlexColStart>
  );
}

export default withAuth(SettingsPage);

function renderTabIcon(tab: SettingsTabs, activeTab: SettingsTabs) {
  const { key } = tab;
  let icon = null;
  if (key === "general") {
    icon = (
      <Settings
        size={15}
        className={cn(
          "group-hover:text-dark-100",
          activeTab.key === "general" ? "text-dark-100" : "text-gray-100"
        )}
      />
    );
  }

  if (key === "subscription") {
    icon = (
      <Wallet
        size={15}
        className={cn(
          "group-hover:text-dark-100",
          activeTab.key === "subscription" ? "text-dark-100" : "text-gray-100"
        )}
      />
    );
  }

  return icon;
}
