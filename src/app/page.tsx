import Link from "next/link";
import { ArrowRight, BookMarked, PenLine } from "lucide-react";

import { AiPreviewPanel } from "@/components/ai-preview-panel";
import { FeaturedShelf } from "@/components/featured-shelf";
import { HowItWorks } from "@/components/how-it-works";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-3xl">
            <Badge className="mb-6 rounded-full bg-accent text-accent-foreground">
              Premium digital library for modern authors
            </Badge>
            <h1 className="text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
              Write serial stories that feel like beautiful books.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              StoryVerse brings drafting, book-style publishing, reader notes,
              and future AI-enhanced editing into one warm, editorial home for
              storytellers.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
                <Link href="/books">
                  Explore Stories
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 rounded-full border-border/80 bg-card/70 px-6 text-base shadow-sm"
              >
                <Link href="/studio/editor">
                  Start Writing
                  <PenLine className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3 text-sm">
              <div className="rounded-xl border border-border/70 bg-card/65 p-3">
                <p className="font-semibold text-foreground">Draft</p>
                <p className="mt-1 text-muted-foreground">privately</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/65 p-3">
                <p className="font-semibold text-foreground">Publish</p>
                <p className="mt-1 text-muted-foreground">as books</p>
              </div>
              <div className="rounded-xl border border-border/70 bg-card/65 p-3">
                <p className="font-semibold text-foreground">Review</p>
                <p className="mt-1 text-muted-foreground">reader notes</p>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mr-0">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-accent/20 blur-3xl" />
            <div className="relative rounded-[2rem] border border-border/80 bg-card/80 p-5 shadow-[0_30px_90px_oklch(0.205_0.023_52.2_/_0.14)] backdrop-blur">
              <div className="rounded-[1.5rem] bg-library p-6 text-library-foreground">
                <div className="flex items-center justify-between border-b border-white/15 pb-5">
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-white/60">
                      Writing desk
                    </p>
                    <h2 className="mt-2 text-2xl font-semibold">Chapter 07</h2>
                  </div>
                  <BookMarked className="size-7 text-gold" aria-hidden="true" />
                </div>
                <div className="space-y-4 py-7 text-sm leading-7 text-white/75">
                  <p>
                    Paste a chapter, shape the details, and keep it private until
                    the story is ready for readers.
                  </p>
                  <p>
                    When it is published, every chapter becomes part of a polished
                    reading surface.
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/75">
                  <span className="font-medium text-white">Reader note:</span>{" "}
                  This scene stayed with me. I would love to read the next chapter.
                </div>
              </div>
            </div>
          </div>
        </section>

        <FeaturedShelf />
        <HowItWorks />
        <AiPreviewPanel />

        <section id="write" className="mx-auto w-full max-w-6xl px-5 pb-20 pt-8 sm:px-8">
          <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-library p-6 text-library-foreground shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.14)] sm:p-8 md:p-10">
            <div className="max-w-3xl">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                Start the next shelf
              </p>
              <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-4xl">
                Build a story world readers can return to chapter after chapter.
              </h2>
              <p className="mt-4 text-base leading-7 text-white/70">
                The author workspace is ready for private drafts, chapter organization,
                public publishing, and reader notes when the first real story is ready.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-11 rounded-full bg-gold px-5 text-primary hover:bg-gold/90">
                <Link href="/books">Explore Stories</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="h-11 rounded-full border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/studio/editor">Start Writing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
