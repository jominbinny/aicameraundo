import { jsxs, jsx } from "react/jsx-runtime";
import { useState, useMemo, useCallback } from "react";
import { Search, LocateFixed, X } from "lucide-react";
import { P as PageHeader } from "./PageHeader-C9I1une-.js";
import { u as useLanguage } from "./router-BSgfvSGz.js";
import { M as MapView } from "./MapView-bnyFvxJT.js";
import { u as useGeolocation } from "./useGeolocation-NKp5thlV.js";
import { a as getDistricts, s as searchCameras } from "./cameraService-D_S4R9Wf.js";
import "@tanstack/react-router";
import "./LanguageToggle-CflZN9aU.js";
import "@tanstack/react-query";
function SearchBar({ query, onQueryChange, district, onDistrictChange, districts }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxs("div", { className: "flex gap-2", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsx(
        Search,
        {
          className: "pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground",
          "aria-hidden": "true"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          type: "search",
          value: query,
          onChange: (e) => onQueryChange(e.target.value),
          placeholder: t("search"),
          "aria-label": t("search"),
          className: "w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary"
        }
      )
    ] }),
    /* @__PURE__ */ jsxs(
      "select",
      {
        value: district,
        onChange: (e) => onDistrictChange(e.target.value),
        "aria-label": t("district"),
        className: "rounded-full border border-border bg-card px-3 py-2.5 text-sm text-foreground shadow-sm outline-none focus:ring-2 focus:ring-primary",
        children: [
          /* @__PURE__ */ jsx("option", { value: "all", children: t("allDistricts") }),
          districts.map((d) => /* @__PURE__ */ jsx("option", { value: d, children: d }, d))
        ]
      }
    )
  ] });
}
function MapPage() {
  const {
    t
  } = useLanguage();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("all");
  const [center, setCenter] = useState(null);
  const [zoom, setZoom] = useState(8);
  const [selected, setSelected] = useState(null);
  const {
    position,
    locate
  } = useGeolocation();
  const districts = useMemo(() => getDistricts(), []);
  const cameras = useMemo(() => searchCameras(query, district), [query, district]);
  const handleViewDetails = useCallback((camera) => {
    setSelected(camera);
    setCenter([camera.lat, camera.lng]);
    setZoom(15);
  }, []);
  const handleLocate = useCallback(() => {
    locate();
  }, [locate]);
  const pos = position;
  const effectiveCenter = pos && !center ? [pos.lat, pos.lng] : center;
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[calc(100vh-4rem)] flex-col", children: [
    /* @__PURE__ */ jsx(PageHeader, { subtitle: t("map") }),
    /* @__PURE__ */ jsxs("div", { className: "border-b border-border bg-card px-4 py-3", children: [
      /* @__PURE__ */ jsx(SearchBar, { query, onQueryChange: setQuery, district, onDistrictChange: setDistrict, districts }),
      /* @__PURE__ */ jsxs("p", { className: "mt-2 text-xs text-muted-foreground", children: [
        cameras.length,
        " ",
        t("totalCameras")
      ] })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "relative flex-1", children: [
      /* @__PURE__ */ jsx(MapView, { cameras, userPosition: position, center: effectiveCenter, zoom, onViewDetails: handleViewDetails, loadingLabel: t("loading"), t }),
      /* @__PURE__ */ jsx("button", { onClick: handleLocate, "aria-label": t("locateMe"), className: "absolute bottom-4 right-4 z-[500] flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary shadow-lg ring-1 ring-border transition-transform hover:scale-105", children: /* @__PURE__ */ jsx(LocateFixed, { className: "h-5 w-5", "aria-hidden": "true" }) }),
      selected && /* @__PURE__ */ jsxs("div", { className: "absolute inset-x-3 bottom-3 z-[500] animate-slide-up rounded-2xl border border-border bg-card p-4 shadow-xl", children: [
        /* @__PURE__ */ jsx("button", { onClick: () => setSelected(null), "aria-label": "Close", className: "absolute right-3 top-3 text-muted-foreground hover:text-foreground", children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" }) }),
        /* @__PURE__ */ jsx("h3", { className: "pr-6 font-semibold text-foreground", children: selected.name || "AI Camera" }),
        /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
          t("district"),
          ": ",
          selected.district || "-"
        ] }),
        /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
          t("coordinates"),
          ": ",
          selected.lat.toFixed(5),
          ", ",
          selected.lng.toFixed(5)
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-xs text-muted-foreground", children: selected.uniqueId })
      ] })
    ] })
  ] });
}
export {
  MapPage as component
};
