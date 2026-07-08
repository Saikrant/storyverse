"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { BookOpen, Eye, MessageCircle, Plus, Save, Send, Star, Trash2 } from "lucide-react";
import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import { useFormStatus } from "react-dom";

import {
  createChapter,
  deleteChapter,
  toggleReaderNoteHelpful,
  updateChapter,
  updateStoryDetails,
  type StoryEditorActionState,
} from "@/app/studio/actions";
import { WritingTextarea } from "@/components/writing-textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { EditableChapter, EditableStory, StudioFeedbackNote } from "@/lib/data/studio";

type StoryManagementFormProps = {
  story: EditableStory;
};

const genres = ["Fantasy", "Romance", "Science Fiction", "Mystery", "Literary", "Historical Fantasy"];
const coverThemes = [
  { value: "terracotta", label: "Terracotta" },
  { value: "gold", label: "Gold" },
  { value: "library", label: "Library" },
  { value: "olive", label: "Olive" },
  { value: "rose", label: "Rose" },
  { value: "ink", label: "Ink" },
];
const initialActionState: StoryEditorActionState = {};

function getReadTime(wordCount: number) {
  return `${Math.max(1, Math.ceil(wordCount / 225))} min read`;
}

function countWords(value: string) {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
}

function SubmitButton({
  children,
  className,
  variant = "default",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "outline" | "destructive" | "ghost";
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" variant={variant} className={className} disabled={pending}>
      {children}
      {pending ? "Saving..." : null}
    </Button>
  );
}

function HelpfulButton({ helpful }: { helpful: boolean }) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant={helpful ? "default" : "outline"}
      size="sm"
      className="rounded-full bg-background/70"
      disabled={pending}
    >
      <Star className="size-3.5" aria-hidden="true" />
      {pending ? "Saving..." : helpful ? "Helpful" : "Mark helpful"}
    </Button>
  );
}

function DeleteChapterButton({
  disabled,
}: {
  disabled: boolean;
}) {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      variant="destructive"
      className="h-10 rounded-full px-4"
      disabled={disabled || pending}
    >
      <Trash2 className="size-4" aria-hidden="true" />
      {pending ? "Deleting..." : "Delete Chapter"}
    </Button>
  );
}

function ActionMessage({ state }: { state: StoryEditorActionState }) {
  if (state.error) {
    return (
      <p className="rounded-2xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {state.error}
      </p>
    );
  }

  if (state.message) {
    return (
      <p className="rounded-2xl border border-olive/25 bg-olive/10 px-4 py-3 text-sm text-olive">
        {state.message}
      </p>
    );
  }

  return null;
}

function StoryDetailsForm({ story }: { story: EditableStory }) {
  const [state, action] = useActionState(
    updateStoryDetails.bind(null, story.id),
    initialActionState
  );

  return (
    <section className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_20px_60px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-6">
      <div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Story package
          </p>
          <h1 className="mt-2 text-3xl font-semibold text-foreground">Edit story details</h1>
        </div>
        <Badge className="w-fit rounded-full bg-secondary text-secondary-foreground">
          Slug preserved: {story.slug}
        </Badge>
      </div>

      <form action={action} className="mt-6 space-y-5">
        <ActionMessage state={state} />
        <div className="grid gap-5 md:grid-cols-2">
          <label className="block">
            <span className="text-sm font-medium text-foreground">Story title</span>
            <Input
              name="title"
              defaultValue={story.title}
              required
              className="mt-2 h-11 rounded-full bg-background/70 px-4"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Genre</span>
            <select
              name="genre"
              defaultValue={story.genre}
              className="mt-2 h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {genres.map((genre) => (
                <option key={genre}>{genre}</option>
              ))}
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Description</span>
            <Textarea
              name="description"
              defaultValue={story.description}
              className="mt-2 min-h-24 rounded-2xl bg-background/70 p-4"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Cover theme</span>
            <select
              name="coverTheme"
              defaultValue={story.coverTheme}
              className="mt-2 h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              {coverThemes.map((theme) => (
                <option key={theme.value} value={theme.value}>
                  {theme.label}
                </option>
              ))}
            </select>
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Status</span>
            <select
              name="status"
              defaultValue={story.status === "PUBLISHED" ? "PUBLISHED" : "DRAFT"}
              className="mt-2 h-11 w-full rounded-full border border-input bg-background/70 px-4 text-sm text-foreground shadow-xs outline-none transition-[color,box-shadow] focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="DRAFT">Draft</option>
              <option value="PUBLISHED">Published</option>
            </select>
          </label>
          <label className="block md:col-span-2">
            <span className="text-sm font-medium text-foreground">Cover direction</span>
            <Input
              name="coverDirection"
              defaultValue={story.coverDirection}
              placeholder="Visual direction or theme notes for this story package."
              className="mt-2 h-11 rounded-full bg-background/70 px-4"
            />
          </label>
        </div>
        <div className="flex flex-col gap-3 border-t border-border/70 pt-5 sm:flex-row sm:items-center">
          <SubmitButton className="h-11 rounded-full px-5">
            <Save className="size-4" aria-hidden="true" />
            Save Details
          </SubmitButton>
          {story.status === "PUBLISHED" ? (
            <Button asChild variant="outline" className="h-11 rounded-full bg-background/70 px-5">
              <Link href={`/books/${story.slug}`}>
                <Eye className="size-4" aria-hidden="true" />
                Public Page
              </Link>
            </Button>
          ) : null}
        </div>
      </form>
    </section>
  );
}

