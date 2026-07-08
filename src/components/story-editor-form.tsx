"use client";

import { Eye, Save, Send } from "lucide-react";
import type { ReactNode } from "react";
import { useActionState, useMemo, useState } from "react";
import { useFormStatus } from "react-dom";

import { createStory, type StoryEditorActionState } from "@/app/studio/actions";
import { EditorPreview, type EditorPreviewState } from "@/components/editor-preview";
import { WritingTextarea } from "@/components/writing-textarea";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type EditorFormState = EditorPreviewState & {
  coverTheme: string;
};

const initialEditorState: EditorFormState = {
  title: "",
  genre: "Fantasy",
  description: "",
  coverDirection: "",
  coverTheme: "terracotta",
  chapterTitle: "",
  chapterContent: "",
};

const initialActionState: StoryEditorActionState = {};

function countWords(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function getReadTime(wordCount: number) {
  return `${Math.max(1, Math.ceil(wordCount / 225))} min read`;
}

function EditorSubmitButton({
  intent,
  children,
  variant = "default",
  className,
}: {
  intent: "draft" | "publish";
  children: ReactNode;
  variant?: "default" | "outline";
  className?: string;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      name="intent"
      value={intent}
      variant={variant}
      className={className}
      disabled={pending}
    >
      {children}
    </Button>
  );
}

export function StoryEditorForm() {
  const [draft, setDraft] = useState(initialEditorState);
  const [actionState, formAction] = useActionState(createStory, initialActionState);
  const [message, setMessage] = useState("Drafts save to the private author workspace.");
  const wordCount = useMemo(() => countWords(draft.chapterContent), [draft.chapterContent]);
  const estimatedReadTime = getReadTime(wordCount);

  function updateField<Key extends keyof EditorFormState>(
    key: Key,
    value: EditorFormState[Key]
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

        {actionState.error ? (
          <p className="mt-5 rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {actionState.error}
          </p>
        ) : null}

        <form action={formAction} className="mt-6">
          <div className="grid gap-5 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-foreground">Story title</span>
              <Input
                name="title"
                value={draft.title}
                onChange={(event) => updateField("title", event.target.value)}
                required
                className="mt-2 h-11 rounded-full bg-background/70 px-4"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">Genre</span>
              <select
                name="genre"
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
                name="description"
                value={draft.description}
                onChange={(event) => updateField("description", event.target.value)}
                placeholder="Optional, but recommended for the public book page."
                className="mt-2 min-h-24 rounded-2xl bg-background/70 p-4"
              />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">Cover theme</span>
              <select
                name="coverTheme"
                value={draft.coverTheme}
                onChange={(event) => updateField("coverTheme", event.target.value)}
                className="mt-2 h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="terracotta">Terracotta</option>
                <option value="gold">Gold</option>
                <option value="library">Library</option>
                <option value="olive">Olive</option>
                <option value="rose">Rose</option>
                <option value="ink">Ink</option>
              </select>
            </label>
            <label className="block">
              <span className="text-sm font-medium text-foreground">Cover direction</span>
              <Input
                name="coverDirection"
                value={draft.coverDirection}
                onChange={(event) => updateField("coverDirection", event.target.value)}
                placeholder="Optional visual direction for the story package."
                className="mt-2 h-11 rounded-full bg-background/70 px-4"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-foreground">Chapter title</span>
              <Input
                name="chapterTitle"
                value={draft.chapterTitle}
                onChange={(event) => updateField("chapterTitle", event.target.value)}
                required
                className="mt-2 h-11 rounded-full bg-background/70 px-4"
              />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-foreground">Chapter content</span>
              <WritingTextarea
                name="chapterContent"
                value={draft.chapterContent}
                onChange={(event) => updateField("chapterContent", event.target.value)}
                required
                placeholder="Begin writing the chapter..."
              />
            </label>
          </div>

          <div className="mt-6 flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row">
            <EditorSubmitButton intent="draft" className="h-11 rounded-full px-5">
              <Save className="size-4" aria-hidden="true" />
              Save Draft
            </EditorSubmitButton>
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-full bg-background/70 px-5"
              onClick={() => showMessage("Book preview refreshed from the current editor state.")}
            >
              <Eye className="size-4" aria-hidden="true" />
              Preview as Book
            </Button>
            <EditorSubmitButton
              intent="publish"
              variant="outline"
              className="h-11 rounded-full border-terracotta/40 bg-terracotta/10 px-5 text-terracotta hover:bg-terracotta/15"
            >
              <Send className="size-4" aria-hidden="true" />
              Publish
            </EditorSubmitButton>
          </div>
        </form>
      </section>

      <EditorPreview preview={draft} wordCount={wordCount} estimatedReadTime={estimatedReadTime} />
    </div>
  );
}
