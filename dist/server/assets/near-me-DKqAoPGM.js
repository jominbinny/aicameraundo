import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { useNavigate } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import { SearchX, ShieldAlert, LocateFixed } from "lucide-react";
import { P as PageHeader } from "./PageHeader-Be1iCcvm.js";
import { n as nearestCameras, C as CameraCard } from "./CameraCard-DhMVfWhx.js";
import { M as MapView } from "./MapView-y0mMqDjc.js";
import { u as useLanguage } from "./router-D-9uSlfh.js";
import { u as useGeolocation } from "./useGeolocation-NKp5thlV.js";
import { g as getAllCameras } from "./cameraService-D_S4R9Wf.js";
import "./LanguageToggle-Bz6r3-p3.js";
import "@tanstack/react-query";
function EmptyState(props) {
  const { icon: Icon = SearchX, title, description = null, action = null } = props;
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center", children: [
    /* @__PURE__ */ jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground", children: /* @__PURE__ */ jsx(Icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
    /* @__PURE__ */ jsx("p", { className: "font-semibold text-foreground", children: title }),
    description && /* @__PURE__ */ jsx("p", { className: "max-w-xs text-sm text-muted-foreground", children: description }),
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
  const [center, setCenter] = useState(null);
  useEffect(() => {
    locate();
  }, [locate]);
  const pos = position;
  const nearest = useMemo(() => pos ? nearestCameras(pos, getAllCameras(), 10) : [], [pos]);
  return /* @__PURE__ */ jsxs("div", { className: "flex min-h-[calc(100vh-4rem)] flex-col", children: [
    /* @__PURE__ */ jsx(PageHeader, { subtitle: t("nearMe") }),
    /* @__PURE__ */ jsx("div", { className: "h-[55vh] min-h-[320px] shrink-0", children: /* @__PURE__ */ jsx(MapView, { cameras: nearest, userPosition: pos, center: center || (pos ? [pos.lat, pos.lng] : null), zoom: 13, loadingLabel: t("loading"), t }) }),
    /* @__PURE__ */ jsxs("div", { className: "mx-auto w-full max-w-xl flex-1 px-4 py-4", children: [
      status === "loading" && /* @__PURE__ */ jsx("p", { className: "py-8 text-center text-sm text-muted-foreground", children: t("gettingLocation") }),
      (status === "denied" || status === "unavailable") && /* @__PURE__ */ jsx(EmptyState, { icon: ShieldAlert, title: t("locationDenied"), action: /* @__PURE__ */ jsx("button", { onClick: locate, className: "mt-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground", children: t("retry") }) }),
      status === "granted" && /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsxs("h2", { className: "mb-3 flex items-center gap-2 text-lg font-bold text-foreground", children: [
          /* @__PURE__ */ jsx(LocateFixed, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
          t("nearestCameras")
        ] }),
        /* @__PURE__ */ jsx("div", { className: "grid gap-3", children: nearest.map((c) => /* @__PURE__ */ jsx(CameraCard, { camera: c, onShowOnMap: () => {
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
