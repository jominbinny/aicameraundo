import { jsxs, jsx } from "react/jsx-runtime";
import { Languages } from "lucide-react";
import { u as useLanguage } from "./router-BSgfvSGz.js";
const logo = "/assets/logo-D3lXJFCB.png";
function LanguageToggle() {
  const { lang, toggleLanguage } = useLanguage();
  return /* @__PURE__ */ jsxs(
    "button",
    {
      onClick: toggleLanguage,
      "aria-label": "Switch language",
      className: "inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent",
      children: [
        /* @__PURE__ */ jsx(Languages, { className: "h-4 w-4", "aria-hidden": "true" }),
        lang === "ml" ? "ENG" : "മല"
      ]
    }
  );
}
export {
  LanguageToggle as L,
  logo as l
};
