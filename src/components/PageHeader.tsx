import { Link } from "@tanstack/react-router";
import logo from "@/assets/logo.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";

interface PageHeaderProps {
  subtitle?: string;
}

export default function PageHeader({ subtitle }: PageHeaderProps) {
  const { t } = useLanguage();
  return (
    <header className="sticky top-0 z-[900] border-b border-border/40 bg-card/80 backdrop-blur-md shadow-sm md:hidden">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-2 px-4 py-3">
        <Link to="/" className="flex items-center gap-2.5 active:scale-95 transition-transform">
          <img
            src={logo}
            alt="SafeDrive Kerala logo"
            width={34}
            height={34}
            className="h-8.5 w-8.5 select-none"
          />
          <div className="leading-tight">
            <p className="text-sm font-black text-foreground">{t("appName")}</p>
            {subtitle && <p className="text-[10px] font-bold text-primary truncate max-w-[150px]">{subtitle}</p>}
          </div>
        </Link>
        <LanguageToggle />
      </div>
    </header>
  );
}
