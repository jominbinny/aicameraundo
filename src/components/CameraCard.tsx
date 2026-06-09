import { MapPin, Navigation } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import { formatDistance } from "@/utils/distance";

interface CameraCardProps {
  camera: {
    id: number;
    uniqueId?: string;
    name?: string;
    district?: string;
    lat: number;
    lng: number;
    type?: string;
    distanceKm?: number;
  };
  onShowOnMap?: (camera: any) => void;
  action?: React.ReactNode;
}

export default function CameraCard({ camera, onShowOnMap, action }: CameraCardProps) {
  const { t } = useLanguage();

  return (
    <article className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-sm transition-shadow hover:shadow-md">
      <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-primary">
        <MapPin className="h-5 w-5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="truncate font-semibold text-foreground">{camera.name || "AI Camera"}</h3>
        <p className="text-sm text-muted-foreground">
          {t("district")}: {camera.district || "-"}
        </p>
        <p className="text-xs text-muted-foreground">
          {camera.lat.toFixed(4)}, {camera.lng.toFixed(4)}
        </p>
        {camera.distanceKm != null && (
          <p className="mt-1 inline-flex items-center gap-1 text-sm font-medium text-primary">
            <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
            {formatDistance(camera.distanceKm)}
          </p>
        )}
      </div>
      {(onShowOnMap || action) &&
        (action || (
          <button
            onClick={() => onShowOnMap?.(camera)}
            className="shrink-0 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("showOnMap")}
          </button>
        ))}
    </article>
  );
}
