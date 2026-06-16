import { BarChart3, BookCheck, MessageCircle, WandSparkles } from "lucide-react";

import { studioStats } from "@/lib/studio-sample";

const icons = [BarChart3, BookCheck, MessageCircle, WandSparkles];

export function StudioStats() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {studioStats.map((stat, index) => {
        const Icon = icons[index];

        return (
          <div
            key={stat.label}
            className="rounded-xl border border-border/75 bg-card/80 p-4 shadow-[0_14px_40px_oklch(0.205_0.023_52.2_/_0.05)]"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-semibold text-foreground">{stat.value}</p>
              </div>
              <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Icon className="size-4" aria-hidden="true" />
              </span>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">{stat.detail}</p>
          </div>
        );
      })}
    </div>
  );
}
