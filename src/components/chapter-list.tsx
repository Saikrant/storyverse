import Link from "next/link";
import { ArrowRight, Clock } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { SampleStory } from "@/lib/sample-stories";

type ChapterListProps = {
  story: SampleStory;
};

export function ChapterList({ story }: ChapterListProps) {
  return (
    <section id="chapters" className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
      <div className="rounded-[2rem] border border-border/80 bg-card/80 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)] sm:p-8">
        <div className="flex flex-col gap-3 border-b border-border/70 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Table of contents
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Begin with a chapter</h2>
          </div>
          <p className="text-sm text-muted-foreground">
            Showing {story.chapters.length} published chapters from this {story.chapterCount}-chapter story.
          </p>
        </div>
        <div className="divide-y divide-border/70">
          {story.chapters.map((chapter) => (
            <article
              key={chapter.id}
              className="grid gap-4 py-5 md:grid-cols-[auto_1fr_auto] md:items-center"
            >
              <div className="flex size-12 items-center justify-center rounded-full bg-secondary font-semibold text-secondary-foreground">
                {chapter.chapterNumber}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-foreground">{chapter.title}</h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted-foreground">
                  {chapter.content.split("\n\n")[0]}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted-foreground">
                  <Clock className="size-3.5" aria-hidden="true" />
                  {chapter.estimatedReadTime}
                </p>
              </div>
              <Button asChild variant="outline" className="rounded-full bg-background/70">
                <Link href={`/books/${story.slug}/read`}>
                  Read
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
