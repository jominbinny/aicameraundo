import { jsx } from "react/jsx-runtime";
import { useState, useEffect, Suspense, lazy } from "react";
function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : fallback;
}
const LeafletMap = lazy(() => import("./LeafletMap-Dx_uYEEo.js"));
function MapSkeleton({ label }) {
  return /* @__PURE__ */ jsx("div", { className: "flex h-full w-full items-center justify-center skeleton", children: /* @__PURE__ */ jsx("span", { className: "text-sm text-muted-foreground", children: label || "Loading map…" }) });
}
function MapView(props) {
  return /* @__PURE__ */ jsx(ClientOnly, { fallback: /* @__PURE__ */ jsx(MapSkeleton, { label: props.loadingLabel }), children: /* @__PURE__ */ jsx(Suspense, { fallback: /* @__PURE__ */ jsx(MapSkeleton, { label: props.loadingLabel }), children: /* @__PURE__ */ jsx(LeafletMap, { ...props }) }) });
}
export {
  MapView as M
};
