import { jsxs, jsx } from "react/jsx-runtime";
import { useMemo, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Polyline, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet.markercluster";
const KERALA_CENTER = [10.45, 76.4];
function cameraIcon(highlight) {
  const color = highlight ? "#ef4444" : "#0f9d72";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="34" height="44" viewBox="0 0 34 44">
    <path d="M17 0C7.6 0 0 7.6 0 17c0 12 17 27 17 27s17-15 17-27C34 7.6 26.4 0 17 0z" fill="${color}"/>
    <circle cx="17" cy="16" r="9" fill="white"/>
    <rect x="11" y="12" width="12" height="8" rx="2" fill="${color}"/>
    <circle cx="17" cy="16" r="2.2" fill="white"/>
  </svg>`;
  return L.divIcon({
    html: svg,
    className: "border-0 bg-transparent",
    iconSize: [34, 44],
    iconAnchor: [17, 44],
    popupAnchor: [0, -40]
  });
}
const userIcon = L.divIcon({
  html: `<div style="width:18px;height:18px;border-radius:50%;background:#2563eb;border:3px solid white;box-shadow:0 0 0 4px rgba(37,99,235,0.3)"></div>`,
  className: "border-0 bg-transparent",
  iconSize: [18, 18],
  iconAnchor: [9, 9]
});
function ClusterLayer({ cameras, highlightIds, onViewDetails, t }) {
  const map = useMap();
  const groupRef = useRef(null);
  useEffect(() => {
    const group = L.markerClusterGroup({
      chunkedLoading: true,
      maxClusterRadius: 55,
      showCoverageOnHover: false
    });
    groupRef.current = group;
    map.addLayer(group);
    return () => {
      map.removeLayer(group);
    };
  }, [map]);
  useEffect(() => {
    const group = groupRef.current;
    if (!group) return;
    group.clearLayers();
    const highlight = new Set(highlightIds || []);
    cameras.forEach((c) => {
      const marker = L.marker([c.lat, c.lng], { icon: cameraIcon(highlight.has(c.id)) });
      const popup = document.createElement("div");
      popup.innerHTML = `
        <div style="min-width:180px">
          <strong style="font-size:14px">${c.name || "AI Camera"}</strong>
          <div style="color:#555;font-size:12px;margin:2px 0">${t("district")}: ${c.district || "-"}</div>
          <div style="color:#555;font-size:12px;margin-bottom:6px">${c.lat.toFixed(4)}, ${c.lng.toFixed(4)}</div>
          <button data-id="${c.id}" style="background:#0f9d72;color:white;border:none;border-radius:8px;padding:6px 10px;font-size:12px;cursor:pointer;width:100%">${t("viewDetails")}</button>
        </div>`;
      popup.querySelector("button").addEventListener("click", () => onViewDetails?.(c));
      marker.bindPopup(popup);
      group.addLayer(marker);
    });
  }, [cameras, highlightIds, onViewDetails, t]);
  return null;
}
function MapController({ center, zoom, fitBounds }) {
  const map = useMap();
  useEffect(() => {
    if (fitBounds && fitBounds.length) {
      map.fitBounds(fitBounds, { padding: [40, 40] });
    } else if (center) {
      map.setView(center, zoom ?? map.getZoom());
    }
  }, [map, center, zoom, fitBounds]);
  return null;
}
function LeafletMap({
  cameras = [],
  userPosition,
  routeLine,
  highlightIds,
  onViewDetails,
  center,
  zoom = 8,
  fitBounds,
  t = (k) => k
}) {
  const initialCenter = useMemo(
    () => center || (userPosition ? [userPosition.lat, userPosition.lng] : KERALA_CENTER),
    [center, userPosition]
  );
  return /* @__PURE__ */ jsxs(
    MapContainer,
    {
      center: initialCenter,
      zoom,
      scrollWheelZoom: true,
      className: "h-full w-full",
      zoomControl: true,
      children: [
        /* @__PURE__ */ jsx(
          TileLayer,
          {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
            url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          }
        ),
        /* @__PURE__ */ jsx(
          ClusterLayer,
          {
            cameras,
            highlightIds,
            onViewDetails,
            t
          }
        ),
        routeLine && routeLine.length > 0 && /* @__PURE__ */ jsx(
          Polyline,
          {
            positions: routeLine.map((p) => [p.lat, p.lng]),
            pathOptions: { color: "#2563eb", weight: 5, opacity: 0.8 }
          }
        ),
        userPosition && /* @__PURE__ */ jsx(Marker, { position: [userPosition.lat, userPosition.lng], icon: userIcon, children: /* @__PURE__ */ jsx(Popup, { children: "You are here" }) }),
        /* @__PURE__ */ jsx(MapController, { center, zoom, fitBounds })
      ]
    }
  );
}
export {
  LeafletMap as default
};
