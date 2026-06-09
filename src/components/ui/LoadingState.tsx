interface LoadingStateProps {
  type?: "card" | "list" | "page";
  count?: number;
}

export default function LoadingState({ type = "card", count = 3 }: LoadingStateProps) {
  const items = Array.from({ length: count });

  if (type === "page") {
    return (
      <div className="mx-auto w-full max-w-xl space-y-6 p-4 animate-pulse">
        <div className="h-8 w-1/3 rounded bg-muted"></div>
        <div className="h-10 w-full rounded-full bg-muted"></div>
        <div className="space-y-4">
          <div className="h-32 w-full rounded-2xl bg-muted"></div>
          <div className="h-32 w-full rounded-2xl bg-muted"></div>
          <div className="h-32 w-full rounded-2xl bg-muted"></div>
        </div>
      </div>
    );
  }

  if (type === "list") {
    return (
      <div className="space-y-3 animate-pulse">
        {items.map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-2xl border border-border p-3">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-muted"></div>
            <div className="flex-1 space-y-2">
              <div className="h-4 w-2/3 rounded bg-muted"></div>
              <div className="h-3 w-1/2 rounded bg-muted"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: Grid of cards
  return (
    <div className="grid gap-3 sm:grid-cols-2 animate-pulse">
      {items.map((_, i) => (
        <div key={i} className="rounded-2xl border border-border bg-card p-4 space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-5 w-5 rounded bg-muted"></div>
            <div className="h-4 w-1/2 rounded bg-muted"></div>
          </div>
          <div className="h-3 w-full rounded bg-muted"></div>
          <div className="h-3 w-3/4 rounded bg-muted"></div>
        </div>
      ))}
    </div>
  );
}
