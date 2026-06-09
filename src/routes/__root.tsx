import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";

import { LanguageProvider, useLanguage } from "@/hooks/useLanguage";
import BottomNav from "@/components/BottomNav";
import LanguageToggle from "@/components/LanguageToggle";
import logo from "@/assets/logo.png";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function DesktopNavbar() {
  const { t } = useLanguage();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const navItems = [
    { to: "/", label: t("home") },
    { to: "/map", label: t("map") },
    { to: "/near-me", label: t("nearMe") },
    { to: "/route-checker", label: t("route") },
    { to: "/fine-calculator", label: t("calculator") },
    { to: "/road-signs", label: t("roadSigns") },
    { to: "/learners-license", label: t("learnersLicense") },
    { to: "/safety-tips", label: t("safetyTips") },
    { to: "/emergency", label: t("emergencyContacts") },
    { to: "/about", label: t("about") },
  ];

  return (
    <div className="hidden md:block fixed top-4 inset-x-0 z-[1000] mx-auto max-w-6xl px-4 w-full">
      <header className="flex items-center justify-between rounded-full border border-border/40 bg-card/75 px-6 py-2.5 shadow-xl backdrop-blur-md">
        <Link to="/" className="flex items-center gap-2 select-none">
          <img src={logo} alt="SafeDriveKeralam logo" width={34} height={34} className="h-8.5 w-8.5" />
          <div className="leading-tight">
            <span className="text-sm font-black text-foreground">{t("appName")}</span>
            <p className="text-[9px] text-muted-foreground font-semibold">{t("tagline")}</p>
          </div>
        </Link>

        <nav aria-label="Desktop Navigation" className="flex items-center gap-1">
          {navItems.map(({ to, label }) => {
            const active = to === "/" ? pathname === "/" : pathname.startsWith(to);
            return (
              <Link
                key={to}
                to={to}
                className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-200 ${
                  active
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                }`}
              >
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
        </div>
      </header>
    </div>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((reg) => console.log("Service Worker registered with scope:", reg.scope))
          .catch((err) => console.error("Service Worker registration failed:", err));
      });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <LanguageProvider>
        <DesktopNavbar />
        {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
        <div className="min-h-screen pt-0 md:pt-24 pb-16 md:pb-8">
          <Outlet />
        </div>
        <BottomNav />
      </LanguageProvider>
    </QueryClientProvider>
  );
}
