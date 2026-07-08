"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";

import { ChapterNavigation } from "@/components/chapter-navigation";
import { FormattedChapterContent } from "@/components/formatted-chapter-content";
import { ReaderNotes } from "@/components/reader-notes";
import { ReaderThemeToggle, type ReaderTheme } from "@/components/reader-theme-toggle";
import { Button } from "@/components/ui/button";
import type { SampleStory } from "@/lib/sample-stories";
import { cn } from "@/lib/utils";

type StoryReaderProps = {
  story: SampleStory;
};

const readerThemeClasses: Record<ReaderTheme, string> = {
  light: "bg-card text-foreground",
  sepia: "bg-parchment text-primary",
  dark: "bg-library text-library-foreground",
};

const readerTextClasses: Record<ReaderTheme, string> = {
  light: "text-muted-foreground",
  sepia: "text-primary/75",
  dark: "text-white/72",
};

export function StoryReader({ story }: StoryReaderProps) {
  const [theme, setTheme] = useState<ReaderTheme>("light");
  const [chapterNumber, setChapterNumber] = useState(story.chapters[0]?.chapterNumber ?? 1);
  const readerRef = useRef<HTMLElement>(null);
  const shouldScrollToReader = useRef(false);
  const chapter = useMemo(
    () =>
      story.chapters.find((item) => item.chapterNumber === chapterNumber) ??
      story.chapters[0],
    [chapterNumber, story.chapters]
  );

  useEffect(() => {
    if (!chapter || !shouldScrollToReader.current) {
      return;
    }

    shouldScrollToReader.current = false;
    window.requestAnimationFrame(() => {
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      readerRef.current?.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      readerRef.current?.focus({ preventScroll: true });
    });
  }, [chapter]);

  if (!chapter) {
    return null;
  }

  function selectChapter(nextChapterNumber: number) {
    if (nextChapterNumber === chapter.chapterNumber) {
      return;
    }

    shouldScrollToReader.current = true;
    setChapterNumber(nextChapterNumber);
  }

  return (
    <main className="flex-1">
      <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <Button
            asChild
            variant="ghost"
            className="w-fit rounded-full px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            <Link href={`/books/${story.slug}`}>
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Details
            </Link>
          </Button>
          <ReaderThemeToggle value={theme} onChange={setTheme} />
        </div>

        <ChapterNavigation
          chapters={story.chapters}
          currentChapter={chapter}
          onSelectChapter={selectChapter}
        />
      </section>

      <article
        ref={readerRef}
        tabIndex={-1}
        className="mx-auto w-full max-w-4xl scroll-mt-6 px-5 pb-10 outline-none sm:px-8"
      >
        <div
          className={cn(
            "rounded-[2rem] border border-border/80 p-6 shadow-[0_28px_80px_oklch(0.205_0.023_52.2_/_0.12)] sm:p-10 md:p-14",
            readerThemeClasses[theme]
          )}
        >
          <header className="border-b border-current/15 pb-8">
            <p className={cn("text-xs font-semibold uppercase tracking-[0.22em]", readerTextClasses[theme])}>
              {story.title}
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
              {chapter.title}
            </h1>
            <p className={cn("mt-4 text-sm", readerTextClasses[theme])}>
              Chapter {chapter.chapterNumber} of {story.chapterCount} • {chapter.estimatedReadTime}
            </p>
          </header>

          <FormattedChapterContent content={chapter.content} />
        </div>
      </article>

      <section className="mx-auto w-full max-w-6xl px-5 pb-10 sm:px-8">
        <ChapterNavigation
          chapters={story.chapters}
          currentChapter={chapter}
          onSelectChapter={selectChapter}
        />
      </section>

      <ReaderNotes key={chapter.id} story={story} chapter={chapter} />
    </main>
  );
}
