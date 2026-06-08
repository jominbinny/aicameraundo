import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { P as PageHeader } from "./PageHeader-CRb5vut9.mjs";
import { u as useLanguage } from "./router-B7rUdxeD.mjs";
import { c as clsx } from "../_libs/clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { T as TriangleAlert, f as ChevronRight, C as Calculator, I as IndianRupee } from "../_libs/lucide-react.mjs";
import "../_libs/tanstack__react-router.mjs";
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
function cn(...inputs) {
  return twMerge(clsx(inputs));
}
const Card = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("rounded-xl border bg-card text-card-foreground shadow", className),
      ...props
    }
  )
);
Card.displayName = "Card";
const CardHeader = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex flex-col space-y-1.5 p-6", className), ...props })
);
CardHeader.displayName = "CardHeader";
const CardTitle = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      ref,
      className: cn("font-semibold leading-none tracking-tight", className),
      ...props
    }
  )
);
CardTitle.displayName = "CardTitle";
const CardDescription = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("text-sm text-muted-foreground", className), ...props })
);
CardDescription.displayName = "CardDescription";
const CardContent = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("p-6 pt-0", className), ...props })
);
CardContent.displayName = "CardContent";
const CardFooter = reactExports.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { ref, className: cn("flex items-center p-6 pt-0", className), ...props })
);
CardFooter.displayName = "CardFooter";
const VIOLATIONS = [{
  id: "no_helmet",
  fine: 1e3,
  icon: "helmet"
}, {
  id: "no_seatbelt",
  fine: 1e3,
  icon: "seatbelt"
}, {
  id: "mobile_phone",
  fine: 5e3,
  icon: "phone"
}, {
  id: "triple_riding",
  fine: 1e3,
  icon: "users"
}];
function FineCalculatorPage() {
  const {
    t
  } = useLanguage();
  const [selected, setSelected] = reactExports.useState(null);
  const selectedViolation = VIOLATIONS.find((v) => v.id === selected);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[calc(100vh-4rem)] flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeader, { subtitle: t("fineCalculator") }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto w-full max-w-xl flex-1 px-4 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-4 flex items-center gap-2 rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-4 w-4 shrink-0", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: t("fineDisclaimer") })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mb-3 text-lg font-bold text-foreground", children: t("selectViolation") }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid gap-3", children: VIOLATIONS.map((v) => {
        const isActive = selected === v.id;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs("button", { onClick: () => setSelected(v.id), className: `flex items-center justify-between rounded-xl border p-4 text-left transition-all ${isActive ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary" : "border-border bg-card hover:bg-accent"}`, "aria-pressed": isActive, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex h-10 w-10 items-center justify-center rounded-lg ${isActive ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ViolationIcon, { type: v.icon }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground", children: t(v.id) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                t("fine"),
                ": ₹",
                v.fine.toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: `h-5 w-5 shrink-0 transition-transform ${isActive ? "rotate-90 text-primary" : "text-muted-foreground"}`, "aria-hidden": "true" })
        ] }, v.id);
      }) }),
      selectedViolation && /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "mt-6 border-primary/20 bg-primary/5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "pb-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardTitle, { className: "flex items-center gap-2 text-base", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calculator, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
          t("fineDetails")
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(CardContent, { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(IndianRupee, { className: "h-5 w-5 text-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: t("expectedFine") }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-2xl font-bold text-foreground", children: [
                "₹",
                selectedViolation.fine.toLocaleString("en-IN")
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-card p-3 text-sm text-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: t("explanation") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground leading-relaxed", children: t(`${selectedViolation.id}_desc`) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-lg bg-amber-50 p-3 text-sm text-amber-800 dark:bg-amber-950/30 dark:text-amber-200", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold mb-1", children: t("legalReference") }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "leading-relaxed", children: t(`${selectedViolation.id}_legal`) })
          ] })
        ] })
      ] })
    ] })
  ] });
}
function ViolationIcon({
  type
}) {
  switch (type) {
    case "helmet":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M2 12h20" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 12V8a8 8 0 0 1 16 0v4" })
      ] });
    case "seatbelt":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 4v16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 4v16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 9h16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M4 15h16" })
      ] });
    case "phone":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { width: "14", height: "20", x: "5", y: "2", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 18h.01" })
      ] });
    case "users":
      return /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "9", cy: "7", r: "4" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M22 21v-2a4 4 0 0 0-3-3.87" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M16 3.13a4 4 0 0 1 0 7.75" })
      ] });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "h-5 w-5" });
  }
}
export {
  FineCalculatorPage as component
};
