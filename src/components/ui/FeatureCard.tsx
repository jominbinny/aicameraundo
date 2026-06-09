import { Link } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  to: string;
  icon: LucideIcon | React.ComponentType<any>;
  label: string;
  desc?: string;
  iconBgColor?: string;
}

export default function FeatureCard({
  to,
  icon: Icon,
  label,
  desc,
  iconBgColor = "bg-primary/10 text-primary",
}: FeatureCardProps) {
  return (
    <Link
      to={to}
      className="group flex items-center gap-4 rounded-2xl border border-border/40 bg-card p-4.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)] transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-primary/25 hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
    >
      <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-105 ${iconBgColor}`}>
        <Icon className="h-5.5 w-5.5" aria-hidden="true" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-bold text-foreground group-hover:text-primary transition-colors text-sm sm:text-base leading-snug">
          {label}
        </p>
        {desc && <p className="truncate text-xs text-muted-foreground mt-0.5">{desc}</p>}
      </div>
    </Link>
  );
}
