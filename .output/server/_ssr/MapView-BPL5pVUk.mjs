import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = reactExports.useState(false);
  reactExports.useEffect(() => setMounted(true), []);
  return mounted ? children : fallback;
}
const LeafletMap = typeof window !== "undefined" ? reactExports.lazy(() => import("./LeafletMap-Dx_uYEEo.mjs")) : () => null;
function MapSkeleton({ label }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-full w-full items-center justify-center skeleton", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground", children: label || "Loading map…" }) });
}
function MapView(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ClientOnly, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(MapSkeleton, { label: props.loadingLabel }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(reactExports.Suspense, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(MapSkeleton, { label: props.loadingLabel }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(LeafletMap, { ...props }) }) });
}
export {
  MapView as M
};
