"use client";
import React, { createContext, useState } from "react";

interface LayoutContextValuesProps {
  setActivePage: (page: string) => void;
  activePage: string;
  pricingModalOpen: boolean;
  setPricingModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const LayoutContext = createContext<LayoutContextValuesProps>(
  {} as LayoutContextValuesProps
);

function LayoutContextProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState("");
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const providerValues: LayoutContextValuesProps = {
    setActivePage,
    activePage,
    pricingModalOpen,
    setPricingModalOpen,
  };

  return (
    <LayoutContext.Provider value={providerValues}>
      {children}
    </LayoutContext.Provider>
  );
}

export default LayoutContextProvider;
