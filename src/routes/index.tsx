import { createFileRoute, Link } from "@tanstack/react-router";
import { Map, LocateFixed, Route as RouteIcon, Camera, Calculator, ShieldCheck } from "lucide-react";
import logo from "@/assets/logo.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { getCameraCount, getDistricts } from "@/services/cameraService";

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

function HomePage() {
  const { t } = useLanguage();
  const count = getCameraCount();
  const districts = getDistricts().filter(Boolean).length;

  const actions = [
    { to: "/map", icon: Map, label: t("viewMap"), desc: t("tagline") },
    { to: "/near-me", icon: LocateFixed, label: t("nearMe"), desc: t("findNearby") },
    { to: "/route-checker", icon: RouteIcon, label: t("routeChecker"), desc: t("camerasOnRoute") },
    { to: "/fine-calculator", icon: Calculator, label: t("fineCalculator"), desc: t("selectViolation") },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-end px-4 py-3">
        <LanguageToggle />
      </div>

      {/* Hero */}
      <section className="px-5 text-center">
        <img
          src={logo}
          alt="SafeDrive Kerala logo"
          width={96}
          height={96}
          className="mx-auto h-24 w-24 drop-shadow"
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
          {t("appName")}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-balance text-base text-primary font-semibold">
          {t("tagline")}
        </p>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          {t("heroDescription")}
        </p>

        {/* Stats */}
        <div className="mx-auto mt-5 flex max-w-xs items-center justify-center gap-3">
          <div className="flex-1 rounded-2xl border border-border bg-card p-3 shadow-sm">
            <div className="flex items-center justify-center gap-1.5 text-primary">
              <Camera className="h-4 w-4" aria-hidden="true" />
              <span className="text-xl font-bold">{count}</span>
            </div>
            <p className="text-xs text-muted-foreground">{t("totalCameras")}</p>
          </div>
          <div className="flex-1 rounded-2xl border border-border bg-card p-3 shadow-sm">
            <div className="text-xl font-bold text-primary">{districts}</div>
            <p className="text-xs text-muted-foreground">{t("district")}</p>
          </div>
        </div>
      </section>

      {/* Action cards */}
      <section className="mx-auto grid max-w-xl gap-3 px-5">
        {actions.map(({ to, icon: Icon, label, desc }) => (
          <Link
            key={to}
            to={to}
            className="group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground">{label}</p>
              <p className="truncate text-sm text-muted-foreground">{desc}</p>
            </div>
          </Link>
        ))}
      </section>

      {/* Safety Guidelines Section */}
      <section className="mx-auto max-w-xl px-5 pb-10">
        <div className="mb-4 flex items-center gap-2 border-b border-border pb-2">
          <ShieldCheck className="h-5 w-5 text-primary" />
          <h2 className="text-lg font-bold text-foreground">{t("safetyGuidelines")}</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1.5">
              <span className="text-lg" role="img" aria-label="Helmet">🪖</span> 
              <span className="text-sm">{t("helmetSafety")}</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("helmetSafetyDesc")}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1.5">
              <span className="text-lg" role="img" aria-label="Seatbelt">💺</span>
              <span className="text-sm">{t("seatbeltSafety")}</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("seatbeltSafetyDesc")}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1.5">
              <span className="text-lg" role="img" aria-label="Phone">📱</span>
              <span className="text-sm">{t("phoneDistraction")}</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("phoneDistractionDesc")}
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
            <h3 className="font-semibold text-foreground flex items-center gap-2 mb-1.5">
              <span className="text-lg" role="img" aria-label="Warning">⚠️</span>
              <span className="text-sm">{t("noOverloading")}</span>
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {t("noOverloadingDesc")}
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://mvd.kerala.gov.in/en/road_safety"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
          >
            <span>{t("visitOfficialMVD")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-4 w-4"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="mx-auto max-w-xl px-5 pb-16">
        <div className="rounded-2xl border border-amber-500/10 bg-amber-500/5 p-4 text-xs text-muted-foreground">
          <p className="font-bold text-foreground mb-1 flex items-center gap-1.5">
            <span>⚠️</span> {t("disclaimerTitle")}
          </p>
          <p className="leading-relaxed">
            {t("disclaimerText")}
          </p>
        </div>
      </section>
    </div>
  );
}
