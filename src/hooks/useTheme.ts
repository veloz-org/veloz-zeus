"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useTheme() {
  const [theme, setTheme] = useState<Theme>();

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    // Set theme on change
    if (theme) {
      const root = window.document.documentElement;
      root.classList.remove("dark", "light");
      root.classList.add(theme);

      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  useEffect(() => {
    // Set theme on first load
    const root = window.document.documentElement;

    if (!theme) {
      const storedTheme =
        localStorage.getItem("theme") === "undefined"
          ? "light"
          : localStorage.getItem("theme");

      root.classList.remove("dark", "light", "undefined");
      root.classList.add(storedTheme as Theme);

      setTheme(storedTheme as Theme);
    }
  }, [theme]);

  return { theme, setTheme, toggleTheme };
}
