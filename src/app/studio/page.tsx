import Link from "next/link";
import { ArrowRight, BookOpenCheck, LogOut, PenLine, Sparkles } from "lucide-react";

import { RecentNotes } from "@/components/recent-notes";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { StudioStats } from "@/components/studio-stats";
import { StudioStoryCard } from "@/components/studio-story-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { logoutAuthor } from "@/app/studio/actions";
import { getStudioDashboard } from "@/lib/data/studio";
import { requireAuthor } from "@/lib/auth";

export const metadata = {
  title: "Studio | StoryVerse",
  description:
    "A private author workspace for drafting, organizing, and preparing StoryVerse stories.",
};

export default async function StudioPage() {
  const author = await requireAuthor("/studio");
  const dashboard = await getStudioDashboard(author.id);
  const continueStory =
    dashboard.stories.find((story) => story.status === "Draft") ?? dashboard.stories[0];

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-5 py-12 sm:px-8 sm:py-16">
          <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <Badge className="rounded-full bg-accent text-accent-foreground">
                Author workspace
              </Badge>
              <h1 className="mt-5 max-w-4xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl">
                Shape drafts into book-style worlds.
              </h1>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
                Organize chapters, monitor reader signals, and prepare stories for publishing in a focused private Studio.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 lg:justify-end">
              <form action={logoutAuthor}>
                <Button
                  type="submit"
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-full bg-background/70 px-5 text-base"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                  Sign Out
                </Button>
              </form>
              <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
                <Link href="/studio/editor">
                  Create New Story
                  <PenLine className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="mt-10">
            <StudioStats stats={dashboard.stats} />
          </div>
        </section>

        <section className="mx-auto grid w-full max-w-6xl gap-6 px-5 pb-16 sm:px-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-6">
            {continueStory ? (
              <div className="rounded-[1.5rem] border border-border/80 bg-library p-6 text-library-foreground shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.14)]">
                <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                      Continue writing
                    </p>
                    <h2 className="mt-3 text-3xl font-semibold">{continueStory.title}</h2>
                    <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                      {continueStory.note} Pick up from{" "}
                      {continueStory.chapterLabel.toLowerCase()} and preview the chapter as a
                      finished reading surface.
                    </p>
                  </div>
                  <Button asChild className="h-11 rounded-full bg-gold px-5 text-primary hover:bg-gold/90">
                    <Link href="/studio/editor">
                      Resume Draft
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </Button>
                </div>
              </div>
            ) : null}

            <div>
              <SectionHeading
                eyebrow="Story pipeline"
                title="Status across the shelf"
                description="Drafts stay private, published stories appear in the public library, and review items remain visible to the author."
                className="mx-0 mb-6 max-w-2xl text-left"
              />
              {dashboard.stories.length ? (
                <div className="grid gap-4 md:grid-cols-3">
                  {dashboard.stories.map((story) => (
                    <StudioStoryCard key={story.id} story={story} />
                  ))}
                </div>
              ) : (
                <div className="rounded-xl border border-border/75 bg-card/85 p-5 text-sm leading-6 text-muted-foreground shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)]">
                  No stories yet. Create a first draft to start the author shelf.
                </div>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <RecentNotes notes={dashboard.notes} />
            <div id="ai" className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)]">
              <div className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                <Sparkles className="size-5" aria-hidden="true" />
              </div>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Studio tools
              </p>
              <h2 className="mt-2 text-2xl font-semibold text-foreground">Coming soon to Studio</h2>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                Future passes can support continuity checks, chapter summaries, line edits, and reader-facing blurbs.
              </p>
              <div className="mt-5 rounded-2xl bg-background/70 p-4 text-sm text-muted-foreground">
                <span className="font-medium text-foreground">Next milestone:</span>{" "}
                richer draft management after the author workflow is stable.
              </div>
            </div>
          </aside>
        </section>

        <section className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <div className="grid gap-4 rounded-[1.5rem] border border-border/80 bg-card/80 p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <BookOpenCheck className="size-5" aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-semibold text-foreground">Book preview workflow</h2>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Draft in Studio, review the live package, then move readers into the polished library and reader pages.
              </p>
            </div>
            <Button asChild variant="outline" className="rounded-full bg-background/70">
              <Link href="/books">View Library</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
