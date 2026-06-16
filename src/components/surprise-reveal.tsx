"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  BookOpen,
  Feather,
  MessageCircle,
  PenLine,
  Rows3,
  Sparkles,
} from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const platformNotes = [
  {
    title: "Write your stories",
    description: "Paste a draft and shape it in a private Studio.",
    icon: PenLine,
  },
  {
    title: "Organize chapters",
    description: "Turn scattered scenes into a book readers can follow.",
    icon: Rows3,
  },
  {
    title: "Publish as books",
    description: "Move from hidden draft to public shelf when ready.",
    icon: BookOpen,
  },
  {
    title: "Receive reader notes",
    description: "Collect gentle feedback from people who read.",
    icon: MessageCircle,
  },
];

const paperShapes = [
  "left-[6%] top-[8rem] h-20 w-14 [--paper-rotate:-12deg]",
  "right-[8%] top-[11rem] h-16 w-12 [--paper-rotate:14deg] [animation-delay:180ms]",
  "left-[13%] bottom-[24rem] h-14 w-10 [--paper-rotate:9deg] [animation-delay:420ms]",
  "right-[17%] bottom-[18rem] h-24 w-16 [--paper-rotate:-8deg] [animation-delay:260ms]",
  "left-[48%] top-[34rem] h-12 w-9 [--paper-rotate:18deg] [animation-delay:620ms]",
];

function BookLoader({ isHidden }: { isHidden: boolean }) {
  return (
    <div
      className={cn(
        "surprise-loader fixed inset-0 z-50 flex items-center justify-center bg-parchment px-5",
        isHidden && "surprise-loader-hidden"
      )}
      aria-live="polite"
      aria-label="Opening StoryVerse"
    >
      <div className="text-center">
        <div className="surprise-loader-book mx-auto" aria-hidden="true">
          <span className="surprise-loader-cover surprise-loader-cover-left" />
          <span className="surprise-loader-cover surprise-loader-cover-right" />
          <span className="surprise-loader-page surprise-loader-page-one" />
          <span className="surprise-loader-page surprise-loader-page-two" />
          <span className="surprise-loader-page surprise-loader-page-three" />
          <span className="surprise-loader-spine" />
        </div>
        <p className="mt-7 text-sm font-medium tracking-wide text-muted-foreground">
          Opening a world made for your words...
        </p>
      </div>
    </div>
  );
}

function FloatingPages() {
  return (
    <>
      {paperShapes.map((shape) => (
        <span
          key={shape}
          aria-hidden="true"
          className={`surprise-paper absolute hidden rounded-md border border-border/60 bg-card/70 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.10)] sm:block ${shape}`}
        />
      ))}
    </>
  );
}

function AnimatedBookVisual() {
  return (
    <div className="surprise-book-reveal relative mx-auto w-full max-w-md">
      <div className="absolute -inset-8 rounded-[3rem] bg-accent/25 blur-3xl" />
      <div className="relative rounded-[2rem] border border-border/80 bg-card/80 p-4 shadow-[0_32px_100px_oklch(0.205_0.023_52.2_/_0.16)] backdrop-blur sm:p-5">
        <div className="relative overflow-hidden rounded-[1.5rem] bg-library p-6 text-library-foreground">
          <div className="absolute right-6 top-6 text-gold/70">
            <Sparkles className="surprise-spark size-6" aria-hidden="true" />
          </div>
          <div className="surprise-open-book mx-auto">
            <div className="surprise-open-book-left">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-gold">
                Built for
              </p>
              <h2 className="mt-4 text-4xl font-semibold leading-tight text-white">
                Your Stories
              </h2>
              <div className="mt-8 space-y-3">
                <div className="surprise-page-line w-24" />
                <div className="surprise-page-line w-36" />
                <div className="surprise-page-line w-28" />
              </div>
            </div>
            <div className="surprise-open-book-right">
              <div className="space-y-3">
                <div className="surprise-page-line w-32" />
                <div className="surprise-page-line w-24" />
                <div className="surprise-page-line w-36" />
                <div className="surprise-page-line w-28" />
              </div>
              <div className="mt-auto flex items-center justify-between border-t border-white/15 pt-5">
                <span className="text-sm text-white/70">StoryVerse</span>
                <Feather className="size-5 text-gold" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="mt-5 rounded-2xl bg-white/10 p-4 text-sm leading-6 text-white/75">
            A private writing room, a public bookshelf, and a place for reader notes
            to arrive softly.
          </div>
        </div>
      </div>
    </div>
  );
}

