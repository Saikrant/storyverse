import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { Button } from "@/components/ui/button";
import { featuredStories } from "@/lib/sample-stories";

export function FeaturedShelf() {
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
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {featuredStories.map((story) => (
          <BookCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
}
