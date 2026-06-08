import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
import { l as logo, L as LanguageToggle } from "./LanguageToggle-BmwkpC_T.mjs";
import { u as useLanguage } from "./router-B7rUdxeD.mjs";
function PageHeader({ subtitle }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-[900] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto flex max-w-xl items-center justify-between gap-2 px-4 py-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("img", { src: logo, alt: "AI Camera Undo logo", width: 36, height: 36, className: "h-9 w-9" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: t("appName") }),
        subtitle && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(LanguageToggle, {})
  ] }) });
}
export {
  PageHeader as P
};
