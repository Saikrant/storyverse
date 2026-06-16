import { Filter, Search } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getPublishedStories } from "@/lib/data/stories";

const genres = ["All", "Fantasy", "Romance", "Science Fiction", "Mystery", "Literary"];

export default async function BooksPage() {
  const stories = await getPublishedStories();

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              eyebrow="Story discovery"
              title="Browse the StoryVerse library"
              description="Explore published books and serial stories presented with the future discovery experience in mind."
              className="mx-0 max-w-3xl text-left"
            />
            <Badge className="w-fit rounded-full bg-accent text-accent-foreground">
              Published stories
            </Badge>
          </div>

          <div className="mt-10 grid gap-4 rounded-2xl border border-border/80 bg-card/75 p-4 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)] md:grid-cols-[1fr_auto] md:items-center">
            <label className="relative block">
              <span className="sr-only">Search stories</span>
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                placeholder="Search by title, author, or keyword"
                className="h-11 rounded-full bg-background/70 pl-10"
              />
            </label>
            <div className="flex flex-wrap gap-2">
              {genres.map((genre) => (
                <Button
                  key={genre}
                  variant={genre === "All" ? "default" : "outline"}
                  size="sm"
                  className="rounded-full"
                >
                  {genre === "All" ? null : (
                    <Filter className="size-3.5" aria-hidden="true" />
                  )}
                  {genre}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <BookCard key={story.id} story={story} variant="discovery" />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
