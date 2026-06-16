"use client";

import { ChevronLeft, ChevronRight, List } from "lucide-react";

import { Button } from "@/components/ui/button";
import type { StoryChapter } from "@/lib/sample-stories";

type ChapterNavigationProps = {
  chapters: StoryChapter[];
  currentChapter: StoryChapter;
  onSelectChapter: (chapterNumber: number) => void;
};

export function ChapterNavigation({
  chapters,
  currentChapter,
  onSelectChapter,
}: ChapterNavigationProps) {
  const previousChapter = chapters.find(
    (chapter) => chapter.chapterNumber === currentChapter.chapterNumber - 1
  );
  const nextChapter = chapters.find(
    (chapter) => chapter.chapterNumber === currentChapter.chapterNumber + 1
  );

  return (
    <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
      <Button
        type="button"
        variant="outline"
        className="h-11 justify-start rounded-full bg-card/80 px-4"
        disabled={!previousChapter}
        onClick={() => previousChapter && onSelectChapter(previousChapter.chapterNumber)}
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        Previous
      </Button>
      <label className="relative block">
        <span className="sr-only">Choose chapter</span>
        <List
          className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden="true"
        />
        <select
          value={currentChapter.chapterNumber}
          onChange={(event) => onSelectChapter(Number(event.target.value))}
          className="h-11 min-w-64 appearance-none rounded-full border border-border/80 bg-card/90 px-11 text-sm font-medium text-foreground shadow-sm outline-none transition-colors focus:border-ring focus:ring-3 focus:ring-ring/25"
        >
          {chapters.map((chapter) => (
            <option key={chapter.id} value={chapter.chapterNumber}>
              Chapter {chapter.chapterNumber}: {chapter.title}
            </option>
          ))}
        </select>
      </label>
      <Button
        type="button"
        variant="outline"
        className="h-11 justify-end rounded-full bg-card/80 px-4"
        disabled={!nextChapter}
        onClick={() => nextChapter && onSelectChapter(nextChapter.chapterNumber)}
      >
        Next
        <ChevronRight className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
