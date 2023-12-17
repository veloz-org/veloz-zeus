"use client";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useDarkSide() {
  const [theme, setTheme] = useState<Theme>("light");
  const colorTheme: Theme = theme;

  useEffect(() => {
    // save theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      // @ts-expect-error
      document?.querySelector("html").classList.add("dark");
      setTheme("dark");
    } else {
      // @ts-expect-error
      document?.querySelector("html").classList.remove("dark");
      setTheme("light");
    }
  }, [theme]);

  return { colorTheme, theme, setTheme };
}
