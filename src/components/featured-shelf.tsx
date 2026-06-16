import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { getFeaturedStories } from "@/lib/data/stories";

export async function FeaturedShelf() {
  const featuredStories = await getFeaturedStories();

  return (
    <section id="stories" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Featured shelf"
          title="Book-style discovery for every unfolding world"
          description="Collectible story cards give readers a polished way to browse serial fiction, complete books, and works in progress."
          className="mx-0 text-left"
        />
        <Button
          asChild
          variant="outline"
          className="w-fit rounded-full border-border/80 bg-card/70 px-5 shadow-sm"
        >
          <Link href="/books">
            Browse library
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
      {featuredStories.length ? (
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {featuredStories.map((story) => (
            <BookCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-[1.5rem] border border-border/80 bg-card/80 p-6 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)] sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            The shelf is waiting
          </p>
          <h3 className="mt-3 text-2xl font-semibold text-foreground">
            The shelf is waiting for its first story.
          </h3>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground">
            Published books will appear here after the author creates a story in Studio and moves it from draft to public.
          </p>
          <Button asChild className="mt-5 rounded-full px-5">
            <Link href="/studio">Start in Studio</Link>
          </Button>
        </div>
      )}
    </section>
  );
}
