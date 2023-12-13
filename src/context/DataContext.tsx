import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserInfo } from "@/types";

interface ContextValuesType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
  globalLoadingState: boolean;
  setGlobalLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

function DataContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
