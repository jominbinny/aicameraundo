import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Map,
  LocateFixed,
  Route as RouteIcon,
  Camera,
  Calculator,
  TrafficCone,
  BookOpen,
  ShieldAlert,
  PhoneCall,
  ShieldCheck,
  CheckCircle,
} from "lucide-react";
import logo from "@/assets/logo.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { getCameraCount, getDistricts } from "@/services/cameraService";
import FeatureCard from "@/components/ui/FeatureCard";
import SafetyTipCard from "@/components/ui/SafetyTipCard";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "SafeDrive Kerala — Road Safety & AI Camera Portal" },
      {
        name: "description",
        content:
          "Explore traffic safety zones, search fine rules, check guidelines, and browse AI camera locations across Kerala roads.",
      },
      { property: "og:title", content: "SafeDrive Kerala" },
      {
        property: "og:description",
        content: "Road Safety & AI Camera Information Portal.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "SafeDrive Kerala",
          applicationCategory: "TravelApplication",
          operatingSystem: "Web",
          description: "Road Safety & AI Camera Information Portal.",
        }),
      },
    ],
  }),
  component: HomePage,
});

interface SafetyTip {
  id: string;
  category: string;
  title_en: string;
  title_ml: string;
  content_en: string;
  content_ml: string;
  icon: string;
}

