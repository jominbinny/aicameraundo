// Theme toggle button (Sun/Moon).
import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle light/dark mode"
      className="inline-flex items-center justify-center rounded-full border border-border bg-card p-2 text-sm font-medium text-foreground shadow-sm transition-all duration-300 hover:bg-accent active:scale-95"
    >
      {theme === "dark" ? (
        <Sun className="h-4.5 w-4.5 text-amber-500 transition-transform hover:rotate-45" aria-hidden="true" />
      ) : (
        <Moon className="h-4.5 w-4.5 text-indigo-600 transition-transform hover:-rotate-12" aria-hidden="true" />
      )}
    </button>
  );
}
