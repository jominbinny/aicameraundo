import { j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useLanguage } from "./router-B7rUdxeD.mjs";
import { g as Languages } from "../_libs/lucide-react.mjs";
const logo = "/assets/logo-D3lXJFCB.png";
function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      onClick: toggleLanguage,
      "aria-label": "Switch language",
      className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Languages, { className: "h-4 w-4", "aria-hidden": "true" }),
        lang === "ml" ? "ENG" : "മല"
      ]
    }
  );
}
export {
  LanguageToggle as L,
  logo as l
};
