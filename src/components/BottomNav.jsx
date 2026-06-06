// Sticky bottom navigation for mobile-first use.
import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Map, LocateFixed, Route, Calculator } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function BottomNav() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const items = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/map", icon: Map, label: t("map") },
    { to: "/near-me", icon: LocateFixed, label: t("nearMe") },
    { to: "/route-checker", icon: Route, label: t("route") },
    { to: "/fine-calculator", icon: Calculator, label: t("calculator") },
  ];

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-[1000] border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around">
        {items.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={active ? "page" : undefined}
                className={`flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${
                  active ? "text-primary" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span className="truncate">{label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
