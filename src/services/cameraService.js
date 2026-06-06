// Camera service layer — single source of truth for reading camera data.
// Data is bundled from a local JSON file (no backend).

import rawCameras from "@/data/cameras.json";

/** @typedef {{id:number,uniqueId:string,name:string,district:string,lat:number,lng:number,type:string}} Camera */

// Normalise once: keep only valid coordinates.
const cameras = rawCameras.filter(
  (c) =>
    typeof c.lat === "number" &&
    typeof c.lng === "number" &&
    !Number.isNaN(c.lat) &&
    !Number.isNaN(c.lng),
);

/** Return all cameras. */
export function getAllCameras() {
  return cameras;
}

/** Total camera count. */
export function getCameraCount() {
  return cameras.length;
}

/** Unique sorted district list. */
export function getDistricts() {
  return Array.from(new Set(cameras.map((c) => c.district).filter(Boolean))).sort();
}

/** Find a single camera by id. */
export function getCameraById(id) {
  return cameras.find((c) => c.id === Number(id));
}

/**
 * Search cameras by name or district (case-insensitive).
 */
export function searchCameras(query, district = "all") {
  const q = (query || "").trim().toLowerCase();
  return cameras.filter((c) => {
    const matchesDistrict = district === "all" || c.district === district;
    if (!matchesDistrict) return false;
    if (!q) return true;
    return (
      (c.name && c.name.toLowerCase().includes(q)) ||
      (c.district && c.district.toLowerCase().includes(q))
    );
  });
}
