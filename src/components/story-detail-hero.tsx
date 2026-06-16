import Link from "next/link";
import { ArrowLeft, BookOpen, MessageCircle, Sparkles } from "lucide-react";

import { StoryCover } from "@/components/story-cover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { SampleStory } from "@/lib/sample-stories";

type StoryDetailHeroProps = {
  story: SampleStory;
};

export function StoryDetailHero({ story }: StoryDetailHeroProps) {
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
      <div className="mx-auto w-full max-w-80 lg:mx-0">
        <StoryCover
          theme={story.cover.theme}
          title={story.title}
          author={story.author}
          accent={story.cover.accent}
          className="mx-auto"
        />
      </div>
      <div>
        <Button
          asChild
          variant="ghost"
          className="mb-6 w-fit rounded-full px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
        >
          <Link href="/books">
            <ArrowLeft className="size-4" aria-hidden="true" />
            Back to Library
          </Link>
        </Button>
        <div className="flex flex-wrap items-center gap-2">
          <Badge className="rounded-full bg-accent text-accent-foreground">{story.genre}</Badge>
          <Badge variant="outline" className="rounded-full bg-card/70">
            {story.status}
          </Badge>
        </div>
        <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl">
          {story.title}
        </h1>
        <p className="mt-3 text-base text-muted-foreground">by {story.author}</p>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          {story.description}
        </p>
        <div className="mt-8 grid gap-3 text-sm sm:grid-cols-3">
          <div className="rounded-xl border border-border/70 bg-card/70 p-4">
            <BookOpen className="size-4 text-terracotta" aria-hidden="true" />
            <p className="mt-3 font-semibold text-foreground">{story.chapterCount} chapters</p>
            <p className="mt-1 text-muted-foreground">{story.chapters.length} ready to preview</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 p-4">
            <MessageCircle className="size-4 text-terracotta" aria-hidden="true" />
            <p className="mt-3 font-semibold text-foreground">{story.readerNotes} reader notes</p>
            <p className="mt-1 text-muted-foreground">Static community preview</p>
          </div>
          <div className="rounded-xl border border-border/70 bg-card/70 p-4">
            <Sparkles className="size-4 text-terracotta" aria-hidden="true" />
            <p className="mt-3 font-semibold text-foreground">{story.cover.accent}</p>
            <p className="mt-1 text-muted-foreground">Cover direction</p>
          </div>
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
            <Link href={`/books/${story.slug}/read`}>Start Reading</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="h-12 rounded-full border-border/80 bg-card/70 px-6 text-base shadow-sm"
          >
            <Link href="#chapters">View Chapters</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
