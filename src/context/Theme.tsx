import React, { useEffect, useState } from "react";

interface ThemeProviderProps {
  children: React.ReactNode;
}

interface ThemeContextProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ThemeContext = React.createContext<ThemeContextProps>(null as any);

export default function ThemeContextProvider({ children }: ThemeProviderProps) {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(isDarkMode);
  }, []);

  useEffect(() => {
    if (darkMode) {
      localStorage.setItem("darkMode", "true");
    } else {
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  useEffect(() => {
    if (
      localStorage.getItem("darkMode") === "true" ||
      (!("darkMode" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      // @ts-expect-error
      document?.querySelector("html").classList.add("dark");
    } else {
      // @ts-expect-error
      document?.querySelector("html").classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  const providerValue: ThemeContextProps = {
    darkMode,
    toggleDarkMode,
    setDarkMode,
  };

  return (
    <ThemeContext.Provider value={providerValue}>
      {children}
    </ThemeContext.Provider>
  );
}
