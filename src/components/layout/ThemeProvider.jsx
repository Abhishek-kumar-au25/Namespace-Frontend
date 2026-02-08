import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const ThemeContext = createContext(null);
const STORAGE_KEY = "namespace-theme";

const DEFAULT_THEME = "dark";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => DEFAULT_THEME);

  const [resolvedTheme, setResolvedTheme] = useState(() => theme);

  useEffect(() => {
    const root = document.documentElement;
    const applyTheme = (nextTheme) => {
      setResolvedTheme(nextTheme);
      root.dataset.theme = nextTheme;
      root.style.colorScheme = nextTheme;
      root.classList.toggle("dark", nextTheme === "dark");
    };

    applyTheme(theme);

    try {
      window.localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // Ignore storage write errors
    }
  }, [theme]);

  const cycleTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  const value = useMemo(
    () => ({ theme, resolvedTheme, setTheme, cycleTheme }),
    [theme, resolvedTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
