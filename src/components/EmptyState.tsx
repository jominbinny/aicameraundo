import { SearchX, LucideIcon } from "lucide-react";
import React from "react";

interface EmptyStateProps {
  icon?: LucideIcon | React.ComponentType<any>;
  title: string;
  description?: string | null;
  action?: React.ReactNode;
}

export default function EmptyState({
  icon: Icon = SearchX,
  title,
  description = null,
  action = null,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-border bg-card/50 px-6 py-12 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <p className="font-semibold text-foreground">{title}</p>
      {description && <p className="max-w-xs text-sm text-muted-foreground">{description}</p>}
      {action}
    </div>
  );
}
