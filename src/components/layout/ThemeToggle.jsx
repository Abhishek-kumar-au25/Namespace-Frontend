import React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/layout/ThemeProvider";

const ThemeToggle = () => {
  const { theme, cycleTheme } = useTheme();
  const isDark = theme === "dark";
  const NextIcon = isDark ? Sun : Moon;
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={cycleTheme}
      aria-label={label}
      title={label}
      className="fixed bottom-6 right-6 z-[60] w-11 h-11 rounded-full btn-glass flex items-center justify-center shadow-lg"
    >
      <NextIcon className="w-5 h-5" />
    </button>
  );
};

export default ThemeToggle;