function HomePage() {
  const { t } = useLanguage();
  const cameraCount = getCameraCount();
  const districtCount = getDistricts().filter(Boolean).length;

  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [loadingTips, setLoadingTips] = useState(true);

  // Fetch safety tips for the Tip of the Day widget
  useEffect(() => {
    fetch("/data/tips.json")
      .then((res) => res.json())
      .then((data) => {
        setTips(data);
        setLoadingTips(false);
      })
      .catch((err) => {
        console.error("Failed to load tips on Home Page:", err);
        setLoadingTips(false);
      });
  }, []);

  // Determine a stable random "Tip of the Day" using date hash
  const tipOfTheDay = useMemo(() => {
    if (!tips.length) return null;
    const dateString = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % tips.length;
    return tips[index];
  }, [tips]);

  const quickActions = [
    { to: "/map", icon: Map, label: t("viewMap"), desc: t("tagline"), bg: "text-emerald-500 bg-emerald-500/10 dark:bg-emerald-500/20" },
    { to: "/near-me", icon: LocateFixed, label: t("nearMe"), desc: t("findNearby"), bg: "text-indigo-500 bg-indigo-500/10 dark:bg-indigo-500/20" },
    { to: "/route-checker", icon: RouteIcon, label: t("routeChecker"), desc: t("camerasOnRoute"), bg: "text-blue-500 bg-blue-500/10 dark:bg-blue-500/20" },
    { to: "/fine-calculator", icon: Calculator, label: t("fineCalculator"), desc: t("selectViolation"), bg: "text-amber-500 bg-amber-500/10 dark:bg-amber-500/20" },
    { to: "/road-signs", icon: TrafficCone, label: t("roadSigns"), desc: t("searchSigns"), bg: "text-red-500 bg-red-500/10 dark:bg-red-500/20" },
    { to: "/learners-license", icon: BookOpen, label: t("learnersLicense"), desc: t("viewGuide"), bg: "text-sky-500 bg-sky-500/10 dark:bg-sky-500/20" },
    { to: "/safety-tips", icon: ShieldAlert, label: t("safetyTips"), desc: t("searchTips"), bg: "text-rose-500 bg-rose-500/10 dark:bg-rose-500/20" },
    { to: "/emergency", icon: PhoneCall, label: t("emergencyContacts"), desc: t("callEmergency"), bg: "text-teal-500 bg-teal-500/10 dark:bg-teal-500/20" },
  ];

  return (
    <div className="animate-fade-in space-y-7 pb-12 max-w-4xl mx-auto px-4 sm:px-6">
      {/* Top bar for mobile only */}
      <div className="flex items-center justify-end py-2 md:hidden">
        <LanguageToggle />
      </div>

      {/* Hero Header with subtle gradient */}
      <section className="relative text-center pt-4 pb-2 md:pt-10 rounded-3xl bg-gradient-to-b from-primary/5 via-transparent to-transparent">
        <img
          src={logo}
          alt="SafeDrive Kerala logo"
          width={90}
          height={90}
          className="mx-auto h-22 w-22 drop-shadow-md select-none transition-transform duration-500 hover:scale-105"
        />
        <h1 className="mt-4 text-3xl font-black tracking-tight sm:text-4.5xl text-foreground">
          {t("appName")}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-balance text-sm sm:text-base text-primary font-black tracking-wide uppercase">
          {t("tagline")}
        </p>
        <p className="mx-auto mt-2 max-w-lg text-xs sm:text-sm text-muted-foreground leading-relaxed">
          {t("heroDescription")}
        </p>
      </section>

      {/* Stats Section with glassmorphic cards */}
      <section className="mx-auto max-w-2xl">
        <div className="grid grid-cols-3 gap-3.5">
          <div className="rounded-2xl border border-border/40 bg-card/65 p-3.5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)] backdrop-blur-sm transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
            <div className="flex items-center justify-center gap-1 text-primary">
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span className="text-lg font-black tracking-tight">{cameraCount}</span>
            </div>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 truncate">{t("statsCameras")}</p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-card/65 p-3.5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)] backdrop-blur-sm transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
            <div className="text-lg font-black text-primary tracking-tight">{districtCount}</div>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 truncate">{t("statsDistricts")}</p>
          </div>
          <div className="rounded-2xl border border-border/40 bg-card/65 p-3.5 text-center shadow-[0_2px_8px_rgba(0,0,0,0.01)] backdrop-blur-sm transition-all hover:shadow-[0_8px_20px_rgba(0,0,0,0.03)]">
            <div className="text-lg font-black text-primary tracking-tight">35+</div>
            <p className="text-[10px] font-bold text-muted-foreground mt-1 truncate">{t("statsResources")}</p>
          </div>
        </div>
      </section>

      {/* Quick Actions Header and Grid */}
      <section className="mx-auto max-w-3xl space-y-4">
        <div className="flex items-center gap-2 border-b border-border/40 pb-2">
          <CheckCircle className="h-4.5 w-4.5 text-primary shrink-0" />
          <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">{t("quickActions")}</h2>
        </div>
        <div className="grid gap-3.5 grid-cols-2 sm:grid-cols-2 lg:grid-cols-2">
          {quickActions.map((action) => (
            <FeatureCard
              key={action.to}
              to={action.to}
              icon={action.icon}
              label={action.label}
              desc={action.desc}
              iconBgColor={action.bg}
            />
          ))}
        </div>
      </section>

      {/* Safety Tip of the Day section */}
      {tipOfTheDay && (
        <section className="mx-auto max-w-3xl space-y-4">
          <div className="flex items-center gap-2 border-b border-border/40 pb-2">
            <ShieldCheck className="h-4.5 w-4.5 text-primary shrink-0" />
            <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground">{t("tipOfTheDay")}</h2>
          </div>
          <SafetyTipCard tip={tipOfTheDay} />
        </section>
      )}

      {/* Official Link and Disclaimer */}
      <section className="mx-auto max-w-3xl space-y-5">
        <div className="text-center pt-2">
          <a
            href="https://mvd.kerala.gov.in/en/road_safety"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-black text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-3 py-1.5 bg-primary/5 hover:bg-primary/10 rounded-full transition-colors"
          >
            <span>{t("visitOfficialMVD")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3.5 w-3.5"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
        </div>

        <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs text-muted-foreground shadow-sm leading-relaxed">
          <p className="font-bold text-foreground mb-1.5 flex items-center gap-1.5 text-amber-700 dark:text-amber-500">
            <span>⚠️</span> {t("disclaimerTitle")}
          </p>
          <p className="text-[11px] leading-relaxed">
            {t("disclaimerText")}
          </p>
        </div>
      </section>
    </div>
  );
}
