import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import RoadSignCard from "@/components/ui/RoadSignCard";
import LoadingState from "@/components/ui/LoadingState";
import EmptyState from "@/components/EmptyState";
import { useLanguage } from "@/hooks/useLanguage";
import { TrafficCone } from "lucide-react";

export const Route = createFileRoute("/road-signs")({
  head: () => ({
    meta: [
      { title: "Traffic Road Signs Kerala — SafeDriveKeralam" },
      {
        name: "description",
        content: "Learn Mandatory, Warning, and Informatory traffic road signs in Malayalam and English for Kerala drivers.",
      },
    ],
    links: [{ rel: "canonical", href: "/road-signs" }],
  }),
  component: RoadSignsPage,
});

interface RoadSign {
  id: string;
  category: string;
  title_en: string;
  title_ml: string;
  meaning_en: string;
  meaning_ml: string;
  svgType: string;
}

function RoadSignsPage() {
  const { t, lang } = useLanguage();
  const [signs, setSigns] = useState<RoadSign[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  useEffect(() => {
    fetch("/data/road-signs.json")
      .then((res) => res.json())
      .then((data) => {
        setSigns(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load road signs:", err);
        setLoading(false);
      });
  }, []);

  const categories = useMemo(
    () => [
      { value: "all", label: t("allCategories") },
      { value: "mandatory", label: t("mandatory") },
      { value: "warning", label: t("warning") },
      { value: "informatory", label: t("informatory") },
    ],
    [t]
  );

  const filteredSigns = useMemo(() => {
    const q = query.trim().toLowerCase();
    return signs.filter((sign) => {
      const matchesCategory = category === "all" || sign.category === category;
      if (!matchesCategory) return false;

      if (!q) return true;
      const title = (lang === "ml" ? sign.title_ml : sign.title_en).toLowerCase();
      const meaning = (lang === "ml" ? sign.meaning_ml : sign.meaning_en).toLowerCase();
      return title.includes(q) || meaning.includes(q);
    });
  }, [signs, query, category, lang]);

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col pb-8">
      <PageHeader subtitle={t("roadSigns")} />

      <div className="mx-auto w-full max-w-7xl flex-1 px-4 py-4 space-y-4">
        {/* Title Block on Desktop */}
        <div className="hidden md:flex items-center gap-2.5 border-b border-border pb-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent text-primary">
            <TrafficCone className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-xl font-extrabold text-foreground">{t("roadSigns")}</h1>
            <p className="text-xs text-muted-foreground">
              {t("heroDescription")}
            </p>
          </div>
        </div>

        {/* Reusable Search Bar */}
        <div className="bg-card border border-border p-3.5 rounded-2xl shadow-sm">
          <SearchBar
            query={query}
            onQueryChange={setQuery}
            placeholder={t("searchSigns")}
            category={category}
            onCategoryChange={setCategory}
            categories={categories}
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="pt-6">
            <LoadingState type="card" count={6} />
          </div>
        ) : filteredSigns.length > 0 ? (
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {filteredSigns.map((sign) => (
              <RoadSignCard key={sign.id} sign={sign} />
            ))}
          </div>
        ) : (
          <div className="pt-10">
            <EmptyState title={t("noResults")} description={t("retry")} />
          </div>
        )}
      </div>
    </div>
  );
}
