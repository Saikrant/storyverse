import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import type { SampleStory, StoryChapter } from "@/lib/sample-stories";

type ReaderNotesProps = {
  story: SampleStory;
  chapter: StoryChapter;
};

const notes = [
  {
    initials: "AV",
    name: "Avery",
    text: "The opening image has such a clear mood. I can immediately picture this as a serialized book.",
  },
  {
    initials: "MK",
    name: "Mika",
    text: "I like how the chapter ends with a question instead of a hard reveal. It makes the next click feel natural.",
  },
  {
    initials: "RS",
    name: "Ren",
    text: "The sensory details are doing a lot of work here without slowing down the pace.",
  },
];

export function ReaderNotes({ story, chapter }: ReaderNotesProps) {
  return (
    <section className="mx-auto w-full max-w-3xl px-5 pb-16 sm:px-8">
      <div className="rounded-[1.5rem] border border-border/80 bg-card/85 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.06)] sm:p-6">
        <div className="flex flex-col gap-1 border-b border-border/70 pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Reader notes
          </p>
          <h2 className="text-2xl font-semibold text-foreground">{story.readerNotes} notes across this story</h2>
          <p className="text-sm text-muted-foreground">
            Static preview comments for Chapter {chapter.chapterNumber}.
          </p>
        </div>
        <div className="divide-y divide-border/70">
          {notes.map((note) => (
            <article key={note.name} className="flex gap-3 py-5">
              <Avatar className="size-9 border border-border/70">
                <AvatarFallback className="bg-secondary text-xs font-semibold text-secondary-foreground">
                  {note.initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-semibold text-foreground">{note.name}</p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">{note.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
