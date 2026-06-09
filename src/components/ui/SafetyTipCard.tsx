import { useLanguage } from "@/hooks/useLanguage";
import {
  ShieldAlert,
  Users,
  Lock,
  Eye,
  Sparkles,
  CloudRain,
  RefreshCw,
  Clock,
  ArrowLeftRight,
  BookOpen,
} from "lucide-react";

// Inline helmet icon since Lucide standard doesn't have it direct.
function HelmetIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M2 12h20" />
      <path d="M20 12v6a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-6" />
      <path d="M4 12V8a8 8 0 0 1 16 0v4" />
    </svg>
  );
}

interface SafetyTip {
  id: string;
  category: string;
  title_en: string;
  title_ml: string;
  content_en: string;
  content_ml: string;
  icon: string;
}

interface SafetyTipCardProps {
  tip: SafetyTip;
}

function getIcon(name: string) {
  switch (name) {
    case "Helmet":
      return HelmetIcon;
    case "Users":
      return Users;
    case "ShieldAlert":
      return ShieldAlert;
    case "Lock":
      return Lock;
    case "Eye":
      return Eye;
    case "Sparkles":
      return Sparkles;
    case "CloudRain":
      return CloudRain;
    case "RefreshCw":
      return RefreshCw;
    case "Clock":
      return Clock;
    case "ArrowLeftRight":
      return ArrowLeftRight;
    default:
      return BookOpen;
  }
}

export default function SafetyTipCard({ tip }: SafetyTipCardProps) {
  const { lang } = useLanguage();
  const Icon = getIcon(tip.icon);

  const title = lang === "ml" ? tip.title_ml : tip.title_en;
  const content = lang === "ml" ? tip.content_ml : tip.content_en;

  // Render a nice chip color based on the category
  const getCategoryStyles = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "helmet":
        return "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
      case "seatbelt":
        return "bg-blue-500/10 text-blue-600 dark:text-blue-400";
      case "night driving":
        return "bg-indigo-500/10 text-indigo-600 dark:text-indigo-400";
      case "rain driving":
        return "bg-sky-500/10 text-sky-600 dark:text-sky-400";
      case "highway driving":
        return "bg-rose-500/10 text-rose-600 dark:text-rose-400";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <article className="flex flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${getCategoryStyles(tip.category)}`}>
          {tip.category}
        </span>
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent text-primary">
          <Icon className="h-5 w-5" aria-hidden="true" />
        </div>
      </div>
      <div className="space-y-1.5">
        <h3 className="font-bold text-foreground text-base leading-snug">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">{content}</p>
      </div>
    </article>
  );
}
