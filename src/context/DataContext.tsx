import React, { ReactNode, createContext, useContext, useState } from "react";
import { UserInfo } from "@/types";

interface ContextValuesType {
  userInfo: UserInfo;
  setUserInfo: React.Dispatch<React.SetStateAction<UserInfo>>;
}

export const DataContext = createContext<ContextValuesType>(
  {} as ContextValuesType
);

function DataContextProvider({ children }: { children: ReactNode }) {
  const [userInfo, setUserInfo] = useState<UserInfo>({} as UserInfo);

  const contextValues: ContextValuesType = {
    userInfo,
    setUserInfo,
  };

  return (
    <DataContext.Provider value={contextValues}>
      {children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
