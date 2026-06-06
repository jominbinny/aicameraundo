// Geocoding + routing via OpenStreetMap (Nominatim) and OSRM public APIs.
// No API key required. Used by the Route Checker page.

const NOMINATIM = "https://nominatim.openstreetmap.org/search";
const OSRM = "https://router.project-osrm.org/route/v1/driving";

/**
 * Geocode a free-text place to {lat, lng, label}. Biased to Kerala, India.
 */
export async function geocode(query) {
  const url = `${NOMINATIM}?q=${encodeURIComponent(
    query + ", Kerala, India",
  )}&format=json&limit=1`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) throw new Error("Geocoding failed");
  const data = await res.json();
  if (!data.length) throw new Error("Location not found");
  return {
    lat: parseFloat(data[0].lat),
    lng: parseFloat(data[0].lon),
    label: data[0].display_name,
  };
}

/**
 * Return up to `limit` place suggestions for autocomplete.
 * Each item: { lat, lng, label, short }. Biased to Kerala, India.
 */
export async function suggestPlaces(query, limit = 5) {
  const q = query.trim();
  if (q.length < 3) return [];
  const url = `${NOMINATIM}?q=${encodeURIComponent(
    q + ", Kerala, India",
  )}&format=json&addressdetails=1&limit=${limit}`;
  const res = await fetch(url, { headers: { Accept: "application/json" } });
  if (!res.ok) return [];
  const data = await res.json();
  return data.map((d) => ({
    lat: parseFloat(d.lat),
    lng: parseFloat(d.lon),
    label: d.display_name,
    short: d.display_name.split(",").slice(0, 2).join(",").trim(),
  }));
}

/**
 * Fetch a driving route between two {lat,lng} points.
 * Returns { distanceKm, durationMin, line:[{lat,lng}] }.
 */
export async function getRoute(start, end) {
  const url = `${OSRM}/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Routing failed");
  const data = await res.json();
  if (!data.routes || !data.routes.length) throw new Error("No route found");
  const route = data.routes[0];
  const line = route.geometry.coordinates.map(([lng, lat]) => ({ lat, lng }));
  return {
    distanceKm: route.distance / 1000,
    durationMin: route.duration / 60,
    line,
  };
}
