import { useLanguage } from "@/hooks/useLanguage";

interface RoadSign {
  id: string;
  category: "mandatory" | "warning" | "informatory" | string;
  title_en: string;
  title_ml: string;
  meaning_en: string;
  meaning_ml: string;
  svgType: string;
}

interface RoadSignCardProps {
  sign: RoadSign;
}

function RenderSignGraphic({ type }: { type: string }) {
  switch (type) {
    // === MANDATORY SIGNS (Red outline or solid circle, white/black symbols) ===
    case "stop":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {/* Red Octagon */}
          <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
          <polygon points="32,8 68,8 92,32 92,68 68,92 32,92 8,68 8,32" fill="none" stroke="#ffffff" strokeWidth="2.5" />
          <text x="50" y="58" fill="#ffffff" fontSize="22" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            STOP
          </text>
        </svg>
      );
    case "no_entry":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="#dc2626" stroke="#ffffff" strokeWidth="3" />
          <rect x="15" y="42" width="70" height="16" fill="#ffffff" rx="2" />
        </svg>
      );
    case "speed_50":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="8" />
          <text x="50" y="62" fill="#000000" fontSize="36" fontWeight="800" textAnchor="middle" fontFamily="sans-serif">
            50
          </text>
        </svg>
      );
    case "no_overtaking":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="7" />
          {/* Left car (Black) */}
          <rect x="24" y="48" width="18" height="20" rx="4" fill="#000000" />
          <rect x="29" y="38" width="8" height="10" rx="2" fill="#000000" />
          <circle cx="28.5" cy="48" r="2" fill="#ffffff" />
          <circle cx="37.5" cy="48" r="2" fill="#ffffff" />
          {/* Right car (Red) */}
          <rect x="58" y="48" width="18" height="20" rx="4" fill="#dc2626" />
          <rect x="63" y="38" width="8" height="10" rx="2" fill="#dc2626" />
          <circle cx="62.5" cy="48" r="2" fill="#ffffff" />
          <circle cx="71.5" cy="48" r="2" fill="#ffffff" />
          {/* Diagonal Strike */}
          <line x1="18" y1="18" x2="82" y2="82" stroke="#dc2626" strokeWidth="7" />
        </svg>
      );
    case "one_way":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="7" />
          {/* Arrow pointing up */}
          <line x1="50" y1="75" x2="50" y2="28" stroke="#000000" strokeWidth="8" strokeLinecap="round" />
          <polygon points="50,15 38,32 62,32" fill="#000000" />
          {/* Strike through arrow */}
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="7" />
        </svg>
      );

    // === WARNING SIGNS (Yellow triangle with thick black borders, black symbols) ===
    case "pedestrian_crossing":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          {/* Yellow Triangle */}
          <polygon points="50,5 95,85 5,85" fill="#eab308" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
          {/* Pedestrian Symbol */}
          <line x1="30" y1="72" x2="70" y2="72" stroke="#000000" strokeWidth="4" /> {/* Ground */}
          <line x1="38" y1="72" x2="62" y2="72" stroke="#000000" strokeWidth="4" />
          <circle cx="48" cy="38" r="5" fill="#000000" /> {/* Head */}
          <path d="M 48,43 L 46,56 L 38,70 M 46,56 L 56,70" stroke="#000000" strokeWidth="5" strokeLinecap="round" /> {/* Legs */}
          <path d="M 48,43 L 42,50 L 32,48 M 48,43 L 56,48 L 64,44" fill="none" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" /> {/* Torso & Arms */}
        </svg>
      );
    case "school_ahead":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,5 95,85 5,85" fill="#eab308" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
          {/* Children silhouette */}
          <circle cx="40" cy="44" r="4" fill="#000000" />
          <path d="M 40,48 L 40,62 L 35,74 M 40,62 L 45,74" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M 32,54 L 40,48 L 48,58" fill="none" stroke="#000000" strokeWidth="3" />
          
          <circle cx="60" cy="38" r="4.5" fill="#000000" />
          <path d="M 60,42.5 L 60,57 L 55,70 M 60,57 L 65,70" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
          <path d="M 52,48 L 60,42.5 L 68,52" fill="none" stroke="#000000" strokeWidth="3" />
        </svg>
      );
    case "narrow_bridge":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,5 95,85 5,85" fill="#eab308" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
          {/* Road narrowing shape */}
          <path d="M 32,75 L 32,62 C 32,54 44,52 44,46 L 44,28 M 68,75 L 68,62 C 68,54 56,52 56,46 L 56,28" fill="none" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
        </svg>
      );
    case "slippery_road":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,5 95,85 5,85" fill="#eab308" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
          {/* Car tilted */}
          <rect x="36" y="32" width="28" height="15" rx="3" fill="#000000" transform="rotate(-10 50 40)" />
          <circle cx="42" cy="46" r="4" fill="#000000" />
          <circle cx="58" cy="43" r="4" fill="#000000" />
          {/* Squiggly tracks */}
          <path d="M 36,56 Q 42,50 48,56 T 60,50 T 72,56" fill="none" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 28,66 Q 34,60 40,66 T 52,60 T 64,66" fill="none" stroke="#000000" strokeWidth="4.5" strokeLinecap="round" />
        </svg>
      );
    case "roundabout":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <polygon points="50,5 95,85 5,85" fill="#eab308" stroke="#000000" strokeWidth="6" strokeLinejoin="round" />
          {/* Three circular arrows */}
          <path d="M 50,32 A 18,18 0 0,1 66,54" fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 62,60 A 18,18 0 0,1 36,54" fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M 36,46 A 18,18 0 0,1 48,32" fill="none" stroke="#000000" strokeWidth="5.5" strokeLinecap="round" />
          <polygon points="66,54 58,49 71,44" fill="#000000" />
          <polygon points="36,54 41,62 30,62" fill="#000000" />
          <polygon points="48,32 44,24 53,24" fill="#000000" />
        </svg>
      );

    // === INFORMATORY SIGNS (Blue square, white details) ===
    case "hospital":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="5" y="5" width="90" height="90" rx="12" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          <rect x="15" y="15" width="70" height="70" fill="#ffffff" rx="6" />
          {/* Red Cross */}
          <rect x="44" y="24" width="12" height="32" fill="#dc2626" />
          <rect x="34" y="34" width="32" height="12" fill="#dc2626" />
          {/* Bed outline */}
          <rect x="25" y="64" width="50" height="6" fill="#000000" />
          <rect x="25" y="54" width="6" height="16" fill="#000000" />
          <rect x="69" y="58" width="6" height="12" fill="#000000" />
          <circle cx="38" cy="58" r="4.5" fill="#000000" />
        </svg>
      );
    case "parking_cars":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="5" y="5" width="90" height="90" rx="12" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          {/* Letter P */}
          <text x="50" y="66" fill="#ffffff" fontSize="56" fontWeight="900" textAnchor="middle" fontFamily="sans-serif">
            P
          </text>
        </svg>
      );
    case "telephone":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="5" y="5" width="90" height="90" rx="12" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          {/* Telephone receiver */}
          <path d="M 30,35 C 30,30 38,26 48,32 C 54,36 50,44 44,44 C 44,52 52,60 60,60 C 60,54 68,50 72,56 C 78,66 74,74 69,74 C 45,74 30,59 30,35 Z" fill="#ffffff" />
        </svg>
      );
    case "petrol_pump":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="5" y="5" width="90" height="90" rx="12" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          <rect x="18" y="18" width="64" height="64" fill="#ffffff" rx="4" />
          {/* Petrol Dispenser Symbol */}
          <rect x="35" y="32" width="22" height="36" fill="#2563eb" rx="2" />
          <rect x="39" y="36" width="14" height="12" fill="#ffffff" />
          {/* Hose */}
          <path d="M 57,42 C 65,42 67,52 64,58 L 64,66 C 64,68 62,68 62,66" fill="none" stroke="#2563eb" strokeWidth="3.5" />
          <rect x="62" y="36" width="4" height="8" fill="#2563eb" />
        </svg>
      );
    case "eating_place":
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <rect x="5" y="5" width="90" height="90" rx="12" fill="#2563eb" stroke="#ffffff" strokeWidth="3" />
          {/* Fork and Spoon */}
          {/* Fork */}
          <path d="M 34,25 L 34,44 L 40,44 L 40,75" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <line x1="28" y1="25" x2="28" y2="44" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="40" y1="25" x2="40" y2="44" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" />
          <path d="M 28,44 C 28,51 40,51 40,44" fill="none" stroke="#ffffff" strokeWidth="4.5" />
          {/* Spoon */}
          <path d="M 64,25 C 56,25 56,44 64,44 L 64,75" stroke="#ffffff" strokeWidth="4.5" strokeLinecap="round" fill="none" />
          <path d="M 58,32 C 58,22 70,22 70,32 C 70,42 58,42 58,32" fill="#ffffff" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <circle cx="50" cy="50" r="45" fill="#e2e8f0" stroke="#94a3b8" strokeWidth="3" />
          <text x="50" y="58" fill="#64748b" fontSize="24" fontWeight="bold" textAnchor="middle">
            ?
          </text>
        </svg>
      );
  }
}

