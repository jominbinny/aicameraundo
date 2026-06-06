import { jsxs, jsx } from "react/jsx-runtime";
import { MapPin, Navigation } from "lucide-react";
import { u as useLanguage } from "./router-BSgfvSGz.js";
const EARTH_RADIUS_KM = 6371;
const toRad = (deg) => deg * Math.PI / 180;
function haversineKm(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(h));
}
function formatDistance(km) {
  if (km == null || Number.isNaN(km)) return "-";
  if (km < 1) return `${Math.round(km * 1e3)} m`;
  return `${km.toFixed(1)} km`;
}
function distanceToRouteKm(point, line) {
  if (!line || line.length === 0) return Infinity;
  if (line.length === 1) return haversineKm(point, line[0]);
  let min = Infinity;
  for (let i = 0; i < line.length - 1; i++) {
    const d = pointToSegmentKm(point, line[i], line[i + 1]);
    if (d < min) min = d;
  }
  return min;
}
function pointToSegmentKm(p, a, b) {
  const latRef = toRad(a.lat);
  const kx = Math.PI / 180 * EARTH_RADIUS_KM * Math.cos(latRef);
  const ky = Math.PI / 180 * EARTH_RADIUS_KM;
  const ax = a.lng * kx;
  const ay = a.lat * ky;
  const bx = b.lng * kx;
  const by = b.lat * ky;
  const px = p.lng * kx;
  const py = p.lat * ky;
  const dx = bx - ax;
  const dy = by - ay;
  const segLenSq = dx * dx + dy * dy;
  let t = segLenSq === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / segLenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}
function nearestCameras(origin, cameras, limit = 10) {
  return cameras.map((c) => ({ ...c, distanceKm: haversineKm(origin, c) })).sort((a, b) => a.distanceKm - b.distanceKm).slice(0, limit);
}
function CameraCard(props) {
  const { camera, onShowOnMap = null, action = null } = props;
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxs("article", { className: "flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md", children: [
    /* @__PURE__ */ jsx("div", { className: "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary", children: /* @__PURE__ */ jsx(MapPin, { className: "h-5 w-5", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxs("div", { className: "min-w-0 flex-1", children: [
      /* @__PURE__ */ jsx("h3", { className: "truncate font-semibold text-foreground", children: camera.name || "AI Camera" }),
      /* @__PURE__ */ jsxs("p", { className: "text-sm text-muted-foreground", children: [
        t("district"),
        ": ",
        camera.district || "-"
      ] }),
      /* @__PURE__ */ jsxs("p", { className: "text-xs text-muted-foreground", children: [
        camera.lat.toFixed(4),
        ", ",
        camera.lng.toFixed(4)
      ] }),
      camera.distanceKm != null && /* @__PURE__ */ jsxs("p", { className: "mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary", children: [
        /* @__PURE__ */ jsx(Navigation, { className: "h-3.5 w-3.5", "aria-hidden": "true" }),
        formatDistance(camera.distanceKm)
      ] })
    ] }),
    (onShowOnMap || action) && (action || /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => onShowOnMap?.(camera),
        className: "shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90",
        children: t("showOnMap")
      }
    ))
  ] });
}
export {
  CameraCard as C,
  distanceToRouteKm as d,
  formatDistance as f,
  nearestCameras as n
};
