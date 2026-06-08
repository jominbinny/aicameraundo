// Sticky top app bar with logo, title and language toggle.
import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

export default function PageHeader({ subtitle }) {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-[900] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2">
          <img src={logo} alt="SafeDrive Kerala logo" width={36} height={36} className="h-9 w-9" />
          <div className="leading-tight">
            <p className="text-sm font-bold text-foreground">{t("appName")}</p>
            {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
          </div>
        </Link>
        <LanguageToggle />
      </div>
    </header>
  );
}
