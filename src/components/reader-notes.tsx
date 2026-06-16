"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";

import { createReaderNote, type ReaderNoteActionState } from "@/app/books/actions";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import type { SampleStory, StoryChapter } from "@/lib/sample-stories";

type ReaderNotesProps = {
  story: SampleStory;
  chapter: StoryChapter;
};

const initialActionState: ReaderNoteActionState = {};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function getInitials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase() || "AR";
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" className="h-11 rounded-full px-5" disabled={pending}>
      <Send className="size-4" aria-hidden="true" />
      {pending ? "Sending..." : "Send Note"}
    </Button>
  );
}

function ActionMessage({ state }: { state: ReaderNoteActionState }) {
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

export function ReaderNotes({ story, chapter }: ReaderNotesProps) {
  const router = useRouter();
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useActionState(
    createReaderNote.bind(null, story.slug, chapter.id),
    initialActionState
  );
  const notes = chapter.readerNotes ?? [];

  useEffect(() => {
    if (state.message && !state.error) {
      formRef.current?.reset();
      router.refresh();
    }
  }, [router, state]);

  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8">
      <div className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)] sm:p-6">
        <div className="flex flex-col gap-1 border-b border-border/70 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Reader notes
          </p>
          <h2 className="text-2xl font-semibold text-foreground">
            Leave a note for Chapter {chapter.chapterNumber}
          </h2>
          <p className="text-sm leading-6 text-muted-foreground">
            Share what moved you, what confused you, or where the page could sing more clearly.
          </p>
        </div>

        <form ref={formRef} action={action} className="mt-6 space-y-4">
          <ActionMessage state={state} />
          <label className="block">
            <span className="text-sm font-medium text-foreground">Display name</span>
            <Input
              name="displayName"
              maxLength={80}
              placeholder="Optional"
              className="mt-2 h-11 rounded-full bg-background/70 px-4"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-foreground">Feedback</span>
            <Textarea
              name="content"
              required
              maxLength={1000}
              placeholder="Write a note for the author..."
              className="mt-2 min-h-32 resize-y rounded-2xl bg-background/70 p-4"
            />
          </label>
          <SubmitButton />
        </form>

        <div className="mt-8 border-t border-border/70 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-lg font-semibold text-foreground">Notes on this chapter</h3>
            <Badge variant="outline" className="rounded-full bg-background/70">
              {notes.length} {notes.length === 1 ? "note" : "notes"}
            </Badge>
          </div>

          <div className="mt-2 divide-y divide-border/70">
            {notes.length ? (
              notes.map((note) => (
                <article key={note.id} className="flex gap-3 py-5">
                  <Avatar className="size-9 border border-border/70">
                    <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                      {getInitials(note.reader)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                      <p className="text-sm font-semibold text-foreground">{note.reader}</p>
                      <p className="text-xs text-muted-foreground">{formatDate(note.createdAt)}</p>
                      {note.isHelpful ? (
                        <Badge className="rounded-full bg-accent text-accent-foreground">
                          Helpful
                        </Badge>
                      ) : null}
                    </div>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{note.content}</p>
                  </div>
                </article>
              ))
            ) : (
              <p className="py-5 text-sm leading-6 text-muted-foreground">
                Reader notes will appear here once readers respond.
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
