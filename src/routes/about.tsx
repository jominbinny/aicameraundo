import { createFileRoute } from "@tanstack/react-router";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/hooks/useLanguage";
import { Info, Target, Compass, FileText, Database } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — SafeDriveKeralam" },
      {
        name: "description",
        content: "Learn more about the SafeDriveKeralam initiative, our mission for traffic compliance, data sources, and disclaimer.",
      },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  const { t, lang } = useLanguage();

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col pb-8">
      <PageHeader subtitle={t("about")} />

      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-4 space-y-5">
        {/* Title Block on Desktop */}
        <div className="hidden md:flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
            <Info className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground">{t("aboutTitle")}</h1>
            <p className="text-xs text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        {/* Mission Card */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Target className="h-5 w-5" />
            <h2 className="text-base">{t("aboutMission")}</h2>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {t("aboutMissionDesc")}
          </p>
        </section>

        {/* Safety Awareness Goals Card */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Compass className="h-5 w-5" />
            <h2 className="text-base">{t("aboutGoals")}</h2>
          </div>
          <p className="text-sm text-foreground leading-relaxed">
            {t("aboutGoalsDesc")}
          </p>
        </section>

        {/* Data Sources Card */}
        <section className="rounded-2xl border border-border bg-card p-5 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-primary font-bold">
            <Database className="h-5 w-5" />
            <h2 className="text-base">{t("aboutSources")}</h2>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {t("aboutSourcesDesc")}
          </p>
        </section>

        {/* Disclaimer Card */}
        <section className="rounded-2xl border border-destructive/15 bg-destructive/5 p-5 shadow-sm space-y-2.5">
          <div className="flex items-center gap-2 text-destructive font-bold">
            <FileText className="h-5 w-5" />
            <h2 className="text-base">{t("aboutDisclaimer")}</h2>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            {t("aboutDisclaimerDesc")}
          </p>
        </section>

        {/* Official Links */}
        <div className="text-center pt-2">
          <a
            href="https://mvd.kerala.gov.in/en/road_safety"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded px-2 py-1"
          >
            <span>{t("visitOfficialMVD")}</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-3 w-3"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
