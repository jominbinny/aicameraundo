// Search + district filter bar.
import { Search } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

export default function SearchBar({ query, onQueryChange, district, onDistrictChange, districts }) {
  const { t } = useLanguage();
  return (
    <div className="flex gap-2">
      <div className="relative flex-1">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <input
          type="search"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder={t("search")}
          aria-label={t("search")}
          className="w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary"
        />
      </div>
      <select
        value={district}
        onChange={(e) => onDistrictChange(e.target.value)}
        aria-label={t("district")}
        className="rounded-full border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary"
      >
        <option value="all">{t("allDistricts")}</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>
    </div>
  );
}
