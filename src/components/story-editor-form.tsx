"use client";

import { Eye, Save, Send } from "lucide-react";
import { useMemo, useState } from "react";

import { EditorPreview, type EditorPreviewState } from "@/components/editor-preview";
import { WritingTextarea } from "@/components/writing-textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const initialEditorState: EditorPreviewState = {
  title: "The Orchard of Small Storms",
  genre: "Fantasy",
  description:
    "A young weather cartographer inherits an orchard where every tree grows a different kind of storm.",
  coverDirection: "Copper rain, paper maps, and twilight fruit trees",
  chapterTitle: "The First Cloud Apple",
  chapterContent:
    "The orchard was quiet until Mara cut into the first cloud apple.\n\nThunder rolled inside the fruit. Not above it, not beyond it, but inside the pale flesh, small and furious as a trapped bee. She set the knife down and watched blue light gather in the juice.\n\nHer grandfather's map had warned her about wind pears, frost plums, and the lightning quince near the western wall. It had said nothing about apples that remembered storms.",
};

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function getReadTime(wordCount: number) {
  return `${Math.max(1, Math.ceil(wordCount / 225))} min read`;
}

export function StoryEditorForm() {
  const [draft, setDraft] = useState(initialEditorState);
  const [message, setMessage] = useState("Draft autosave is mocked locally.");
  const wordCount = useMemo(() => countWords(draft.chapterContent), [draft.chapterContent]);
  const estimatedReadTime = getReadTime(wordCount);

  function updateField<Key extends keyof EditorPreviewState>(
    key: Key,
    value: EditorPreviewState[Key]
  ) {
    setDraft((current) => ({
      ...current,
      [key]: value,
    }));
  }

  function showMessage(nextMessage: string) {
    setMessage(nextMessage);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_25rem]">
      <section className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_20px_60px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-6">
        <div className="flex flex-col gap-4 border-b border-border/70 pb-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Story editor
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-foreground">Draft a book-style chapter</h1>
          </div>
          <p className="rounded-full bg-secondary px-4 py-2 text-xs text-secondary-foreground">
            {message}
          </p>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-foreground">Story title</span>
            <Input
              value={draft.title}
              onChange={(event) => updateField("title", event.target.value)}
              className="mt-2 h-11 rounded-full bg-background/70 px-4"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Genre</span>
            <select
              value={draft.genre}
              onChange={(event) => updateField("genre", event.target.value)}
              className="mt-2 h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option>Fantasy</option>
              <option>Romance</option>
              <option>Science Fiction</option>
              <option>Mystery</option>
              <option>Literary</option>
              <option>Historical Fantasy</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Description</span>
            <Textarea
              value={draft.description}
              onChange={(event) => updateField("description", event.target.value)}
              className="mt-2 min-h-24 rounded-2xl bg-background/70 p-4"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Cover direction</span>
            <Input
              value={draft.coverDirection}
              onChange={(event) => updateField("coverDirection", event.target.value)}
              className="mt-2 h-11 rounded-full bg-background/70 px-4"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Chapter title</span>
            <Input
              value={draft.chapterTitle}
              onChange={(event) => updateField("chapterTitle", event.target.value)}
              className="mt-2 h-11 rounded-full bg-background/70 px-4"
            />
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Chapter content</span>
            <WritingTextarea
              value={draft.chapterContent}
              onChange={(event) => updateField("chapterContent", event.target.value)}
              placeholder="Begin writing the chapter..."
            />
          </label>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row">
          <Button type="button" className="h-11 rounded-full px-5" onClick={() => showMessage("Draft saved locally for this preview.")}>
            <Save className="size-4" aria-hidden="true" />
            Save Draft
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full bg-background/70 px-5"
            onClick={() => showMessage("Book preview refreshed from the current editor state.")}
          >
            <Eye className="size-4" aria-hidden="true" />
            Preview as Book
          </Button>
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-full border-terracotta/40 bg-terracotta/10 px-5 text-terracotta hover:bg-terracotta/15"
            onClick={() => showMessage("Publish is mocked until auth and persistence are added.")}
          >
            <Send className="size-4" aria-hidden="true" />
            Publish
          </Button>
        </div>
      </section>

      <EditorPreview preview={draft} wordCount={wordCount} estimatedReadTime={estimatedReadTime} />
    </div>
  );
}
