import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useState, useRef, useEffect } from "react";
import { MapPin, Route, AlertCircle, Camera } from "lucide-react";
import { P as PageHeader } from "./PageHeader-Be1iCcvm.js";
import { f as formatDistance, C as CameraCard, d as distanceToRouteKm } from "./CameraCard-DhMVfWhx.js";
import { M as MapView } from "./MapView-y0mMqDjc.js";
import { u as useLanguage } from "./router-D-9uSlfh.js";
import { g as getAllCameras } from "./cameraService-D_S4R9Wf.js";
import "@tanstack/react-router";
import "./LanguageToggle-Bz6r3-p3.js";
import "@tanstack/react-query";
const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const OSRM = "https://router.project-osrm.org/route/v1/driving";
async function geocode(query) {
  const url = `${NOMINATIM}?q=${encodeURIComponent(
    query + ", Kerala, India"
  )}&format=json&limit=1`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data.length) throw new Error("Location not found");
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    label: data[0].display_name
  };
}
async function suggestPlaces(query, limit = 5) {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = `${NOMINATIM}?q=${encodeURIComponent(
    q + ", Kerala, India"
  )}&format=json&addressdetails=1&limit=${limit}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((d) => ({
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
    label: d.display_name,
    short: d.display_name.split(",").slice(0, 2).join(",").trim()
  }));
}
async function getRoute(start, end) {
  const url = `${OSRM}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Routing failed");
  const data = await res.json();
  if (!data.routes || !data.routes.length) throw new Error("No route found");
  const route = data.routes[0];
  const line = route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
  return {
    distanceKm: route.distance / 1e3,
    durationMin: route.duration / 60,
    line
  };
}
function PlaceAutocomplete({
  value,
  onChange,
  onSelect,
  placeholder,
  ariaLabel,
  iconClassName = "text-primary"
}) {
  const [items, setItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [active, setActive] = useState(-1);
  const skipRef = useRef(false);
  const boxRef = useRef(null);
  useEffect(() => {
    if (skipRef.current) {
      skipRef.current = false;
      return;
    }
    const q = value?.trim() || "";
    if (q.length < 3) {
      setItems([]);
      setOpen(false);
      return;
    }
    setLoading(true);
    const handle = setTimeout(async () => {
      try {
        const res = await suggestPlaces(q);
        setItems(res);
        setOpen(res.length > 0);
        setActive(-1);
      } finally {
        setLoading(false);
      }
    }, 350);
    return () => clearTimeout(handle);
  }, [value]);
  useEffect(() => {
    function onDoc(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);
  const choose = (item) => {
    skipRef.current = true;
    onChange(item.short);
    onSelect?.(item);
    setItems([]);
    setOpen(false);
  };
  const onKeyDown = (e) => {
    if (!open || !items.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, items.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter" && active >= 0) {
      e.preventDefault();
      choose(items[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };
  return /* @__PURE__ */ jsxs("div", { ref: boxRef, className: "relative", children: [
    /* @__PURE__ */ jsx(
      MapPin,
      {
        className: `pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 ${iconClassName}`,
        "aria-hidden": "true"
      }
    ),
    /* @__PURE__ */ jsx(
      "input",
      {
        value,
        onChange: (e) => onChange(e.target.value),
        onKeyDown,
        onFocus: () => items.length && setOpen(true),
        placeholder,
        "aria-label": ariaLabel,
        autoComplete: "off",
        role: "combobox",
        "aria-expanded": open,
        "aria-autocomplete": "list",
        className: "w-full rounded-full border border-border bg-card py-2.5 pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-primary"
      }
    ),
    open && /* @__PURE__ */ jsxs(
      "ul",
      {
        role: "listbox",
        className: "absolute z-[1000] mt-1 max-h-60 w-full overflow-auto rounded-2xl border border-border bg-popover py-1 text-popover-foreground shadow-lg",
        children: [
          loading && /* @__PURE__ */ jsx("li", { className: "px-3 py-2 text-xs text-muted-foreground", children: "…" }),
          items.map((item, i) => /* @__PURE__ */ jsx("li", { role: "option", "aria-selected": i === active, children: /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              onMouseDown: (e) => e.preventDefault(),
              onClick: () => choose(item),
              onMouseEnter: () => setActive(i),
              className: `flex w-full items-start gap-2 px-3 py-2 text-left text-sm ${i === active ? "bg-accent text-accent-foreground" : ""}`,
              children: [
                /* @__PURE__ */ jsx(MapPin, { className: "mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground", "aria-hidden": "true" }),
                /* @__PURE__ */ jsx("span", { className: "line-clamp-2", children: item.label })
              ]
            }
          ) }, `${item.lat}-${item.lng}-${i}`))
        ]
      }
    )
  ] });
}
const BUFFER_KM = 1.5;
function RoutePage() {
  const {
    t
  } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSel, setFromSel] = useState(null);
  const [toSel, setToSel] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const handleCheck = async (e) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const start = fromSel || await geocode(from);
      const end = toSel || await geocode(to);
      const route = await getRoute(start, end);
      const onRoute = getAllCameras().map((c) => ({
        ...c,
        distanceKm: distanceToRouteKm(c, route.line)
      })).filter((c) => c.distanceKm <= BUFFER_KM).sort((a, b) => a.distanceKm - b.distanceKm);
      setResult({
        route,
        start,
        end,
        cameras: onRoute
      });
    } catch (err) {
      setError(err?.message || t("routeError"));
    } finally {
      setLoading(false);
    }
  };
  const bounds = result ? result.route.line.map((p) => [p.lat, p.lng]) : void 0;
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[calc(100vh-4rem)] flex-col", children: [
    /* @__PURE__ */ jsx(PageHeader, { subtitle: t("routeChecker") }),
    /* @__PURE__ */ jsxs("form", { onSubmit: handleCheck, className: "mx-auto w-full max-w-xl space-y-2 px-4 py-3", children: [
      /* @__PURE__ */ jsx(PlaceAutocomplete, { value: from, onChange: (v) => {
        setFrom(v);
        setFromSel(null);
      }, onSelect: setFromSel, placeholder: t("startPlaceholder"), ariaLabel: t("from"), iconClassName: "text-primary" }),
      /* @__PURE__ */ jsx(PlaceAutocomplete, { value: to, onChange: (v) => {
        setTo(v);
        setToSel(null);
      }, onSelect: setToSel, placeholder: t("destPlaceholder"), ariaLabel: t("to"), iconClassName: "text-destructive" }),
      /* @__PURE__ */ jsxs("button", { type: "submit", disabled: loading, className: "flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60", children: [
        /* @__PURE__ */ jsx(Route, { className: "h-4 w-4" }),
        loading ? t("searchingRoute") : t("checkRoute")
      ] })
    ] }),
    error && /* @__PURE__ */ jsx("div", { className: "mx-auto w-full max-w-xl px-4", children: /* @__PURE__ */ jsxs("p", { className: "flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive", children: [
      /* @__PURE__ */ jsx(AlertCircle, { className: "h-4 w-4" }),
      " ",
      error
    ] }) }),
    result && /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "h-[55vh] min-h-[320px] shrink-0", children: /* @__PURE__ */ jsx(MapView, { cameras: result.cameras, routeLine: result.route.line, highlightIds: result.cameras.map((c) => c.id), fitBounds: bounds, loadingLabel: t("loading"), t }) }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-xl px-4 py-4", children: [
        /* @__PURE__ */ jsxs("div", { className: "mb-4 flex gap-3", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-2xl border border-border bg-card p-3 text-center shadow-sm", children: [
            /* @__PURE__ */ jsx("p", { className: "text-xl font-bold text-primary", children: formatDistance(result.route.distanceKm) }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: t("routeDistance") })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex-1 rounded-2xl border border-border bg-card p-3 text-center shadow-sm", children: [
            /* @__PURE__ */ jsxs("p", { className: "flex items-center justify-center gap-1 text-xl font-bold text-primary", children: [
              /* @__PURE__ */ jsx(Camera, { className: "h-4 w-4" }),
              result.cameras.length
            ] }),
            /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: t("camerasOnRoute") })
          ] })
        ] }),
        /* @__PURE__ */ jsx("p", { className: "mb-2 text-sm text-muted-foreground", children: t("camerasNearRoute", {
          km: BUFFER_KM
        }) }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: result.cameras.map((c) => /* @__PURE__ */ jsx(CameraCard, { camera: c }, c.id)) })
      ] })
    ] })
  ] });
}
export {
  RoutePage as component
};
