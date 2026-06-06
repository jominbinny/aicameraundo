// Client-only, lazily-loaded wrapper around the Leaflet map.
import { lazy, Suspense } from "react";
import ClientOnly from "@/components/ClientOnly";

const LeafletMap = typeof window !== "undefined"
  ? lazy(() => import("@/components/map/LeafletMap"))
  : () => null;

function MapSkeleton({ label }) {
  return (
    <div className="flex h-full w-full items-center justify-center skeleton">
      <span className="text-sm text-muted-foreground">{label || "Loading map…"}</span>
    </div>
  );
}

export default function MapView(props) {
  return (
    <ClientOnly fallback={<MapSkeleton label={props.loadingLabel} />}>
      <Suspense fallback={<MapSkeleton label={props.loadingLabel} />}>
        <LeafletMap {...props} />
      </Suspense>
    </ClientOnly>
  );
}
