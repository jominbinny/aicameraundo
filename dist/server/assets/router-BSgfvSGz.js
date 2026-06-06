import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useRouterState, Link, createRootRouteWithContext, useRouter, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo, useContext, createContext, useEffect } from "react";
import { Home, Map, LocateFixed, Route as Route$7, Calculator } from "lucide-react";
const appCss = "/assets/styles-CyKPsbUg.css";
const en = { "appName": "AI Camera Undo", "tagline": "Find where Kerala's AI cameras are", "heroDescription": "Find AI traffic cameras across Kerala on an interactive map.", "viewMap": "View Map", "nearMe": "Near Me", "routeChecker": "Route Checker", "home": "Home", "map": "Map", "route": "Route", "viewDetails": "View Details", "showOnMap": "Show on Map", "district": "District", "coordinates": "Coordinates", "distance": "Distance", "search": "Search by name or district", "allDistricts": "All districts", "totalCameras": "Total cameras", "locateMe": "Locate Me", "nearestCameras": "Nearest cameras", "findNearby": "Find AI cameras near your current location.", "gettingLocation": "Getting your location…", "locationDenied": "Location access denied. Please enable location to find nearby cameras.", "retry": "Retry", "noResults": "No cameras found.", "from": "From", "to": "To", "startPlaceholder": "Starting location", "destPlaceholder": "Destination", "checkRoute": "Check Route", "routeDistance": "Route distance", "camerasOnRoute": "Cameras on route", "searchingRoute": "Calculating route…", "routeError": "Could not find a route. Try different locations.", "language": "ഭാഷ", "camerasNearRoute": "Cameras within {km} km of the route", "loading": "Loading…", "fineCalculator": "Fine Calculator", "fine": "Fine", "selectViolation": "Select Violation", "fineDetails": "Fine Details", "expectedFine": "Expected Fine", "explanation": "Explanation", "legalReference": "Legal Reference", "fineDisclaimer": "Disclaimer: Fine amounts are indicative and based on Kerala MVD rules. Actual fines may vary based on circumstances and officer discretion.", "no_helmet": "No Helmet", "no_helmet_desc": "Riding a two-wheeler without wearing a protective helmet is a serious safety violation. AI cameras detect riders without helmets and issue automated challans. This fine applies to both the rider and pillion if applicable.", "no_helmet_legal": "As per Section 129 of the Motor Vehicles Act, 1988, and Kerala MV Rules, every person riding a two-wheeler must wear a protective headgear. Violation attracts a penalty of ₹1,000 and may include license suspension for repeat offenses.", "no_seatbelt": "No Seatbelt", "no_seatbelt_desc": "Driving a motor vehicle without fastening the seatbelt is detected by AI cameras. This applies to the driver and front-seat passengers in cars and other light motor vehicles.", "no_seatbelt_legal": "Under Section 194B of the Motor Vehicles Act, not wearing a seatbelt while driving attracts a fine of ₹1,000. The driver is responsible for ensuring that all front-seat passengers also wear seatbelts.", "mobile_phone": "Mobile Phone Usage", "mobile_phone_desc": "Using a mobile phone while driving is one of the most dangerous distractions. AI cameras capture images of drivers holding phones to their ears or looking at screens while the vehicle is in motion.", "mobile_phone_legal": "As per Section 194B of the Motor Vehicles Act (amended), using a mobile phone while driving attracts a hefty fine of ₹5,000. Repeat offenses can lead to license suspension and even imprisonment in severe cases.", "triple_riding": "Triple Riding", "triple_riding_desc": "Carrying more than one pillion passenger on a two-wheeler (triple riding) is unsafe and illegal. AI cameras detect the number of persons on a vehicle and flag violations automatically.", "triple_riding_legal": "Under Section 194A of the Motor Vehicles Act, overloading a two-wheeler beyond its permitted capacity attracts a fine of ₹1,000. The vehicle may also be seized in repeated cases.", "calculator": "Calculator" };
const ml = { "appName": "AI ക്യാമറ ഉണ്ടോ", "tagline": "കേരളത്തിലെ AI ക്യാമറകൾ എവിടെയെന്ന് കണ്ടെത്താം", "heroDescription": "കേരളത്തിലുടനീളമുള്ള AI ട്രാഫിക് ക്യാമറകൾ ഇന്ററാക്ടീവ് മാപ്പിൽ കണ്ടെത്തുക.", "viewMap": "മാപ്പ് കാണുക", "nearMe": "എന്റെ സമീപം", "routeChecker": "റൂട്ട് പരിശോധന", "home": "ഹോം", "map": "മാപ്പ്", "route": "റൂട്ട്", "viewDetails": "വിശദാംശങ്ങൾ", "showOnMap": "മാപ്പിൽ കാണിക്കുക", "district": "ജില്ല", "coordinates": "നിർദ്ദേശാങ്കങ്ങൾ", "distance": "ദൂരം", "search": "പേര് അല്ലെങ്കിൽ ജില്ല തിരയുക", "allDistricts": "എല്ലാ ജില്ലകളും", "totalCameras": "ആകെ ക്യാമറകൾ", "locateMe": "എന്നെ കണ്ടെത്തുക", "nearestCameras": "ഏറ്റവും അടുത്ത ക്യാമറകൾ", "findNearby": "നിങ്ങളുടെ നിലവിലെ സ്ഥാനത്തിന് സമീപമുള്ള AI ക്യാമറകൾ കണ്ടെത്തുക.", "gettingLocation": "നിങ്ങളുടെ സ്ഥാനം കണ്ടെത്തുന്നു…", "locationDenied": "ലൊക്കേഷൻ ആക്സസ് നിഷേധിച്ചു. സമീപമുള്ള ക്യാമറകൾ കണ്ടെത്താൻ ലൊക്കേഷൻ പ്രവർത്തനക്ഷമമാക്കുക.", "retry": "വീണ്ടും ശ്രമിക്കുക", "noResults": "ക്യാമറകൾ കണ്ടെത്തിയില്ല.", "from": "എവിടെ നിന്ന്", "to": "എവിടേക്ക്", "startPlaceholder": "തുടങ്ങുന്ന സ്ഥലം", "destPlaceholder": "ലക്ഷ്യസ്ഥാനം", "checkRoute": "റൂട്ട് പരിശോധിക്കുക", "routeDistance": "റൂട്ട് ദൂരം", "camerasOnRoute": "റൂട്ടിലെ ക്യാമറകൾ", "searchingRoute": "റൂട്ട് കണക്കാക്കുന്നു…", "routeError": "റൂട്ട് കണ്ടെത്താനായില്ല. മറ്റ് സ്ഥലങ്ങൾ ശ്രമിക്കുക.", "language": "Language", "camerasNearRoute": "റൂട്ടിന് {km} കിലോമീറ്ററിനുള്ളിലെ ക്യാമറകൾ", "loading": "ലോഡ് ചെയ്യുന്നു…", "fineCalculator": "ഫൈൻ കാൽക്കുലേറ്റർ", "fine": "പിഴ", "selectViolation": "ലംഘനം തിരഞ്ഞെടുക്കുക", "fineDetails": "പിഴ വിശദാംശങ്ങൾ", "expectedFine": "പ്രതീക്ഷിക്കുന്ന പിഴ", "explanation": "വിശദീകരണം", "legalReference": "നിയമപരമായ അവലംബം", "fineDisclaimer": "പ്രസ്താവന: പിഴ തുകകൾ സൂചനാപരമായവയാണ്, കേരള എംവിഡി നിയമങ്ങളെ അടിസ്ഥാനമാക്കിയുള്ളവ. യഥാർത്ഥ പിഴകൾ സാഹചര്യങ്ങളെയും ഉദ്യോഗസ്ഥന്റെ നിർണ്ണയത്തെയും ആശ്രയിച്ച് വ്യത്യാസപ്പെട്ടേക്കാം.", "no_helmet": "ഹെൽമറ്റ് ഇല്ല", "no_helmet_desc": "രക്ഷാകവച ഹെൽമറ്റ് ധരിക്കാതെ ടൂ-വീലർ ഓടിക്കുന്നത് ഒരു ഗൗരവമായ സുരക്ഷാ ലംഘനമാണ്. AI ക്യാമറകൾ ഹെല്ലമറ്റ് ഇല്ലാത്ത റൈഡറുകളെ കണ്ടെത്തി സ്വയംചാലന ചല്ലാൻ ഇറക്കുന്നു. റൈഡറിനും പില്ലിയനും ഈ പിഴ ബാധകമാണ്.", "no_helmet_legal": "മോട്ടോർ വാഹന നിയമം 1988-ലെ സെക്ഷൻ 129 പ്രകാരവും കേരള എംവി നിയമങ്ങൾ പ്രകാരവും ഓരോ ടൂ-വീലർ യാത്രക്കാരനും രക്ഷാകവച ഹെഡ്‌ഗിയർ ധരിക്കണം. ലംഘനത്തിന് ₹1,000 പിഴയും ആവർത്തന ലംഘനങ്ങളിൽ ലൈസൻസ് സസ്പെൻഷനും ബാധകമാണ്.", "no_seatbelt": "സീറ്റ്ബെൽറ്റ് ഇല്ല", "no_seatbelt_desc": "സീറ്റ്ബെൽറ്റ് കെട്ടാതെ മോട്ടോർ വാഹനം ഓടിക്കുന്നത് AI ക്യാമറകൾ കണ്ടെത്തുന്നു. കാറുകളിലും ലൈറ്റ് മോട്ടോർ വാഹനങ്ങളിലും ഡ്രൈവർക്കും മുന്നിലെ യാത്രക്കാർക്കും ഇത് ബാധകമാണ്.", "no_seatbelt_legal": "മോട്ടോർ വാഹന നിയമത്തിലെ സെക്ഷൻ 194B പ്രകാരം, സീറ്റ്ബെൽറ്റ് ധരിക്കാതെ ഡ്രൈവ് ചെയ്യുന്നതിന് ₹1,000 പിഴ ബാധകമാണ്. മുന്നിലെ യാത്രക്കാരും സീറ്റ്ബെൽറ്റ് ധരിക്കണമെന്ന് ഉറപ്പാക്കേണ്ടത് ഡ്രൈവറുടെ ഉത്തരവാദിത്തമാണ്.", "mobile_phone": "മൊബൈൽ ഫോൺ ഉപയോഗം", "mobile_phone_desc": "വാഹനം ഓടിക്കുമ്പോൾ മൊബൈൽ ഫോൺ ഉപയോഗിക്കുന്നത് ഏറ്റവും അപകടകരമായ ശ്രദ്തിമുട്ടലുകളിലൊന്നാണ്. വാഹനം ചലിക്കുമ്പോൾ ഫോണുകൾ ചെവിയിൽ വെക്കുന്നതും സ്ക്രീനിലേക്ക് നോക്കുന്നതും AI ക്യാമറകൾ പകർത്തുന്നു.", "mobile_phone_legal": "മോട്ടോർ വാഹന നിയമത്തിലെ സെക്ഷൻ 194B (തിരുത്തപ്പെട്ടത്) പ്രകാരം, വാഹനം ഓടിക്കുമ്പോൾ മൊബൈൽ ഫോൺ ഉപയോഗിക്കുന്നതിന് ₹5,000-ത്തിൻ്റെ വലിയ പിഴ ബാധകമാണ്. ആവർത്തന ലംഘനങ്ങളിൽ ലൈസൻസ് സസ്പെൻഷനും കഠിനമായ സാഹചര്യങ്ങളിൽ തടവും ശിക്ഷയുണ്ടായേക്കാം.", "triple_riding": "ട്രിപ്പിൾ റൈഡിംഗ്", "triple_riding_desc": "ടൂ-വീലറിൽ ഒന്നിൽ കൂടുതൽ പിള്ളിയനുമായി യാത്ര ചെയ്യുന്നത് (ട്രിപ്പിൾ റൈഡിംഗ്) അപകടകരവും നിയമവിരുദ്ധവുമാണ്. വാഹനത്തിലുള്ള ആളുകളുടെ എണ്ണം AI ക്യാമറകൾ കണ്ടെത്തി ലംഘനങ്ങൾ സ്വയമേവ ഫ്ലാഗ് ചെയ്യുന്നു.", "triple_riding_legal": "മോട്ടോർ വാഹന നിയമത്തിലെ സെക്ഷൻ 194A പ്രകാരം, ടൂ-വീലറിൻ്റെ അനുവദനീയ കപ്പാസിറ്റിയിലധികം ആളുകളെ യാത്ര ചെയ്യിപ്പിക്കുന്നതിന് ₹1,000 പിഴ ബാധകമാണ്. ആവർത്തന ലംഘനങ്ങളിൽ വാഹനം പിടിച്ചെടുക്കപ്പെടേണ്ടതുമുണ്ട്.", "calculator": "കാൽക്കുലേറ്റർ" };
const translations = {
  en,
  ml
};
const STORAGE_KEY = "aicu-lang";
const LanguageContext = createContext(
  /** @type {any} */
  null
);
function getInitialLang() {
  if (typeof window === "undefined") return "ml";
  return window.localStorage.getItem(STORAGE_KEY) || "ml";
}
function LanguageProvider({ children }) {
  const [lang, setLang] = useState(getInitialLang);
  const setLanguage = useCallback((next) => {
    setLang(next);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, next);
    }
  }, []);
  const toggleLanguage = useCallback(() => {
    setLanguage(lang === "ml" ? "en" : "ml");
  }, [lang, setLanguage]);
  const t = useCallback(
    (key, vars) => {
      const dict = translations[lang] || translations.ml;
      let value2 = dict[key] ?? translations.en[key] ?? key;
      if (vars) {
        Object.entries(vars).forEach(([k, v]) => {
          value2 = value2.replace(`{${k}}`, v);
        });
      }
      return value2;
    },
    [lang]
  );
  const value = useMemo(
    () => ({ lang, setLanguage, toggleLanguage, t }),
    [lang, setLanguage, toggleLanguage, t]
  );
  return /* @__PURE__ */ jsx(LanguageContext.Provider, { value, children });
}
function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
function BottomNav() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const items = [
    { to: "/", icon: Home, label: t("home") },
    { to: "/map", icon: Map, label: t("map") },
    { to: "/near-me", icon: LocateFixed, label: t("nearMe") },
    { to: "/route-checker", icon: Route$7, label: t("route") },
    { to: "/fine-calculator", icon: Calculator, label: t("calculator") }
  ];
  return /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": "Primary",
      className: "fixed inset-x-0 bottom-0 z-[1000] border-t border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80",
      children: /* @__PURE__ */ jsx("ul", { className: "mx-auto flex max-w-xl items-stretch justify-around", children: items.map(({ to, icon: Icon, label }) => {
        const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
        return /* @__PURE__ */ jsx("li", { className: "flex-1", children: /* @__PURE__ */ jsxs(
          Link,
          {
            to,
            "aria-current": active ? "page" : void 0,
            className: `flex flex-col items-center gap-1 py-2.5 text-xs font-medium transition-colors ${active ? "text-primary" : "text-muted-foreground hover:text-foreground"}`,
            children: [
              /* @__PURE__ */ jsx(Icon, { className: "h-5 w-5", "aria-hidden": "true" }),
              /* @__PURE__ */ jsx("span", { className: "truncate", children: label })
            ]
          }
        ) }, to);
      }) })
    }
  );
}
function reportLovableError(error, context = {}) {
  if (typeof window === "undefined") return;
  window.__lovableEvents?.captureException?.(
    error,
    {
      source: "react_error_boundary",
      route: window.location.pathname,
      ...context
    },
    {
      mechanism: "react_error_boundary",
      handled: false,
      severity: "error"
    }
  );
}
function NotFoundComponent() {
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-7xl font-bold text-foreground", children: "404" }),
    /* @__PURE__ */ jsx("h2", { className: "mt-4 text-xl font-semibold text-foreground", children: "Page not found" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "The page you're looking for doesn't exist or has been moved." }),
    /* @__PURE__ */ jsx("div", { className: "mt-6", children: /* @__PURE__ */ jsx(
      Link,
      {
        to: "/",
        className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
        children: "Go home"
      }
    ) })
  ] }) });
}
function ErrorComponent({ error, reset }) {
  console.error(error);
  const router2 = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return /* @__PURE__ */ jsx("div", { className: "flex min-h-screen items-center justify-center bg-background px-4", children: /* @__PURE__ */ jsxs("div", { className: "max-w-md text-center", children: [
    /* @__PURE__ */ jsx("h1", { className: "text-xl font-semibold tracking-tight text-foreground", children: "This page didn't load" }),
    /* @__PURE__ */ jsx("p", { className: "mt-2 text-sm text-muted-foreground", children: "Something went wrong on our end. You can try refreshing or head back home." }),
    /* @__PURE__ */ jsxs("div", { className: "mt-6 flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => {
            router2.invalidate();
            reset();
          },
          className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
          children: "Try again"
        }
      ),
      /* @__PURE__ */ jsx(
        "a",
        {
          href: "/",
          className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
          children: "Go home"
        }
      )
    ] })
  ] }) });
}
const Route$6 = createRootRouteWithContext()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1, viewport-fit=cover"
      },
      { title: "AI Camera Undo — Find Kerala MVD AI Traffic Cameras" },
      {
        name: "description",
        content: "AI Camera Undo helps you locate Kerala Motor Vehicle Department AI traffic cameras on an interactive map. Find cameras near you or along your route."
      },
      {
        name: "keywords",
        content: "Kerala AI camera, MVD AI camera, Kerala traffic camera, AI Camera Undo, Kerala speed camera map"
      },
      { name: "author", content: "AI Camera Undo" },
      { name: "theme-color", content: "#0f9d72" },
      { property: "og:title", content: "AI Camera Undo" },
      {
        property: "og:description",
        content: "Find Kerala MVD AI traffic cameras on an interactive map."
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "manifest", href: "/manifest.webmanifest" },
      { rel: "apple-touch-icon", href: "/icons/icon-192.png" }
    ]
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent
});
function RootShell({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
function RootComponent() {
  const { queryClient } = Route$6.useRouteContext();
  return /* @__PURE__ */ jsx(QueryClientProvider, { client: queryClient, children: /* @__PURE__ */ jsxs(LanguageProvider, { children: [
    /* @__PURE__ */ jsx("div", { className: "min-h-screen pb-16", children: /* @__PURE__ */ jsx(Outlet, {}) }),
    /* @__PURE__ */ jsx(BottomNav, {})
  ] }) });
}
const BASE_URL = "";
const Route$5 = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const paths = ["/", "/map", "/near-me", "/route-checker"];
        const urls = paths.map(
          (p) => `  <url><loc>${BASE_URL}${p}</loc><changefreq>weekly</changefreq></url>`
        ).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" }
        });
      }
    }
  }
});
const $$splitComponentImporter$4 = () => import("./route-checker-Tez4hsvk.js");
const Route$4 = createFileRoute("/route-checker")({
  head: () => ({
    meta: [{
      title: "Route Checker — AI Camera Undo"
    }, {
      name: "description",
      content: "Check which Kerala AI traffic cameras lie along your travel route."
    }],
    links: [{
      rel: "canonical",
      href: "/route-checker"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./near-me-Dy0VVW_H.js");
const Route$3 = createFileRoute("/near-me")({
  head: () => ({
    meta: [{
      title: "Near Me — AI Camera Undo"
    }, {
      name: "description",
      content: "Find the AI traffic cameras nearest to your current location in Kerala."
    }],
    links: [{
      rel: "canonical",
      href: "/near-me"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./map-3bIY45d9.js");
const Route$2 = createFileRoute("/map")({
  head: () => ({
    meta: [{
      title: "Map — AI Camera Undo"
    }, {
      name: "description",
      content: "Browse all Kerala MVD AI traffic cameras on an interactive clustered map."
    }],
    links: [{
      rel: "canonical",
      href: "/map"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./fine-calculator-BVoiNJpa.js");
const Route$1 = createFileRoute("/fine-calculator")({
  head: () => ({
    meta: [{
      title: "Fine Calculator — AI Camera Undo"
    }, {
      name: "description",
      content: "Calculate expected traffic fines for common violations detected by Kerala MVD AI cameras."
    }],
    links: [{
      rel: "canonical",
      href: "/fine-calculator"
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./index-5hIZeTJd.js");
const Route = createFileRoute("/")({
  head: () => ({
    meta: [{
      title: "AI Camera Undo — Find Kerala AI Traffic Cameras"
    }, {
      name: "description",
      content: "Find Kerala MVD AI traffic cameras on an interactive map. Search by district, find cameras near you, or check cameras along your route."
    }, {
      property: "og:title",
      content: "AI Camera Undo"
    }, {
      property: "og:description",
      content: "Find Kerala MVD AI traffic cameras on an interactive map."
    }],
    links: [{
      rel: "canonical",
      href: "/"
    }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "AI Camera Undo",
        applicationCategory: "TravelApplication",
        operatingSystem: "Web",
        description: "Find Kerala MVD AI traffic cameras on an interactive map."
      })
    }]
  }),
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const SitemapDotxmlRoute = Route$5.update({
  id: "/sitemap.xml",
  path: "/sitemap.xml",
  getParentRoute: () => Route$6
});
const RouteCheckerRoute = Route$4.update({
  id: "/route-checker",
  path: "/route-checker",
  getParentRoute: () => Route$6
});
const NearMeRoute = Route$3.update({
  id: "/near-me",
  path: "/near-me",
  getParentRoute: () => Route$6
});
const MapRoute = Route$2.update({
  id: "/map",
  path: "/map",
  getParentRoute: () => Route$6
});
const FineCalculatorRoute = Route$1.update({
  id: "/fine-calculator",
  path: "/fine-calculator",
  getParentRoute: () => Route$6
});
const IndexRoute = Route.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$6
});
const rootRouteChildren = {
  IndexRoute,
  FineCalculatorRoute,
  MapRoute,
  NearMeRoute,
  RouteCheckerRoute,
  SitemapDotxmlRoute
};
const routeTree = Route$6._addFileChildren(rootRouteChildren)._addFileTypes();
const getRouter = () => {
  const queryClient = new QueryClient();
  const router2 = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    defaultPreloadStaleTime: 0
  });
  return router2;
};
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  router as r,
  useLanguage as u
};
