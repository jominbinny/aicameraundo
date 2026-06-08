# 📸 SafeDrive Kerala

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TanStack Router](https://img.shields.io/badge/TanStack-Router-ff5a1a.svg?logo=react)](https://tanstack.com/router/latest/docs/framework/react/overview)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green.svg?logo=leaflet)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**SafeDrive Kerala** is a high-performance, responsive web application designed to promote road safety awareness and help drivers navigate Kerala's roads safely. It offers information on Motor Vehicle Department (MVD) traffic safety camera locations, traffic rules, and fine specifications.

> [!WARNING]
> **Unofficial Community Portal**: SafeDrive Kerala is an unofficial, community-driven informational resource. It is **NOT** affiliated with, endorsed by, or associated with the Kerala Motor Vehicles Department (MVD) or any other government organisation. All information is provided for public awareness and educational purposes only. For official guidelines and legally binding rules, please refer to the [Official Kerala MVD website](https://mvd.kerala.gov.in/).

---

## ✨ Features

- **🗺️ Interactive Clustered Map**: Browse MVD AI camera locations across Kerala's 14 districts. Powered by Leaflet with marker clustering for high performance.
- **🛣️ Route Camera Checker**: Plan your trip from Start to Destination. The app calculates the route using OSRM and flags cameras within a **1.5 km buffer zone** along the path.
- **📍 Near Me Proximity Alert**: Utilises your browser's Geolocation API to instantly list and show the 10 closest cameras to your current coordinates.
- **🧾 Fine Calculator**: Check expected traffic fines, legal references (Motor Vehicle Act), and explanations for common violations like helmetless riding, not wearing seatbelts, mobile phone usage, and triple riding. Details are shown inline with an interactive accordion layout.
- **🌐 Bilingual Support (i18n)**: Instant translation toggle between English and Malayalam (മലയാളം).
- **📱 Responsive Mobile-First Design**: Optimized for a premium native app feel with smooth micro-animations, modern HSL-tailored colors, and glassmorphic UI elements.

---

## 🛠️ Technology Stack

- **Framework**: Client-only React SPA powered by [TanStack Router](https://tanstack.com/router/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for modern styling and layout controls
- **Map Library**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
- **Routing & Geocoding**:
  - [OpenStreetMap Nominatim API](https://nominatim.org/) for free-text address search and autocomplete (strictly geocoded to Kerala coordinates via viewbox filters)
  - [OSRM (Open Source Routing Machine) API](http://project-osrm.org/) for calculating driving routes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool / Runtime**: [Vite](https://vite.dev/) & [Node.js / npm](https://nodejs.org/)

---

## 📁 Directory Structure

```
aicameraundo/
├── src/
│   ├── assets/             # Images, logos, and static assets
│   ├── components/         # Reusable React components (BottomNav, SearchBar, PlaceAutocomplete)
│   │   ├── map/            # Map wrapper and Leaflet configurations
│   │   └── ui/             # Reusable UI component library
│   ├── data/
│   │   └── cameras.json    # Database of Kerala MVD AI cameras (coordinates, districts)
│   ├── hooks/              # Custom React hooks (useLanguage, useGeolocation)
│   ├── i18n/
│   │   └── translations.json # English and Malayalam translation mappings
│   ├── lib/                # Shared utilities
│   ├── routes/             # TanStack Router file-based pages (index, map, near-me, fine-calculator, route-checker)
│   ├── services/           # API integration services (camera lookup, route generation, geocoding)
│   ├── utils/              # Math utilities (Haversine formula, point-to-route distance calculation)
│   ├── main.tsx            # App entry point
│   ├── router.tsx          # Router configuration
│   └── styles.css          # Tailwind configurations and global styles
├── index.html              # Entry HTML page
├── components.json         # Component configuration
├── package.json            # Scripts & project dependencies
└── package-lock.json       # Npm lockfile
```

---

## 🚀 Getting Started

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jominbinny/aicameraundo.git
   cd aicameraundo
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the development server:**
   ```bash
   npm run dev
   ```
   Open the address provided by Vite (e.g. `http://localhost:5173`) in your browser to view the application.

### Building for Production

To build the project for production with optimizations (output to `dist/` folder):

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

---

## 🧭 How Route Proximity Checking Works

The app uses the **Haversine Formula** combined with a **Planar Equirectangular Projection** to calculate the distance between any given camera and the route's line segments:

$$\text{distance} = \text{Earth Radius} \times 2 \times \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta\text{lng}}{2}\right)}\right)$$

For routes, it segments the route path line into coordinates, projects the cameras onto the closest segment, and checks if they fall within the `1.5 km` threshold. This is calculated entirely on the client, ensuring super-fast feedback without heavy server loads.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.