export default function RoadSignCard({ sign }: RoadSignCardProps) {
  const { lang, t } = useLanguage();

  const title = lang === "ml" ? sign.title_ml : sign.title_en;
  const meaning = lang === "ml" ? sign.meaning_ml : sign.meaning_en;

  const categoryLabels: Record<string, string> = {
    mandatory: t("mandatory"),
    warning: t("warning"),
    informatory: t("informatory"),
  };

  const getCategoryColor = (cat: string) => {
    switch (cat) {
      case "mandatory":
        return "bg-red-500/10 text-red-600 dark:text-red-400";
      case "warning":
        return "bg-amber-500/10 text-amber-600 dark:text-amber-400";
      case "informatory":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <article className="group flex flex-col gap-4.5 rounded-2xl border border-border/40 bg-card p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1.5 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] hover:border-primary/25">
      {/* Sign Visual Container */}
      <div className="flex h-32 w-full items-center justify-center rounded-xl bg-secondary/50 dark:bg-muted/10 p-4 transition-colors group-hover:bg-primary/5">
        <div className="h-24 w-24 transition-transform duration-300 group-hover:scale-105">
          <RenderSignGraphic type={sign.svgType} />
        </div>
      </div>

      {/* Text Details */}
      <div className="flex-1 space-y-2">
        <div className="flex items-center">
          <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getCategoryColor(sign.category)}`}>
            {categoryLabels[sign.category] || sign.category}
          </span>
        </div>

        <h3 className="font-extrabold text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
          {title}
        </h3>

        <div className="space-y-1 text-xs border-t border-border/40 pt-2.5">
          <p className="text-muted-foreground leading-relaxed text-[11px]">
            <strong className="text-[9px] uppercase tracking-wide text-foreground block mb-0.5 font-bold">
              {lang === "ml" ? t("malayalamMeaning") : t("englishMeaning")}
            </strong>
            {meaning}
          </p>
        </div>
      </div>
    </article>
  );
}
