import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Calculator, ChevronRight, AlertTriangle, IndianRupee } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import { useLanguage } from "@/hooks/useLanguage";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/fine-calculator")({
  head: () => ({
    meta: [
      { title: "Fine Calculator — AI Camera Undo" },
      {
        name: "description",
        content: "Calculate expected traffic fines for common violations detected by Kerala MVD AI cameras.",
      },
    ],
    links: [{ rel: "canonical", href: "/fine-calculator" }],
  }),
  component: FineCalculatorPage,
});

const VIOLATIONS = [
  {
    id: "no_helmet",
    fine: 1000,
    icon: "helmet",
  },
  {
    id: "no_seatbelt",
    fine: 1000,
    icon: "seatbelt",
  },
  {
    id: "mobile_phone",
    fine: 5000,
    icon: "phone",
  },
  {
    id: "triple_riding",
    fine: 1000,
    icon: "users",
  },
];

function FineCalculatorPage() {
  const { t } = useLanguage();
  const [selected, setSelected] = useState<string | null>(null);

  const selectedViolation = VIOLATIONS.find((v) => v.id === selected);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <PageHeader subtitle={t("fineCalculator")} />

      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-4">
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
          <AlertTriangle className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span>{t("fineDisclaimer")}</span>
        </div>

        <h2 className="mb-3 text-lg font-bold text-foreground">{t("selectViolation")}</h2>

        <div className="grid gap-3">
          {VIOLATIONS.map((v) => {
            const isActive = selected === v.id;
            return (
              <button
                key={v.id}
                onClick={() => setSelected(v.id)}
                className={`flex items-center justify-between rounded-xl border p-4 text-left transition-all ${
                  isActive
                    ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary"
                    : "border-border bg-card hover:bg-accent"
                }`}
                aria-pressed={isActive}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                      isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <ViolationIcon type={v.icon} />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{t(v.id)}</p>
                    <p className="text-sm text-muted-foreground">
                      {t("fine")}: ₹{v.fine.toLocaleString("en-IN")}
                    </p>
                  </div>
                </div>
                <ChevronRight
                  className={`h-5 w-5 shrink-0 transition-transform ${
                    isActive ? "rotate-90 text-primary" : "text-muted-foreground"
                  }`}
                  aria-hidden="true"
                />
              </button>
            );
          })}
        </div>

        {selectedViolation && (
          <Card className="mt-6 border-primary/20 bg-primary/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <Calculator className="h-5 w-5 text-primary" aria-hidden="true" />
                {t("fineDetails")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2">
                <IndianRupee className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("expectedFine")}</p>
                  <p className="text-2xl font-bold text-foreground">
                    ₹{selectedViolation.fine.toLocaleString("en-IN")}
                  </p>
                </div>
              </div>

              <div className="rounded-lg bg-card p-3 text-sm text-foreground">
                <p className="font-semibold mb-1">{t("explanation")}</p>
                <p className="text-muted-foreground leading-relaxed">{t(`${selectedViolation.id}_desc`)}</p>
              </div>

              <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200">
                <p className="font-semibold mb-1">{t("legalReference")}</p>
                <p className="leading-relaxed">{t(`${selectedViolation.id}_legal`)}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

function ViolationIcon({ type }: { type: string }) {
  switch (type) {
    case "helmet":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6"/><path d="M4 12V8a8 8 0 0 1 16 0v4"/></svg>
      );
    case "seatbelt":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4v16"/><path d="M20 4v16"/><path d="M4 9h16"/><path d="M4 15h16"/></svg>
      );
    case "phone":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/></svg>
      );
    case "users":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
      );
    default:
      return <AlertTriangle className="h-5 w-5" />;
  }
}
