import { createFileRoute, Link } from "@tanstack/react-router";
import { Map, LocateFixed, Route as RouteIcon, Camera } from "lucide-react";
import logo from "@/assets/logo.png";
import LanguageToggle from "@/components/LanguageToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { getCameraCount, getDistricts } from "@/services/cameraService";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AI Camera Undo — Find Kerala AI Traffic Cameras" },
      {
        name: "description",
        content:
          "Find Kerala MVD AI traffic cameras on an interactive map. Search by district, find cameras near you, or check cameras along your route.",
      },
      { property: "og:title", content: "AI Camera Undo" },
      {
        property: "og:description",
        content: "Find Kerala MVD AI traffic cameras on an interactive map.",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebApplication",
          name: "AI Camera Undo",
          applicationCategory: "TravelApplication",
          operatingSystem: "Web",
          description: "Find Kerala MVD AI traffic cameras on an interactive map.",
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
    { to: "/map", icon: Map, label: t("viewMap"), desc: t("appName") },
    { to: "/near-me", icon: LocateFixed, label: t("nearMe"), desc: t("findNearby") },
    { to: "/route-checker", icon: RouteIcon, label: t("routeChecker"), desc: t("routeChecker") },
  ];

  return (
    <div className="animate-fade-in">
      {/* Top bar */}
      <div className="flex items-center justify-end px-4 py-3">
        <LanguageToggle />
      </div>

      {/* Hero */}
      <section className="px-5 pb-6 pt-2 text-center">
        <img
          src={logo}
          alt="AI Camera Undo logo"
          width={96}
          height={96}
          className="mx-auto h-24 w-24 drop-shadow"
        />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-foreground">
          {t("appName")}
        </h1>
        <p className="mx-auto mt-2 max-w-md text-balance text-base text-muted-foreground">
          {t("tagline")}
        </p>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
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
      <section className="mx-auto grid max-w-xl gap-3 px-5 pb-10">
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
    </div>
  );
}
