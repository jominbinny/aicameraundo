import { r as reactExports } from "../_libs/react.mjs";
function useGeolocation() {
  const [position, setPosition] = reactExports.useState(null);
  const [status, setStatus] = reactExports.useState("idle");
  const [error, setError] = reactExports.useState(null);
  const locate = reactExports.useCallback(() => {
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
      { enableHighAccuracy: true, timeout: 12e3, maximumAge: 3e4 }
    );
  }, []);
  return { position, status, error, locate };
}
export {
  useGeolocation as u
};
