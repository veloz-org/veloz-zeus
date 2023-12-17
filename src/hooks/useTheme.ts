"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const storedTheme = window ? window.localStorage.getItem("theme") : null;
    return (storedTheme as Theme) ?? ("light" as Theme);
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}
