import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { L as LanguageToggle, l as logo } from "./LanguageToggle-BmwkpC_T.mjs";
import { u as useLanguage } from "./router-B7rUdxeD.mjs";
import { b as getCameraCount, a as getDistricts } from "./cameraService-D_S4R9Wf.mjs";
import { M as Map, L as LocateFixed, R as Route, b as Camera } from "../_libs/lucide-react.mjs";
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
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-query.mjs";
function HomePage() {
  const {
    t
  } = useLanguage();
  const count = getCameraCount();
  const districts = getDistricts().filter(Boolean).length;
  const actions = [{
    to: "/map",
    icon: Map,
    label: t("viewMap"),
    desc: t("appName")
  }, {
    to: "/near-me",
    icon: LocateFixed,
    label: t("nearMe"),
    desc: t("findNearby")
  }, {
    to: "/route-checker",
    icon: Route,
    label: t("routeChecker"),
    desc: t("routeChecker")
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "animate-fade-in", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-end px-4 py-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageToggle, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "px-5 pb-6 pt-2 text-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "AI Camera Undo logo", width: 96, height: 96, className: "mx-auto h-24 w-24 drop-shadow" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "mt-4 text-3xl font-extrabold tracking-tight text-foreground", children: t("appName") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-2 max-w-md text-balance text-base text-muted-foreground", children: t("tagline") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mx-auto mt-1 max-w-md text-sm text-muted-foreground", children: t("heroDescription") }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto mt-5 flex max-w-xs items-center justify-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 rounded-2xl border border-border bg-card p-3 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-center gap-1.5 text-primary", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Camera, { className: "h-4 w-4", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xl font-bold", children: count })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("totalCameras") })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 rounded-2xl border border-border bg-card p-3 shadow-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xl font-bold text-primary", children: districts }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: t("district") })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "mx-auto grid max-w-xl gap-3 px-5 pb-10", children: actions.map(({
      to,
      icon: Icon,
      label,
      desc
    }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to, className: "group flex items-center gap-4 rounded-2xl border border-border bg-card p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-12 w-12 items-center justify-center rounded-xl gradient-primary text-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "h-6 w-6", "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "truncate text-sm text-muted-foreground", children: desc })
      ] })
    ] }, to)) })
  ] });
}
export {
  HomePage as component
};
