// Geolocation hook with graceful permission handling.
import { useState, useCallback } from "react";

export function useGeolocation() {
  const [position, setPosition] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | loading | granted | denied | unavailable
  const [error, setError] = useState(null);

  const locate = useCallback(() => {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setStatus("unavailable");
      return;
    }
    setStatus("loading");
    setError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("granted");
      },
      (err) => {
        setError(err.message);
        setStatus(err.code === err.PERMISSION_DENIED ? "denied" : "unavailable");
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 30000 },
    );
  }, []);

  return { position, status, error, locate };
}
