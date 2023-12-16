import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserInfo } from "@/types";

interface ContextValuesType {
  userInfo: UserInfo | null;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo | null>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  globalLoadingState: boolean;
  setGlobalLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  subscribed_plans: string[];
  setSubscribedPlans: React.Dispatch<React.SetStateAction<string[]>>;
  current_plan: string;
  setCurrentPlan: React.Dispatch<React.SetStateAction<string>>;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

function DataContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [subscribed_plans, setSubscribedPlans] = useState<string[]>([]);
  const [current_plan, setCurrentPlan] = useState<string>("" as string);

  // this should be used for global loading state (e.g. when fetching data) that
  // should be used across the app/pages
  const [globalLoadingState, setGlobalLoadingState] = useState(false);

  const contextValues: ContextValuesType = {
    userInfo,
    setUserInfo,
    sidebarOpen,
    setSidebarOpen,
    setGlobalLoadingState,
    globalLoadingState,
    subscribed_plans,
    setSubscribedPlans,
    setCurrentPlan,
    current_plan,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
