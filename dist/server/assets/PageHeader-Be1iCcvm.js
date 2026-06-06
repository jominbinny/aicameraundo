import { jsx, jsxs } from "react/jsx-runtime";
import { Link } from "@tanstack/react-router";
import { l as logo, L as LanguageToggle } from "./LanguageToggle-Bz6r3-p3.js";
import { u as useLanguage } from "./router-D-9uSlfh.js";
function PageHeader({ subtitle }) {
  const { t } = useLanguage();
  return /* @__PURE__ */ jsx("header", { className: "sticky top-0 z-[900] border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-xl items-center justify-between gap-2 px-4 py-3", children: [
    /* @__PURE__ */ jsxs(Link, { to: "/", className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsx("img", { src: logo, alt: "AI Camera Undo logo", width: 36, height: 36, className: "h-9 w-9" }),
      /* @__PURE__ */ jsxs("div", { className: "leading-tight", children: [
        /* @__PURE__ */ jsx("p", { className: "text-sm font-bold text-foreground", children: t("appName") }),
        subtitle && /* @__PURE__ */ jsx("p", { className: "text-xs text-muted-foreground", children: subtitle })
      ] })
    ] }),
    /* @__PURE__ */ jsx(LanguageToggle, {})
  ] }) });
}
export {
  PageHeader as P
};
