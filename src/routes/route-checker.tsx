import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Route as RouteIcon, Camera, AlertCircle } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CameraCard from "@/components/CameraCard";
import MapView from "@/components/map/MapView";
import PlaceAutocomplete from "@/components/PlaceAutocomplete";
import { useLanguage } from "@/hooks/useLanguage";
import { getAllCameras } from "@/services/cameraService";
import { geocode, getRoute } from "@/services/routeService";
import { distanceToRouteKm, formatDistance } from "@/utils/distance";

const BUFFER_KM = 1.5;

export const Route = createFileRoute("/route-checker")({
  head: () => ({
    meta: [
      { title: "Route Checker — SafeDriveKeralam" },
      {
        name: "description",
        content: "Check which Kerala AI traffic cameras lie along your travel route.",
      },
    ],
    links: [{ rel: "canonical", href: "/route-checker" }],
  }),
  component: RoutePage,
});

function RoutePage() {
  const { t } = useLanguage();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [fromSel, setFromSel] = useState<any>(null);
  const [toSel, setToSel] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<any>(null);

  const handleCheck = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!from.trim() || !to.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const start = fromSel || (await geocode(from));
      const end = toSel || (await geocode(to));
      const route = await getRoute(start, end);
      const onRoute = getAllCameras()
        .map((c) => ({ ...c, distanceKm: distanceToRouteKm(c, route.line) }))
        .filter((c) => c.distanceKm <= BUFFER_KM)
        .sort((a, b) => a.distanceKm - b.distanceKm);
      setResult({ route, start, end, cameras: onRoute });
    } catch (err: any) {
      setError(err?.message || t("routeError"));
    } finally {
      setLoading(false);
    }
  };

  const bounds = result
    ? result.route.line.map((p: any) => [p.lat, p.lng])
    : undefined;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <PageHeader subtitle={t("routeChecker")} />

      <form onSubmit={handleCheck} className="mx-auto w-full max-w-xl space-y-2 px-4 py-3">
        <PlaceAutocomplete
          value={from}
          onChange={(v: string) => {
            setFrom(v);
            setFromSel(null);
          }}
          onSelect={setFromSel}
          placeholder={t("startPlaceholder")}
          ariaLabel={t("from")}
          iconClassName="text-primary"
        />
        <PlaceAutocomplete
          value={to}
          onChange={(v: string) => {
            setTo(v);
            setToSel(null);
          }}
          onSelect={setToSel}
          placeholder={t("destPlaceholder")}
          ariaLabel={t("to")}
          iconClassName="text-destructive"
        />
        <button
          type="submit"
          disabled={loading}
          className="flex w-full items-center justify-center gap-2 rounded-full gradient-primary py-2.5 text-sm font-semibold text-primary-foreground disabled:opacity-60"
        >
          <RouteIcon className="h-4 w-4" />
          {loading ? t("searchingRoute") : t("checkRoute")}
        </button>
      </form>

      {error && (
        <div className="mx-auto w-full max-w-xl px-4">
          <p className="flex items-center gap-2 rounded-xl bg-destructive/10 px-3 py-2 text-sm text-destructive">
            <AlertCircle className="h-4 w-4" /> {error}
          </p>
        </div>
      )}

      {result && (
        <>
          <div className="h-[55vh] min-h-[320px] shrink-0">
            <MapView
              cameras={result.cameras}
              routeLine={result.route.line}
              highlightIds={result.cameras.map((c: any) => c.id)}
              fitBounds={bounds}
              loadingLabel={t("loading")}
              t={t}
            />
          </div>

          <div className="mx-auto w-full max-w-xl px-4 py-4">
            <div className="mb-4 flex gap-3">
              <div className="flex-1 rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="text-xl font-bold text-primary">
                  {formatDistance(result.route.distanceKm)}
                </p>
                <p className="text-xs text-muted-foreground">{t("routeDistance")}</p>
              </div>
              <div className="flex-1 rounded-2xl border border-border bg-card p-3 text-center shadow-sm">
                <p className="flex items-center justify-center gap-1 text-xl font-bold text-primary">
                  <Camera className="h-4 w-4" />
                  {result.cameras.length}
                </p>
                <p className="text-xs text-muted-foreground">{t("camerasOnRoute")}</p>
              </div>
            </div>

            <p className="mb-2 text-sm text-muted-foreground">
              {t("camerasNearRoute", { km: BUFFER_KM })}
            </p>
            <div className="grid gap-3">
              {result.cameras.map((c: any) => (
                <CameraCard key={c.id} camera={c} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
