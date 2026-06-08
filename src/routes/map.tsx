import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, useCallback } from "react";
import { LocateFixed, X } from "lucide-react";
import PageHeader from "@/components/PageHeader";
import SearchBar from "@/components/SearchBar";
import MapView from "@/components/map/MapView";
import { useLanguage } from "@/hooks/useLanguage";
import { useGeolocation } from "@/hooks/useGeolocation";
import { searchCameras, getDistricts } from "@/services/cameraService";

export const Route = createFileRoute("/map")({
  head: () => ({
    meta: [
      { title: "Map — SafeDrive Kerala" },
      {
        name: "description",
        content: "Browse all Kerala MVD AI traffic cameras on an interactive clustered map.",
      },
    ],
    links: [{ rel: "canonical", href: "/map" }],
  }),
  component: MapPage,
});

function MapPage() {
  const { t } = useLanguage();
  const [query, setQuery] = useState("");
  const [district, setDistrict] = useState("all");
  const [center, setCenter] = useState<any>(null);
  const [zoom, setZoom] = useState(8);
  const [selected, setSelected] = useState<any>(null);
  const { position, locate } = useGeolocation();
  const districts = useMemo(() => getDistricts(), []);

  const cameras = useMemo(() => searchCameras(query, district), [query, district]);

  const handleViewDetails = useCallback((camera: any) => {
    setSelected(camera);
    setCenter([camera.lat, camera.lng]);
    setZoom(15);
  }, []);

  const handleLocate = useCallback(() => {
    locate();
  }, [locate]);

  const pos: any = position;
  const effectiveCenter = pos && !center ? [pos.lat, pos.lng] : center;

  return (
    <div className="flex h-[calc(100vh-4rem)] flex-col">
      <PageHeader subtitle={t("map")} />
      <div className="border-b border-border bg-card px-4 py-3">
        <SearchBar
          query={query}
          onQueryChange={setQuery}
          district={district}
          onDistrictChange={setDistrict}
          districts={districts}
        />
        <p className="mt-2 text-xs text-muted-foreground">
          {cameras.length} {t("totalCameras")}
        </p>
      </div>

      <div className="relative flex-1">
        <MapView
          cameras={cameras}
          userPosition={position}
          center={effectiveCenter}
          zoom={zoom}
          onViewDetails={handleViewDetails}
          loadingLabel={t("loading")}
          t={t}
        />

        {/* Locate me */}
        <button
          onClick={handleLocate}
          aria-label={t("locateMe")}
          className="absolute bottom-4 right-4 z-[500] flex h-12 w-12 items-center justify-center rounded-full bg-card text-primary shadow-lg ring-1 ring-border transition-transform hover:scale-105"
        >
          <LocateFixed className="h-5 w-5" aria-hidden="true" />
        </button>

        {/* Selected camera detail card */}
        {selected && (
          <div className="absolute inset-x-3 bottom-3 z-[500] animate-slide-up rounded-2xl border border-border bg-card p-4 shadow-xl">
            <button
              onClick={() => setSelected(null)}
              aria-label="Close"
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
            >
              <X className="h-4 w-4" />
            </button>
            <h3 className="pr-6 font-semibold text-foreground">{selected.name || "AI Camera"}</h3>
            <p className="text-sm text-muted-foreground">
              {t("district")}: {selected.district || "-"}
            </p>
            <p className="text-xs text-muted-foreground">
              {t("coordinates")}: {selected.lat.toFixed(5)}, {selected.lng.toFixed(5)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">{selected.uniqueId}</p>
          </div>
        )}
      </div>
    </div>
  );
}
