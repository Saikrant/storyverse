import { BookOpen, Clock3, FileText } from "lucide-react";

import { StoryCover } from "@/components/story-cover";
import { Badge } from "@/components/ui/badge";
import type { CoverTheme } from "@/lib/sample-stories";

export type EditorPreviewState = {
  title: string;
  genre: string;
  description: string;
  coverDirection: string;
  chapterTitle: string;
  chapterContent: string;
};

type EditorPreviewProps = {
  preview: EditorPreviewState;
  wordCount: number;
  estimatedReadTime: string;
};

export function EditorPreview({ preview, wordCount, estimatedReadTime }: EditorPreviewProps) {
  const title = preview.title.trim() || "Untitled Story";
  const genre = preview.genre.trim() || "Speculative Fiction";
  const coverDirection = preview.coverDirection.trim() || "Warm paper, cinematic shadows";
  const chapterTitle = preview.chapterTitle.trim() || "Untitled Chapter";
  const description =
    preview.description.trim() ||
    "A polished story preview will appear here as the draft takes shape.";
  const coverTheme: CoverTheme = genre.toLowerCase().includes("romance")
    ? "gold"
    : genre.toLowerCase().includes("mystery")
      ? "olive"
      : genre.toLowerCase().includes("sci")
        ? "library"
        : "terracotta";

  return (
    <aside className="rounded-[1.5rem] border border-border/80 bg-card/90 p-5 shadow-[0_20px_60px_oklch(0.205_0.023_52.2_/_0.08)] lg:sticky lg:top-24">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Live preview
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Book package</h2>
        </div>
        <Badge variant="outline" className="rounded-full bg-background/70">
          Draft
        </Badge>
      </div>

      <div className="mt-6 grid gap-5 sm:grid-cols-[auto_1fr] lg:grid-cols-1">
        <StoryCover
          theme={coverTheme}
          title={title}
          author="Studio Author"
          accent={coverDirection}
          compact
          className="h-56 w-40"
        />
        <div>
          <Badge className="rounded-full bg-accent text-accent-foreground">{genre}</Badge>
          <h3 className="mt-4 text-2xl font-semibold leading-tight text-foreground">{title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{description}</p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-border/70 bg-background/60 p-4">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
          Current chapter
        </p>
        <h3 className="mt-2 text-xl font-semibold text-foreground">{chapterTitle}</h3>
        <div className="mt-4 grid grid-cols-3 gap-2 text-xs text-muted-foreground">
          <span className="rounded-xl bg-card/80 p-3">
            <FileText className="mb-2 size-3.5 text-terracotta" aria-hidden="true" />
            {wordCount} words
          </span>
          <span className="rounded-xl bg-card/80 p-3">
            <Clock3 className="mb-2 size-3.5 text-terracotta" aria-hidden="true" />
            {estimatedReadTime}
          </span>
          <span className="rounded-xl bg-card/80 p-3">
            <BookOpen className="mb-2 size-3.5 text-terracotta" aria-hidden="true" />
            Chapter 1
          </span>
        </div>
      </div>
    </aside>
  );
}
