"use client";
import {
  FlexColStart,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import BillingTab from "@/components/settings/billing";
import GeneralSettingsTab from "@/components/settings/general/page";
import { useLayoutContext } from "@/context/LayoutContext";
import { cn } from "@/lib/utils";
import { Settings, Wallet } from "lucide-react";
import React, { useState } from "react";

const Tabs = [
  {
    title: "General",
    key: "general",
  },
  {
    title: "Billing",
    key: "billing",
  },
] as const;

type SettingsTabs = (typeof Tabs)[number];

function SettingsPage() {
  const { setActivePage } = useLayoutContext();
  const [activeTab, setActiveTab] = useState<SettingsTabs>({
    title: "General",
    key: "general",
  });

  // set active page in layout context to reflect sidebar active state
  setActivePage("settings");

  return (
    <FlexColStart className="w-full h-full overflow-auto">
      <FlexColStart className="w-full px-4 py-5">
        <h1 className="text-dark-105 dark:text-white-200 text-2xl font-ppSB">
          Settings
        </h1>
        <p className="text-gray-100 leading-none font-ppL text-[13px]">
          Manage your account settings.
        </p>
      </FlexColStart>
      <FlexColStart className="w-full h-auto px-4 mt-1">
        {/* Tabs */}
        <FlexRowStartCenter className="w-full pb-2 mb-6  gap-5 ">
          {Tabs.map((t) => (
            <button key={t.key} onClick={() => setActiveTab(t)}>
              <FlexRowStartCenter className="gap-1">
                {renderTabIcon(t, activeTab)}
                <span
                  className={cn(
                    " font-ppSB text-[12px] group-hover:text-dark-105 dark:group-hover:text-white-100 dark:text-white-300 transition-all",
                    activeTab.key === t.key
                      ? "text-dark-105 dark:text-white-100"
                      : "text-gray-100"
                  )}
                >
                  {t.title}
                </span>
              </FlexRowStartCenter>
            </button>
          ))}
        </FlexRowStartCenter>

        {/* General Tab Content */}
        {activeTab.key === "general" && <GeneralSettingsTab />}

        {/* Subscription Tab Content */}
        {activeTab.key === "billing" && <BillingTab />}
      </FlexColStart>
    </FlexColStart>
  );
}

export default SettingsPage;

function renderTabIcon(tab: SettingsTabs, activeTab: SettingsTabs) {
  const { key } = tab;
  let icon = null;
  if (key === "general") {
    icon = (
      <Settings
        size={15}
        className={cn(
          "group-hover:text-dark-105 dark:text-white-300",
          activeTab.key === "general"
            ? "text-dark-105 dark:text-white-100"
            : "text-gray-100"
        )}
      />
    );
  }

  if (key === "billing") {
    icon = (
      <Wallet
        size={15}
        className={cn(
          "group-hover:text-dark-105 dark:text-white-300",
          activeTab.key === "billing"
            ? "text-dark-105 dark:text-white-100"
            : "text-gray-100"
        )}
      />
    );
  }

  return icon;
}
