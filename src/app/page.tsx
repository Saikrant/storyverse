import Link from "next/link";
import { ArrowRight, BookMarked, PenLine, Sparkles } from "lucide-react";

import { BookCard } from "@/components/book-card";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const featuredBooks = [
  {
    title: "The Lantern Archive",
    author: "Mira Vale",
    genre: "Fantasy",
    description:
      "A quiet archivist discovers a wing of living books, each rewriting itself as kingdoms fall asleep.",
    tone: "terracotta" as const,
    chapters: 18,
    comments: 124,
  },
  {
    title: "Letters from Amberfall",
    author: "Theo Maren",
    genre: "Romance",
    description:
      "Two rival columnists trade anonymous letters in a city where every promise is bound in gold ink.",
    tone: "gold" as const,
    chapters: 12,
    comments: 87,
  },
  {
    title: "After the Ninth Moon",
    author: "Sana Rook",
    genre: "Sci-Fi",
    description:
      "A generation ship librarian curates the last myths of Earth while teaching a new world how to dream.",
    tone: "library" as const,
    chapters: 24,
    comments: 203,
  },
];

export default function Home() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:py-24">
          <div className="max-w-3xl">
            <Badge className="mb-6 rounded-full bg-accent text-accent-foreground">
              Premium story publishing for modern authors
            </Badge>
            <h1 className="text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
              Write, publish, and discover stories with a literary soul.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
              StoryVerse is a warm digital library and writing studio for novels,
              chapters, reader comments, and future AI-assisted creative editing.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="h-12 rounded-full px-6 text-base">
                <Link href="#stories">
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
                <Link href="#write">
                  Start Writing
                  <PenLine className="size-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-md lg:mr-0">
            <div className="rounded-[2rem] border border-border/80 bg-card/80 p-5 shadow-[0_30px_90px_oklch(0.205_0.023_52.2_/_0.14)] backdrop-blur">
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
                    The library held its breath as Elian opened the book that no
                    reader had ever finished.
                  </p>
                  <p>
                    In the margin, a stranger had left a question in copper ink:
                    what ending would you choose?
                  </p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4 text-sm text-white/75">
                  <span className="font-medium text-white">Reader note:</span>{" "}
                  The tension here is excellent. Consider giving Elian one more
                  sensory detail before the reveal.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="stories" className="mx-auto w-full max-w-6xl px-5 py-14 sm:px-8">
          <SectionHeading
            eyebrow="Featured shelf"
            title="Book-style discovery for every unfolding world"
            description="A placeholder glimpse at how published stories can feel collectible, editorial, and ready for reader conversation."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {featuredBooks.map((book) => (
              <BookCard key={book.title} {...book} />
            ))}
          </div>
        </section>

        <section id="ai" className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8" aria-labelledby="ai-heading">
          <div className="grid gap-8 rounded-[2rem] border border-border/80 bg-parchment/80 p-6 shadow-[0_20px_70px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-8 lg:grid-cols-[0.75fr_1fr] lg:items-center">
            <div className="flex size-16 items-center justify-center rounded-2xl bg-accent text-accent-foreground">
              <Sparkles className="size-7" aria-hidden="true" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Coming soon
              </p>
              <h2 id="ai-heading" className="mt-3 text-3xl font-semibold leading-tight text-foreground">
                AI writing enhancement, built for creative control.
              </h2>
              <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground">
                StoryVerse will later help authors refine prose, strengthen
                scenes, and explore suggestions while keeping the writer in
                charge of every chapter.
              </p>
            </div>
          </div>
        </section>

        <section id="write" className="mx-auto w-full max-w-6xl px-5 pb-20 sm:px-8">
          <div className="flex flex-col items-start justify-between gap-6 border-t border-border/80 pt-8 sm:flex-row sm:items-center">
            <div>
              <h2 className="text-2xl font-semibold text-foreground">
                The full app is next. The foundation is ready.
              </h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Author workspaces, chapter publishing, comments, and AI tools can
                build on this visual system.
              </p>
            </div>
            <Button asChild className="rounded-full px-5">
              <Link href="#stories">Explore Stories</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
