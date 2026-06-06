// Language toggle button (Malayalam <-> English).
import { Languages } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();
  return (
    <button
      onClick={toggleLanguage}
      aria-label="Switch language"
      className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent"
    >
      <Languages className="h-4 w-4" aria-hidden="true" />
      {lang === "ml" ? "ENG" : "മല"}
    </button>
  );
}
