import { useEffect, useState } from "react";

type Theme = "light" | "dark";

export default function useDarkSide() {
  const [theme, setTheme] = useState(localStorage.theme ?? "light");
  const colorTheme: Theme = theme;

  useEffect(() => {
    // save theme to local storage
    localStorage.setItem("theme", theme);
  }, [theme, colorTheme]);

  useEffect(() => {
    if (
      localStorage.getItem("theme") === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      // @ts-expect-error
      document?.querySelector("html").classList.add("dark");
    } else {
      // @ts-expect-error
      document?.querySelector("html").classList.remove("dark");
    }
  }, [theme]);

  return { colorTheme, theme, setTheme };
}
