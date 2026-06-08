import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { e as useNavigate } from "../_libs/tanstack__react-router.mjs";
import { P as PageHeader } from "./PageHeader-CRb5vut9.mjs";
import { n as nearestCameras, C as CameraCard } from "./CameraCard-DJPiLtFq.mjs";
import { M as MapView } from "./MapView-BPL5pVUk.mjs";
import { u as useLanguage } from "./router-B7rUdxeD.mjs";
import { u as useGeolocation } from "./useGeolocation-NKp5thlV.mjs";
import { g as getAllCameras } from "./cameraService-D_S4R9Wf.mjs";
import { S as ShieldAlert, L as LocateFixed, d as SearchX } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "./LanguageToggle-BmwkpC_T.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function EmptyState(props) {
  const { icon: Icon = SearchX, title, description = null, action = null } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: title }),
    description && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "max-w-xs text-sm text-muted-foreground", children: description }),
    action
  ] });
}
function NearMePage() {
  const {
    t
  } = useLanguage();
  useNavigate();
  const {
    position,
    status,
    locate
  } = useGeolocation();
  const [center, setCenter] = reactExports.useState(null);
  reactExports.useEffect(() => {
    locate();
  }, [locate]);
  const pos = position;
  const nearest = reactExports.useMemo(() => pos ? nearestCameras(pos, getAllCameras(), 10) : [], [pos]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[calc(100vh-4rem)] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { subtitle: t("nearMe") }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-[55vh] min-h-[320px] shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MapView, { cameras: nearest, userPosition: pos, center: center || (pos ? [pos.lat, pos.lng] : null), zoom: 13, loadingLabel: t("loading"), t }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-xl flex-1 px-4 py-4", children: [
      status === "loading" && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: t("gettingLocation") }),
      (status === "denied" || status === "unavailable") && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { icon: ShieldAlert, title: t("locationDenied"), action: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: locate, className: "mt-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground", children: t("retry") }) }),
      status === "granted" && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "mb-3 flex items-center gap-2 text-lg font-bold text-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(LocateFixed, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
          t("nearestCameras")
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: nearest.map((c) => /* @__PURE__ */ jsxRuntimeExports.jsx(CameraCard, { camera: c, onShowOnMap: () => {
          setCenter([c.lat, c.lng]);
          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });
        } }, c.id)) })
      ] })
    ] })
  ] });
}
export {
  NearMePage as component
};
