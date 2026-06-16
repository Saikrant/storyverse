import type { CoverTheme } from "@/lib/sample-stories";
import { cn } from "@/lib/utils";

type StoryCoverProps = {
  theme: CoverTheme;
  title: string;
  author: string;
  accent: string;
  className?: string;
  compact?: boolean;
};

export const coverThemeClasses: Record<CoverTheme, string> = {
  terracotta: "from-terracotta to-primary",
  gold: "from-gold to-terracotta",
  library: "from-library to-primary",
  olive: "from-chart-3 to-primary",
  rose: "from-accent to-terracotta",
  ink: "from-primary to-library",
};

export function StoryCover({
  theme,
  title,
  author,
  accent,
  className,
  compact = false,
}: StoryCoverProps) {
  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-md bg-linear-to-br text-white shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.18)]",
        compact ? "h-40 w-28 p-4" : "aspect-[2/3] min-h-80 w-full max-w-72 p-6",
        coverThemeClasses[theme],
        className
      )}
    >
      <div className="absolute inset-y-0 left-0 w-[14%] bg-black/18" />
      <div className="absolute inset-4 rounded-sm border border-white/22" />
      <div className="absolute inset-x-8 top-10 h-px bg-white/45" />
      <div className="absolute inset-x-10 top-14 h-px bg-white/30" />
      <div className="relative z-10 flex h-full min-w-0 flex-col justify-between">
        <div className="min-w-0 pl-4">
          <p className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-white/70">
            StoryVerse
          </p>
        </div>
        <div className="min-w-0 space-y-3 pl-4">
          <h3
            className={cn(
              "break-words font-heading font-semibold leading-tight [hyphens:auto] [overflow-wrap:anywhere] [text-wrap:balance]",
              compact ? "line-clamp-4 text-[0.95rem]" : "line-clamp-5 text-3xl"
            )}
          >
            {title}
          </h3>
          {!compact ? (
            <p className="max-w-40 text-xs leading-5 text-white/70">{accent}</p>
          ) : null}
        </div>
        <p className="min-w-0 truncate pl-4 text-xs text-white/75">by {author}</p>
      </div>
    </div>
  );
}
