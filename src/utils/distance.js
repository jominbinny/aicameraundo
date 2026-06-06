// Geo distance utilities (Haversine + point-to-route helpers).
// All reusable, side-effect free functions.

const EARTH_RADIUS_KM = 6371;

const toRad = (deg) => (deg * Math.PI) / 180;

/**
 * Haversine distance between two {lat, lng} points in kilometres.
 */
export function haversineKm(a, b) {
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const lat1 = toRad(a.lat);
  const lat2 = toRad(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;
  return EARTH_RADIUS_KM * 2 * Math.asin(Math.sqrt(h));
}

/**
 * Format a distance in km into a friendly string.
 */
export function formatDistance(km) {
  if (km == null || Number.isNaN(km)) return "-";
  if (km < 1) return `${Math.round(km * 1000)} m`;
  return `${km.toFixed(1)} km`;
}

/**
 * Approximate shortest distance (km) from a point to a polyline.
 * `line` is an array of {lat, lng}. Uses equirectangular projection
 * for point-to-segment distance which is accurate at city scale.
 */
export function distanceToRouteKm(point, line) {
  if (!line || line.length === 0) return Infinity;
  if (line.length === 1) return haversineKm(point, line[0]);

  let min = Infinity;
  for (let i = 0; i < line.length - 1; i++) {
    const d = pointToSegmentKm(point, line[i], line[i + 1]);
    if (d < min) min = d;
  }
  return min;
}

function pointToSegmentKm(p, a, b) {
  // Project to a local planar system (km) around point a.
  const latRef = toRad(a.lat);
  const kx = (Math.PI / 180) * EARTH_RADIUS_KM * Math.cos(latRef);
  const ky = (Math.PI / 180) * EARTH_RADIUS_KM;

  const ax = a.lng * kx;
  const ay = a.lat * ky;
  const bx = b.lng * kx;
  const by = b.lat * ky;
  const px = p.lng * kx;
  const py = p.lat * ky;

  const dx = bx - ax;
  const dy = by - ay;
  const segLenSq = dx * dx + dy * dy;

  let t = segLenSq === 0 ? 0 : ((px - ax) * dx + (py - ay) * dy) / segLenSq;
  t = Math.max(0, Math.min(1, t));

  const cx = ax + t * dx;
  const cy = ay + t * dy;
  return Math.hypot(px - cx, py - cy);
}

/**
 * Sort cameras by distance from origin, returning enriched copies.
 */
export function nearestCameras(origin, cameras, limit = 10) {
  return cameras
    .map((c) => ({ ...c, distanceKm: haversineKm(origin, c) }))
    .sort((a, b) => a.distanceKm - b.distanceKm)
    .slice(0, limit);
}
