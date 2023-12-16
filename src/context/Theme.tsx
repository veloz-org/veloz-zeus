import useDarkSide from "@/hooks/useDarkside";
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
  const { colorTheme, theme, setTheme } = useDarkSide();
  const [darkMode, setDarkMode] = useState(
    colorTheme === "dark" ? true : false
  );

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
    setTheme(colorTheme === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    setDarkMode(colorTheme === "dark" ? true : false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

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
