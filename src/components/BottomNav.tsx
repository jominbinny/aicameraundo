import { Link, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import {
  Home,
  Map,
  Route as RouteIcon,
  TrafficCone,
  Menu,
  LocateFixed,
  Calculator,
  BookOpen,
  ShieldAlert,
  PhoneCall,
  Info,
  ChevronRight,
} from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export default function BottomNav() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [isOpen, setIsOpen] = useState(false);

  const mainItems = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/map", icon: Map, label: t("map") },
    { to: "/route-checker", icon: RouteIcon, label: t("route") },
    { to: "/road-signs", icon: TrafficCone, label: t("roadSigns") },
  ];

  const moreItems = [
    { to: "/near-me", icon: LocateFixed, label: t("nearMe"), desc: t("findNearby"), color: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20" },
    { to: "/fine-calculator", icon: Calculator, label: t("fineCalculator"), desc: t("selectViolation"), color: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20" },
    { to: "/learners-license", icon: BookOpen, label: t("learnersLicense"), desc: t("viewGuide"), color: "text-blue-500 bg-blue-500/10 dark:bg-blue-500/20" },
    { to: "/safety-tips", icon: ShieldAlert, label: t("safetyTips"), desc: t("tipOfTheDay"), color: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/20" },
    { to: "/emergency", icon: PhoneCall, label: t("emergencyContacts"), desc: t("callEmergency"), color: "text-red-500 bg-red-500/10 dark:bg-red-500/20" },
    { to: "/about", icon: Info, label: t("about"), desc: t("aboutTitle"), color: "text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20" },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="fixed inset-x-0 bottom-0 z-[950] border-t border-border/40 bg-card/85 pb-safe backdrop-blur-lg shadow-[0_-8px_30px_rgba(0,0,0,0.08)] rounded-t-[1.75rem] md:hidden"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2">
        {mainItems.map(({ to, icon: Icon, label }) => {
          const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
          return (
            <li key={to} className="flex-1">
              <Link
                to={to}
                aria-current={active ? "page" : undefined}
                className="flex flex-col items-center gap-1.5 py-3 transition-transform active:scale-95 select-none"
              >
                <div
                  className={`flex items-center justify-center rounded-full px-4 py-1 transition-all duration-300 ${
                    active
                      ? "bg-primary/10 text-primary scale-105 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                  className={`text-[9px] tracking-wide transition-colors ${
                    active ? "text-primary font-black" : "text-muted-foreground font-semibold"
                  }`}
                >
                  {label}
                </span>
              </Link>
            </li>
          );
        })}

        {/* More Trigger */}
        <li className="flex-1">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="flex w-full flex-col items-center gap-1.5 py-3 transition-transform active:scale-95 select-none"
              >
                <div
                  className={`flex items-center justify-center rounded-full px-4 py-1 transition-all duration-300 ${
                    isOpen
                      ? "bg-primary/10 text-primary scale-105 font-bold"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <Menu className="h-5 w-5" aria-hidden="true" />
                </div>
                <span
                  className={`text-[9px] tracking-wide transition-colors ${
                    isOpen ? "text-primary font-black" : "text-muted-foreground font-semibold"
                  }`}
                >
                  {t("more")}
                </span>
              </button>
            </SheetTrigger>
            <SheetContent
              side="bottom"
              className="rounded-t-[2.25rem] border-t border-border/40 bg-card p-6 pb-8 max-h-[85vh] overflow-y-auto shadow-[0_-15px_30px_rgba(0,0,0,0.12)] focus-visible:outline-none"
            >
              {/* Grab Handle */}
              <div className="w-12 h-1 bg-muted rounded-full mx-auto mb-4 shrink-0" />

              <SheetHeader className="text-left pb-4 border-b border-border/40">
                <SheetTitle className="text-xl font-black">{t("menu")}</SheetTitle>
                <SheetDescription className="text-xs text-muted-foreground mt-1 leading-relaxed">
                  {t("heroDescription")}
                </SheetDescription>
              </SheetHeader>

              <div className="mt-4 grid gap-3 py-1">
                {moreItems.map(({ to, icon: Icon, label, desc, color }) => {
                  const active = pathname.startsWith(to);
                  return (
                    <Link
                      key={to}
                      to={to}
                      onClick={() => setIsOpen(false)}
                      className={`flex items-center justify-between rounded-2xl border p-4 transition-all active:scale-[0.98] ${
                        active
                          ? "border-primary bg-primary/5 ring-1 ring-primary"
                          : "border-border/60 bg-card hover:bg-accent"
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${color}`}>
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="text-left">
                          <p className="text-sm font-bold text-foreground">{label}</p>
                          <p className="text-xs text-muted-foreground line-clamp-1 mt-0.5">{desc}</p>
                        </div>
                      </div>
                      <ChevronRight className="h-4.5 w-4.5 text-muted-foreground" />
                    </Link>
                  );
                })}
              </div>
            </SheetContent>
          </Sheet>
        </li>
      </ul>
    </nav>
  );
}
