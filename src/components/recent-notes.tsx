import { MessageCircle } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { StudioNote } from "@/lib/data/studio";

type RecentNotesProps = {
  notes: StudioNote[];
};

export function RecentNotes({ notes }: RecentNotesProps) {
  return (
    <div className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)]">
      <div className="flex items-center justify-between gap-4 border-b border-border/70 pb-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Recent reader notes
          </p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">Signals from the margin</h2>
        </div>
        <MessageCircle className="size-5 text-terracotta" aria-hidden="true" />
      </div>
      <div className="divide-y divide-border/70">
        {notes.length ? notes.map((note) => (
          <article key={note.id} className="flex gap-3 py-4">
            <Avatar className="size-9 border border-border/70">
              <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                {note.reader.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                <p className="text-sm font-semibold text-foreground">{note.reader}</p>
                <p className="text-xs text-muted-foreground">{note.receivedAt}</p>
              </div>
              <p className="mt-1 text-xs font-medium text-terracotta">
                {note.storyTitle}
                {note.chapterTitle ? ` / ${note.chapterTitle}` : ""}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{note.excerpt}</p>
            </div>
          </article>
        )) : (
          <p className="py-5 text-sm leading-6 text-muted-foreground">
            Reader notes will appear here after published stories receive comments.
          </p>
        )}
      </div>
    </div>
  );
}