export function SurpriseReveal() {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowLoader(false);
    }, 2200);

    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-full overflow-hidden bg-parchment">
      {showLoader ? <BookLoader isHidden={!showLoader} /> : null}
      <SiteHeader />
      <main className={cn("surprise-reveal relative", showLoader && "surprise-content-wait")}>
        <div className="surprise-glow surprise-glow-one" />
        <div className="surprise-glow surprise-glow-two" />
        <div className="surprise-dust" aria-hidden="true" />
        <FloatingPages />

        <section className="relative mx-auto grid w-full max-w-6xl gap-12 px-5 py-14 sm:px-8 sm:py-20 lg:min-h-[calc(100vh-4rem)] lg:grid-cols-[1.04fr_0.96fr] lg:items-center lg:py-24">
          <div className="surprise-hero-copy">
            <Badge className="surprise-line-reveal rounded-full bg-accent text-accent-foreground shadow-sm">
              A little surprise for you
            </Badge>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl lg:text-7xl">
              <span className="surprise-line-reveal block [animation-delay:260ms]">
                Your stories deserve
              </span>
              <span className="surprise-line-reveal block [animation-delay:520ms]">
                a world of their own.
              </span>
            </h1>
            <div className="mt-6 max-w-2xl space-y-4 text-lg leading-8 text-muted-foreground">
              <p className="surprise-line-reveal [animation-delay:780ms]">
                Built for the chapters you have carried quietly, the drafts tucked between
                messages, and the novels that deserve a shelf of their own.
              </p>
              <p className="surprise-line-reveal text-base leading-7 [animation-delay:960ms]">
                StoryVerse is a small digital library where your words can become books,
                chapters, and moments readers can return to.
              </p>
            </div>
            <div className="surprise-line-reveal mt-9 flex flex-col gap-3 [animation-delay:1120ms] sm:flex-row">
              <Button
                asChild
                size="lg"
                className="surprise-button h-12 rounded-full px-6 text-base shadow-[0_18px_40px_oklch(0.571_0.126_43.3_/_0.22)]"
              >
                <Link href="/">
                  Enter StoryVerse
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="surprise-button h-12 rounded-full border-border/80 bg-card/70 px-6 text-base shadow-sm"
              >
                <Link href="/studio">Open Writing Studio</Link>
              </Button>
            </div>
          </div>

          <AnimatedBookVisual />
        </section>

        <section className="relative mx-auto w-full max-w-5xl px-5 pb-14 sm:px-8 sm:pb-20">
          <div className="surprise-letter rounded-[2rem] border border-border/80 bg-card/85 p-6 shadow-[0_24px_80px_oklch(0.205_0.023_52.2_/_0.10)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              A note from the builder
            </p>
            <p className="surprise-letter-line mt-5 font-heading text-3xl font-semibold leading-tight text-foreground sm:text-4xl">
              I know your stories deserve more than staying hidden inside WhatsApp chats.
            </p>
            <p className="surprise-letter-line mt-5 text-lg leading-8 text-muted-foreground [animation-delay:240ms]">
              So I built a small world where your words can become books, chapters,
              and moments people can read and remember.
            </p>
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-6xl px-5 pb-14 sm:px-8 sm:pb-20">
          <div className="surprise-fade-up surprise-delay-2 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              What this space lets you do
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight text-foreground sm:text-5xl">
              From private draft to living library.
            </h2>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {platformNotes.map((note, index) => {
              const Icon = note.icon;

              return (
                <article
                  key={note.title}
                  className="surprise-feature-card rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.07)]"
                  style={{ animationDelay: `${260 + index * 130}ms` }}
                >
                  <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-xl font-semibold text-foreground">{note.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{note.description}</p>
                </article>
              );
            })}
          </div>
        </section>

        <section className="relative mx-auto w-full max-w-5xl px-5 pb-20 sm:px-8 sm:pb-24">
          <div className="surprise-final-card rounded-[2rem] border border-border/80 bg-library p-6 text-center text-library-foreground shadow-[0_32px_100px_oklch(0.205_0.023_52.2_/_0.16)] sm:p-10">
            <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-gold text-primary">
              <BookOpen className="size-6" aria-hidden="true" />
            </div>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
              The doors are open
            </p>
            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Welcome to your own story world.
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-white/70">
              This is just the beginning — a place where every chapter you write
              can finally have a home.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="surprise-button surprise-shimmer-button h-11 rounded-full bg-gold px-5 text-primary hover:bg-gold/90"
              >
                <Link href="/">
                  Enter StoryVerse
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="surprise-button h-11 rounded-full border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white"
              >
                <Link href="/studio">Open Writing Studio</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
