// A simple mock for leaflet and react-leaflet on the server side to prevent "window is not defined" crashes.
const dummy = () => null;

export const MapContainer = dummy;
export const TileLayer = dummy;
export const Marker = dummy;
export const Popup = dummy;
export const Polyline = dummy;
export const useMap = () => ({
  addLayer: dummy,
  removeLayer: dummy,
  fitBounds: dummy,
  setView: dummy,
  getZoom: () => 8,
});

const L = {
  divIcon: () => ({}),
  marker: () => ({
    bindPopup: dummy,
  }),
  markerClusterGroup: () => ({
    addLayer: dummy,
    clearLayers: dummy,
  }),
};

export default L;
