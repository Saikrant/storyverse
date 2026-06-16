import { ArrowRight, Clock3 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { StudioStory } from "@/lib/studio-sample";
import { cn } from "@/lib/utils";

type StudioStoryCardProps = {
  story: StudioStory;
};

const statusClasses: Record<StudioStory["status"], string> = {
  Draft: "bg-secondary text-secondary-foreground",
  Published: "bg-primary text-primary-foreground",
  "Needs Review": "bg-accent text-accent-foreground",
};

export function StudioStoryCard({ story }: StudioStoryCardProps) {
  return (
    <article className="rounded-xl border border-border/75 bg-card/85 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <Badge className={cn("rounded-full", statusClasses[story.status])}>{story.status}</Badge>
          <h3 className="mt-4 text-xl font-semibold leading-snug text-foreground">{story.title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{story.genre} • {story.chapterLabel}</p>
        </div>
        <span className="rounded-full border border-border/70 bg-background/65 px-3 py-1 text-xs text-muted-foreground">
          {story.progress}%
        </span>
      </div>
      <div className="mt-5 h-2 overflow-hidden rounded-full bg-muted">
        <div className="h-full rounded-full bg-terracotta" style={{ width: `${story.progress}%` }} />
      </div>
      <p className="mt-4 text-sm leading-6 text-muted-foreground">{story.note}</p>
      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock3 className="size-3.5" aria-hidden="true" />
          {story.updatedAt}
        </p>
        <Button variant="ghost" size="sm" className="rounded-full px-2 text-terracotta">
          Open
          <ArrowRight className="size-4" aria-hidden="true" />
        </Button>
      </div>
    </article>
  );
}
