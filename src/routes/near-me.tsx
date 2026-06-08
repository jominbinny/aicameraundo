import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { LocateFixed, ShieldAlert } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import CameraCard from "@/components/CameraCard";
import EmptyState from "@/components/EmptyState";
import MapView from "@/components/map/MapView";
import { useLanguage } from "@/hooks/useLanguage";
import { useGeolocation } from "@/hooks/useGeolocation";
import { getAllCameras } from "@/services/cameraService";
import { nearestCameras } from "@/utils/distance";

export const Route = createFileRoute("/near-me")({
  head: () => ({
    meta: [
      { title: "Near Me — SafeDrive Kerala" },
      {
        name: "description",
        content: "Find the AI traffic cameras nearest to your current location in Kerala.",
      },
    ],
    links: [{ rel: "canonical", href: "/near-me" }],
  }),
  component: NearMePage,
});

function NearMePage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { position, status, locate } = useGeolocation();
  const [center, setCenter] = useState<any>(null);

  useEffect(() => {
    locate();
  }, [locate]);

  const pos: any = position;
  const nearest = useMemo(
    () => (pos ? nearestCameras(pos, getAllCameras(), 10) : []),
    [pos],
  );

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <PageHeader subtitle={t("nearMe")} />

      <div className="h-[55vh] min-h-[320px] shrink-0">
        <MapView
          cameras={nearest}
          userPosition={pos}
          center={center || (pos ? [pos.lat, pos.lng] : null)}
          zoom={13}
          loadingLabel={t("loading")}
          t={t}
        />
      </div>

      <div className="mx-auto w-full max-w-xl flex-1 px-4 py-4">
        {status === "loading" && (
          <p className="py-8 text-center text-sm text-muted-foreground">{t("gettingLocation")}</p>
        )}

        {(status === "denied" || status === "unavailable") && (
          <EmptyState
            icon={ShieldAlert}
            title={t("locationDenied")}
            action={
              <button
                onClick={locate}
                className="mt-1 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                {t("retry")}
              </button>
            }
          />
        )}

        {status === "granted" && (
          <>
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-foreground">
              <LocateFixed className="h-5 w-5 text-primary" aria-hidden="true" />
              {t("nearestCameras")}
            </h2>
            <div className="grid gap-3">
              {nearest.map((c: any) => (
                <CameraCard
                  key={c.id}
                  camera={c}
                  onShowOnMap={() => {
                    setCenter([c.lat, c.lng]);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
