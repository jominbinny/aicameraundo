import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import PageHeader from "@/components/PageHeader";
import LoadingState from "@/components/ui/LoadingState";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/hooks/useLanguage";
import { BookOpen, CheckCircle, Info } from "lucide-react";

export const Route = createFileRoute("/learners-license")({
  head: () => ({
    meta: [
      { title: "Learner's Licence Guide Kerala — SafeDrive Kerala" },
      {
        name: "description",
        content: "Complete guide to Learner's Licence in Kerala: eligibility, documents, online application process, fees, validity, and RTO rules.",
      },
    ],
    links: [{ rel: "canonical", href: "/learners-license" }],
  }),
  component: LearnersLicensePage,
});

interface LicenseSection {
  id: string;
  title_en: string;
  title_ml: string;
  items_en: string[];
  items_ml: string[];
}

function LearnersLicensePage() {
  const { t, lang } = useLanguage();
  const [sections, setSections] = useState<LicenseSection[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/data/learners-license.json")
      .then((res) => res.json())
      .then((data) => {
        setSections(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load learners license guide:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col pb-8">
      <PageHeader subtitle={t("learnersLicense")} />

      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-4 space-y-4">
        {/* Title Block on Desktop */}
        <div className="hidden md:flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
            <BookOpen className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-black text-foreground">{t("learnersLicense")}</h1>
            <p className="text-xs text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="pt-6">
            <LoadingState type="page" />
          </div>
        ) : (
          <div className="space-y-4">
            <div className="rounded-2xl border border-border/40 bg-card/65 p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <h2 className="text-xs font-black uppercase tracking-wider text-muted-foreground mb-2.5 flex items-center gap-1.5">
                <Info className="h-4.5 w-4.5 text-primary" />
                {lang === "ml" ? "ഗൈഡ് ഇൻഫർമേഷൻ" : "Guide Overview"}
              </h2>
              <p className="text-sm text-foreground leading-relaxed">
                {lang === "ml"
                  ? "കേരള മോട്ടോർ വാഹന വകുപ്പിന്റെ (MVD) നിബന്ധനകൾക്കനുസൃതമായി ലേണേഴ്സ് ലൈസൻസ് അപേക്ഷിക്കുന്നതിനും പരീക്ഷ എഴുതുന്നതിനുമുള്ള പൂർണ്ണ വിവരങ്ങൾ താഴെ നൽകുന്നു. ഓരോ വിഭാഗത്തിലും ക്ലിക്ക് ചെയ്ത് വിശദാംശങ്ങൾ കാണുക."
                  : "Everything you need to know about getting your Learner's Licence under the Kerala Motor Vehicles Department (MVD). Click on each section below to expand and view instructions."}
              </p>
            </div>

            <Accordion type="single" collapsible defaultValue="eligibility" className="w-full space-y-3">
              {sections.map((section) => {
                const title = lang === "ml" ? section.title_ml : section.title_en;
                const items = lang === "ml" ? section.items_ml : section.items_en;

                return (
                  <AccordionItem
                    key={section.id}
                    value={section.id}
                    className="border border-border/40 bg-card rounded-2xl px-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-primary/25 hover:shadow-[0_8px_24px_rgba(0,0,0,0.03)] data-[state=open]:border-primary/35 data-[state=open]:bg-primary/[0.02] overflow-hidden"
                  >
                    <AccordionTrigger className="text-sm sm:text-base font-extrabold text-foreground py-4 hover:no-underline focus-visible:outline-none">
                      <span className="flex items-center gap-2">
                        <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-accent text-primary">
                          <CheckCircle className="h-3.5 w-3.5" />
                        </span>
                        {title}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 pt-1 text-sm text-foreground">
                      <ul className="space-y-3.5 pl-1">
                        {items.map((item, index) => (
                          <li key={index} className="flex items-start gap-2.5 leading-relaxed text-xs sm:text-sm">
                            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        )}
      </div>
    </div>
  );
}
