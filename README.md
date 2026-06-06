# 📸 AI Camera Undo

[![React](https://img.shields.io/badge/React-19-blue.svg?logo=react)](https://react.dev/)
[![TanStack Start](https://img.shields.io/badge/TanStack-Start-ff5a1a.svg?logo=react)](https://tanstack.com/router/latest/docs/start/overview)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4.svg?logo=tailwindcss)](https://tailwindcss.com/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green.svg?logo=leaflet)](https://leafletjs.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

**AI Camera Undo** is a high-performance, responsive web application designed to help drivers navigate Kerala's roads safely by locating Motor Vehicle Department (MVD) AI traffic safety cameras. Powered by **TanStack Start**, **React Leaflet**, and public geocoding/routing APIs, it provides real-time route analysis, proximity checking, and traffic fine estimation with multi-language support.

---

## ✨ Features

- **🗺️ Interactive Clustered Map**: Seamlessly browse hundreds of MVD AI cameras across Kerala's 14 districts. Powered by Leaflet with marker clustering for fast rendering.
- **🛣️ Route Camera Checker**: Plan your trip from Start to Destination. The app will calculate the exact route using OSRM and flag all AI cameras within a **1.5 km buffer zone** along the path.
- **📍 Near Me Proximity Alert**: Utilizes your browser's Geolocation API to instantly list and visualize the 10 closest traffic cameras to your current coordinates.
- **🧾 Fine Calculator**: Check expected traffic fines, legal references (Motor Vehicle Act), and explanations for common violations like:
  - Riding without a helmet (₹1,000)
  - Not wearing a seatbelt (₹1,000)
  - Mobile phone usage while driving (₹5,000)
  - Triple riding on two-wheelers (₹1,000)
- **🌐 Bilingual Support (i18n)**: Seamless instant toggle between English and Malayalam (മലയാളം).
- **📱 PWA & Mobile-First Design**: Optimized for a premium native app feel with smooth micro-animations, modern HSL-tailored colors, and glassmorphic UI elements.

---

## 🛠️ Technology Stack

- **Framework**: [TanStack Start](https://tanstack.com/router/latest/docs/start/overview) (React 19 + TanStack Router with Server-Side Rendering)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) for modern styling and layout controls
- **Map Library**: [React Leaflet](https://react-leaflet.js.org/) & [Leaflet.markercluster](https://github.com/Leaflet/Leaflet.markercluster)
- **Routing & Geocoding**:
  - [OpenStreetMap Nominatim API](https://nominatim.org/) for free-text address search and autocomplete (biased to Kerala, India)
  - [OSRM (Open Source Routing Machine) API](http://project-osrm.org/) for calculating driving routes
- **Icons**: [Lucide React](https://lucide.dev/)
- **Build Tool / Runtime**: [Vite](https://vite.dev/) & [Bun](https://bun.sh/)

---

## 📁 Directory Structure

```
aicameraundo/
├── src/
│   ├── assets/             # Images, logos, and static assets
│   ├── components/         # Reusable React components (BottomNav, SearchBar, PlaceAutocomplete)
│   │   ├── map/            # Map wrapper and Leaflet configurations
│   │   └── ui/             # Shadcn-like reusable UI component library
│   ├── data/
│   │   └── cameras.json    # Complete database of Kerala MVD AI cameras (coordinates, districts)
│   ├── hooks/              # Custom React hooks (useGeolocation, useLanguage)
│   ├── i18n/
│   │   └── translations.json # English and Malayalam translation mappings
│   ├── lib/                # Error handling and utility integrations
│   ├── routes/             # TanStack Router file-based pages (index, map, near-me, fine-calculator, route-checker)
│   ├── services/           # API integration services (camera lookup, route generation, geocoding)
│   ├── utils/              # Math utilities (Haversine formula, point-to-route distance calculation)
│   ├── styles.css          # Tailwind configurations and global styles
│   └── start.ts / server.ts # Entry points for TanStack Start SSR
├── bun.lock                # Bun lockfile
├── components.json         # Shadcn configurations
└── package.json            # Scripts & project dependencies
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Bun](https://bun.sh/) (or Node.js & npm/pnpm/yarn) installed on your system. Bun is recommended for faster installs and execution.

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/jominbinny/aicameraundo.git
   cd aicameraundo
   ```

2. **Install dependencies:**
   ```bash
   bun install
   ```

3. **Run the development server:**
   ```bash
   bun run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Building for Production

To build the project for production with optimization:

```bash
bun run build
```

To preview the production build locally:

```bash
bun run preview
```

---

## 🧭 How Route Proximity Checking Works

The app uses the **Haversine Formula** combined with a **Planar Equirectangular Projection** to calculate the distance between any given camera and the route's line segments:

$$\text{distance} = \text{Earth Radius} \times 2 \times \arcsin\left(\sqrt{\sin^2\left(\frac{\Delta\text{lat}}{2}\right) + \cos(\text{lat}_1)\cos(\text{lat}_2)\sin^2\left(\frac{\Delta\text{lng}}{2}\right)}\right)$$

For routes, it segments the route path line into coordinates, projects the cameras onto the closest segment, and checks if they fall within the `1.5 km` threshold. This is calculated entirely on the client, ensuring super-fast feedback without heavy server loads.

---

## 🤝 Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.