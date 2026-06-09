import { LucideIcon } from "lucide-react";
import React from "react";

interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: LucideIcon | React.ComponentType<any>;
  action?: React.ReactNode;
}

export default function SectionHeader({
  title,
  description,
  icon: Icon,
  action,
}: SectionHeaderProps) {
  return (
    <div className="mb-4 flex items-center justify-between border-b border-border pb-2">
      <div className="flex items-start gap-2">
        {Icon && <Icon className="mt-1 h-5 w-5 text-primary shrink-0" aria-hidden="true" />}
        <div>
          <h2 className="text-lg font-bold text-foreground tracking-tight">{title}</h2>
          {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        </div>
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
