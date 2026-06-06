// Renders children only after mount (client-side). Prevents SSR errors
// from browser-only libraries like Leaflet.
import { useEffect, useState } from "react";

export default function ClientOnly({ children, fallback = null }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted ? children : fallback;
}
