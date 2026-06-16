import Link from "next/link";
import { BookOpen, MessageCircle, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SampleStory, StoryTone } from "@/lib/sample-stories";
import { cn } from "@/lib/utils";

type BookCardProps = {
  story: SampleStory;
  variant?: "featured" | "discovery";
};

const toneClasses: Record<StoryTone, string> = {
  terracotta: "from-terracotta to-primary",
  gold: "from-gold to-terracotta",
  library: "from-library to-primary",
  olive: "from-chart-3 to-primary",
  rose: "from-accent to-terracotta",
  ink: "from-primary to-library",
};

export function BookCard({ story, variant = "featured" }: BookCardProps) {
  const isDiscovery = variant === "discovery";

  return (
    <Card
      id={story.slug}
      className="h-full scroll-mt-24 border-border/80 bg-card/90 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.08)] transition-transform duration-300 hover:-translate-y-1"
    >
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "relative shrink-0 overflow-hidden rounded-md bg-linear-to-br shadow-lg",
              isDiscovery ? "h-40 w-28" : "h-36 w-24",
              toneClasses[story.tone]
            )}
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 left-0 w-4 bg-black/15" />
            <div className="absolute inset-x-4 top-5 h-px bg-white/35" />
            <div className="absolute inset-x-6 top-8 h-px bg-white/25" />
            <div className="absolute inset-x-5 bottom-5 h-12 rounded-sm border border-white/35" />
          </div>
          <Badge variant="secondary" className="rounded-full border border-border/70 bg-secondary/80 text-secondary-foreground">
            {story.genre}
          </Badge>
        </div>
        <div>
          <CardTitle className="text-xl font-semibold leading-snug text-foreground">
            {story.title}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">by {story.author}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{story.description}</p>
      </CardContent>
      <CardFooter
        className={cn(
          "mt-auto gap-3 border-t border-border/70 text-xs text-muted-foreground",
          isDiscovery ? "flex-col items-stretch" : "justify-between"
        )}
      >
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" aria-hidden="true" />
            {story.chapterCount} chapters
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="size-3.5" aria-hidden="true" />
            {story.readerNotes} notes
          </span>
          <span className="inline-flex items-center gap-1.5 text-terracotta">
            <Sparkles className="size-3.5" aria-hidden="true" />
            {story.status}
          </span>
        </div>
        {isDiscovery ? (
          <Button asChild className="h-10 rounded-full">
            <Link href={`/books#${story.slug}`}>Read</Link>
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
