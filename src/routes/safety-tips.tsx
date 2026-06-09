import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import SafetyTipCard from "@/components/ui/SafetyTipCard";
import QuoteCard from "@/components/ui/QuoteCard";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/EmptyState";
import { useLanguage } from "@/hooks/useLanguage";
import { ShieldAlert, Sparkles, Lightbulb } from "lucide-react";

export const Route = createFileRoute("/safety-tips")({
  head: () => ({
    meta: [
      { title: "Road Safety Tips & Guidelines Kerala — SafeDriveKeralam" },
      {
        name: "description",
        content: "Important road safety tips for Kerala drivers: Helmet safety, Seatbelts, Night driving, Rain driving, and Highway guidelines.",
      },
    ],
    links: [{ rel: "canonical", href: "/safety-tips" }],
  }),
  component: SafetyTipsPage,
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

interface Quote {
  id: string;
  text_en: string;
  text_ml: string;
}

function SafetyTipsPage() {
  const { t, lang } = useLanguage();
  const [tips, setTips] = useState<SafetyTip[]>([]);
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    Promise.all([
      fetch("/data/tips.json").then((res) => res.json()),
      fetch("/data/quotes.json").then((res) => res.json()),
    ])
      .then(([tipsData, quotesData]) => {
        setTips(tipsData);
        setQuotes(quotesData);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load safety tips and quotes:", err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => [
      { value: "all", label: t("allCategories") },
      { value: "helmet", label: t("no_helmet") },
      { value: "seatbelt", label: t("no_seatbelt") },
      { value: "night driving", label: lang === "ml" ? "രാത്രികാല ഡ്രൈവിംഗ്" : "Night Driving" },
      { value: "rain driving", label: lang === "ml" ? "മഴക്കാല ഡ്രൈവിംഗ്" : "Rain Driving" },
      { value: "highway driving", label: lang === "ml" ? "ഹൈവേ ഡ്രൈവിംഗ്" : "Highway Driving" },
    ],
    [t, lang]
  );

  const filteredTips = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tips.filter((tip) => {
      const matchesCategory = category === "all" || tip.category.toLowerCase() === category.toLowerCase();
      if (!matchesCategory) return false;

      if (!q) return true;
      const title = (lang === "ml" ? tip.title_ml : tip.title_en).toLowerCase();
      const content = (lang === "ml" ? tip.content_ml : tip.content_en).toLowerCase();
      return title.includes(q) || content.includes(q);
    });
  }, [tips, query, category, lang]);

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

  // Determine a stable random "Quote of the Day" using date hash
  const quoteOfTheDay = useMemo(() => {
    if (!quotes.length) return null;
    const dateString = new Date().toDateString();
    let hash = 0;
    for (let i = 0; i < dateString.length; i++) {
      hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = (Math.abs(hash) + 3) % quotes.length;
    return quotes[index];
  }, [quotes]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col pb-8">
      <PageHeader subtitle={t("safetyTips")} />

      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-4 space-y-5">
        {/* Title Block on Desktop */}
        <div className="hidden md:flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground">{t("safetyTips")}</h1>
            <p className="text-xs text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        {/* Dynamic Tip of the Day */}
        {tipOfTheDay && !query && category === "all" && (
          <div className="space-y-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <Sparkles className="h-4 w-4 animate-pulse" />
              <span>{t("tipOfTheDay")}</span>
            </div>
            <div className="flex flex-col gap-3.5">
              <SafetyTipCard tip={tipOfTheDay} />
              {quoteOfTheDay && <QuoteCard quote={quoteOfTheDay} />}
            </div>
          </div>
        )}

        {/* Search Bar */}
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            <Lightbulb className="h-4 w-4" />
            <span>{lang === "ml" ? "നിർദ്ദേശങ്ങൾ തിരയുക" : "Browse Guidelines"}</span>
          </div>
          <div className="bg-card border border-border p-3.5 rounded-2xl shadow-sm">
            <SearchBar
              query={query}
              onQueryChange={setQuery}
              placeholder={t("searchTips")}
              category={category}
              onCategoryChange={setCategory}
              categories={categories}
            />
          </div>
        </div>

        {/* Content */}
        {loading ? (
          <div className="pt-2">
            <LoadingState type="list" count={4} />
          </div>
        ) : filteredTips.length > 0 ? (
          <div className="grid gap-3.5">
            {filteredTips.map((tip) => (
              <SafetyTipCard key={tip.id} tip={tip} />
            ))}
          </div>
        ) : (
          <div className="pt-6">
            <EmptyState title={t("noResults")} description={t("retry")} />
          </div>
        )}
      </div>
    </div>
  );
}