function AddChapterForm({ storyId }: { storyId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(createChapter.bind(null, storyId), initialActionState);

  useEffect(() => {
    if (state.message && !state.error) {
      formRef.current?.reset();
    }
  }, [state]);

  return (
    <section className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_20px_60px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-6">
      <div className="border-b border-border/70 pb-5">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
          New chapter
        </p>
        <h2 className="mt-2 text-2xl font-semibold text-foreground">Add a chapter</h2>
      </div>
      <form ref={formRef} action={action} className="mt-6 space-y-5">
        <ActionMessage state={state} />
        <label className="block">
          <span className="text-sm font-medium text-foreground">Chapter title</span>
          <Input
            name="chapterTitle"
            required
            className="mt-2 h-11 rounded-full bg-background/70 px-4"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Chapter content</span>
          <WritingTextarea
            name="chapterContent"
            required
            placeholder="Paste or draft the next chapter..."
          />
        </label>
        <SubmitButton className="h-11 rounded-full px-5">
          <Plus className="size-4" aria-hidden="true" />
          Add Chapter
        </SubmitButton>
      </form>
    </section>
  );
}

function ChapterEditor({
  storyId,
  chapter,
  canDelete,
}: {
  storyId: string;
  chapter: EditableChapter;
  canDelete: boolean;
}) {
  const [content, setContent] = useState(chapter.content);
  const [saveState, saveAction] = useActionState(
    updateChapter.bind(null, storyId, chapter.id),
    initialActionState
  );
  const [deleteState, deleteAction] = useActionState(
    deleteChapter.bind(null, storyId, chapter.id),
    initialActionState
  );
  const wordCount = useMemo(() => countWords(content), [content]);
  const readTime = getReadTime(wordCount);

  return (
    <article className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_20px_60px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-6">
      <div className="flex flex-col gap-4 border-b border-border/70 pb-5 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Chapter {chapter.chapterNumber}
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">{chapter.title}</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="outline" className="rounded-full bg-background/70">
            {wordCount} words
          </Badge>
          <Badge variant="outline" className="rounded-full bg-background/70">
            {readTime}
          </Badge>
        </div>
      </div>

      <form action={saveAction} className="mt-6 space-y-5">
        <ActionMessage state={saveState} />
        <label className="block">
          <span className="text-sm font-medium text-foreground">Chapter title</span>
          <Input
            name="chapterTitle"
            defaultValue={chapter.title}
            required
            className="mt-2 h-11 rounded-full bg-background/70 px-4"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-foreground">Chapter content</span>
          <WritingTextarea
            name="chapterContent"
            value={content}
            onChange={(event) => setContent(event.target.value)}
            required
          />
        </label>
        <SubmitButton className="h-11 rounded-full px-5">
          <Save className="size-4" aria-hidden="true" />
          Save Chapter
        </SubmitButton>
      </form>

      <div className="mt-5 border-t border-border/70 pt-5">
        <form action={deleteAction} className="space-y-3">
          <ActionMessage state={deleteState} />
          <DeleteChapterButton disabled={!canDelete || chapter.commentCount > 0} />
          {!canDelete ? (
            <p className="text-xs leading-5 text-muted-foreground">
              Keep at least one chapter in the story.
            </p>
          ) : chapter.commentCount > 0 ? (
            <p className="text-xs leading-5 text-muted-foreground">
              This chapter has reader notes, so deletion is locked.
            </p>
          ) : null}
        </form>
      </div>
    </article>
  );
}

function StoryPreview({ story }: { story: EditableStory }) {
  const totalWords = story.chapters.reduce((total, chapter) => total + chapter.wordCount, 0);

  return (
    <aside
      id="preview"
      className="rounded-[1.5rem] border border-border/80 bg-library p-5 text-library-foreground shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.14)]"
    >
      <div className="flex size-11 items-center justify-center rounded-full bg-gold text-primary">
        <BookOpen className="size-5" aria-hidden="true" />
      </div>
      <p className="mt-5 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
        Private preview
      </p>
      <h2 className="mt-2 text-2xl font-semibold">{story.title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/72">{story.description || "No description yet."}</p>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-white/60">Chapters</p>
          <p className="mt-1 text-2xl font-semibold">{story.chapters.length}</p>
        </div>
        <div className="rounded-2xl bg-white/10 p-3">
          <p className="text-white/60">Words</p>
          <p className="mt-1 text-2xl font-semibold">{totalWords}</p>
        </div>
      </div>
      <div className="mt-5 space-y-3">
        {story.chapters.map((chapter) => (
          <div key={chapter.id} className="rounded-2xl bg-white/10 p-3 text-sm">
            <p className="font-medium">
              {chapter.chapterNumber}. {chapter.title}
            </p>
            <p className="mt-1 text-white/60">
              {chapter.wordCount} words • {chapter.estimatedReadTime ?? getReadTime(chapter.wordCount)}
            </p>
          </div>
        ))}
      </div>
      {story.status === "PUBLISHED" ? (
        <Button asChild className="mt-5 h-11 w-full rounded-full bg-gold text-primary hover:bg-gold/90">
          <Link href={`/books/${story.slug}/read`}>
            <Send className="size-4" aria-hidden="true" />
            Read Public Version
          </Link>
        </Button>
      ) : (
        <p className="mt-5 rounded-2xl bg-white/10 p-3 text-sm text-white/70">
          Draft status keeps this story out of the public library.
        </p>
      )}
    </aside>
  );
}

function FeedbackNote({
  storyId,
  note,
}: {
  storyId: string;
  note: StudioFeedbackNote;
}) {
  const router = useRouter();
  const [state, action] = useActionState(
    toggleReaderNoteHelpful.bind(null, storyId, note.id),
    initialActionState
  );

  useEffect(() => {
    if (state.message && !state.error) {
      router.refresh();
    }
  }, [router, state]);

  return (
    <article className="rounded-2xl border border-border/70 bg-background/60 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-semibold text-foreground">{note.reader}</p>
            <p className="text-xs text-muted-foreground">{note.receivedAt}</p>
            {note.isHelpful ? (
              <Badge className="rounded-full bg-accent text-accent-foreground">Helpful</Badge>
            ) : null}
          </div>
          <p className="mt-1 text-xs font-medium text-terracotta">
            {note.chapterTitle
              ? `Chapter ${note.chapterNumber}: ${note.chapterTitle}`
              : "Story-level note"}
          </p>
        </div>
        <form action={action}>
          <HelpfulButton helpful={note.isHelpful} />
        </form>
      </div>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">{note.content}</p>
      <ActionMessage state={state} />
    </article>
  );
}

function ReaderFeedbackPanel({ story }: { story: EditableStory }) {
  const notesByChapter = story.readerNotes.reduce<Record<string, StudioFeedbackNote[]>>(
    (groups, note) => {
      const key = note.chapterId ?? "story";
      groups[key] = [...(groups[key] ?? []), note];
      return groups;
    },
    {}
  );

  return (
    <section className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_20px_60px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-6">
      <div className="flex flex-col gap-3 border-b border-border/70 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Reader notes
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Feedback from the margins</h2>
        </div>
        <Badge variant="outline" className="w-fit rounded-full bg-background/70">
          {story.readerNotes.length} {story.readerNotes.length === 1 ? "note" : "notes"}
        </Badge>
      </div>

      {story.readerNotes.length ? (
        <div className="mt-5 space-y-5">
          {story.chapters.map((chapter) => {
            const notes = notesByChapter[chapter.id] ?? [];

            if (!notes.length) {
              return null;
            }

            return (
              <div key={chapter.id} className="space-y-3">
                <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                  <MessageCircle className="size-4 text-terracotta" aria-hidden="true" />
                  Chapter {chapter.chapterNumber}: {chapter.title}
                </div>
                {notes.map((note) => (
                  <FeedbackNote key={note.id} storyId={story.id} note={note} />
                ))}
              </div>
            );
          })}
          {(notesByChapter.story ?? []).length ? (
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <MessageCircle className="size-4 text-terracotta" aria-hidden="true" />
                Story-level notes
              </div>
              {notesByChapter.story.map((note) => (
                <FeedbackNote key={note.id} storyId={story.id} note={note} />
              ))}
            </div>
          ) : null}
        </div>
      ) : (
        <p className="mt-5 rounded-2xl bg-background/70 p-4 text-sm leading-6 text-muted-foreground">
          Reader feedback will appear here after this story receives public notes.
        </p>
      )}
    </section>
  );
}

export function StoryManagementForm({ story }: StoryManagementFormProps) {
  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] xl:grid-cols-[minmax(0,1fr)_25rem]">
      <div className="space-y-6">
        <StoryDetailsForm story={story} />
        <section id="chapters" className="space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Chapter shelf
            </p>
            <h2 className="mt-2 text-3xl font-semibold text-foreground">Manage chapters</h2>
          </div>
          {story.chapters.length ? (
            story.chapters.map((chapter) => (
              <ChapterEditor
                key={chapter.id}
                storyId={story.id}
                chapter={chapter}
                canDelete={story.chapters.length > 1}
              />
            ))
          ) : (
            <div className="rounded-xl border border-border/75 bg-card/85 p-5 text-sm leading-6 text-muted-foreground shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)]">
              No chapters yet. Add a first chapter to make this book readable.
            </div>
          )}
        </section>
        <AddChapterForm storyId={story.id} />
        <ReaderFeedbackPanel story={story} />
      </div>
      <div className="lg:sticky lg:top-6 lg:self-start">
        <StoryPreview story={story} />
      </div>
    </div>
  );
}
