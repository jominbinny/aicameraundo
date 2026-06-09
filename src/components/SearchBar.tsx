import { Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
  placeholder?: string;
  
  // Optional district filter
  district?: string;
  onDistrictChange?: (district: string) => void;
  districts?: string[];

  // Optional category filter
  category?: string;
  onCategoryChange?: (category: string) => void;
  categories?: { value: string; label: string }[];
}

export default function SearchBar({
  query,
  onQueryChange,
  placeholder,
  district,
  onDistrictChange,
  districts,
  category,
  onCategoryChange,
  categories,
}: SearchBarProps) {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col gap-3 sm:flex-row">
      {/* Search Input */}
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={placeholder || t("search")}
          aria-label={placeholder || t("search")}
          className="w-full rounded-2xl border border-border/50 bg-card py-3 pl-10 pr-4 text-sm text-foreground shadow-sm outline-none transition-all focus:border-primary/45 focus:ring-4 focus:ring-primary/10"
        />
      </div>

      <div className="flex gap-2.5">
        {/* Category Dropdown */}
        {onCategoryChange && categories && (
          <select
            value={category}
            onChange={(e) => onCategoryChange(e.target.value)}
            aria-label="Filter by category"
            className="flex-1 rounded-2xl border border-border/50 bg-card px-4 py-3 text-xs font-bold text-foreground shadow-sm outline-none transition-all cursor-pointer focus:border-primary/45 focus:ring-4 focus:ring-primary/10 sm:flex-initial"
          >
            {categories.map((c) => (
              <option key={c.value} value={c.value}>
                {c.label}
              </option>
            ))}
          </select>
        )}

        {/* District Dropdown */}
        {onDistrictChange && districts && (
          <select
            value={district}
            onChange={(e) => onDistrictChange(e.target.value)}
            aria-label={t("district")}
            className="flex-1 rounded-2xl border border-border/50 bg-card px-4 py-3 text-xs font-bold text-foreground shadow-sm outline-none transition-all cursor-pointer focus:border-primary/45 focus:ring-4 focus:ring-primary/10 sm:flex-initial"
          >
            <option value="all">{t("allDistricts")}</option>
            {districts.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
}
