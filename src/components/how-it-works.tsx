import { BookMarked, MessageSquareText, PenLine } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const steps = [
  {
    title: "Write chapters",
    description:
      "Draft scenes in a calm author workspace designed around momentum, structure, and editorial focus.",
    icon: PenLine,
  },
  {
    title: "Publish as a book",
    description:
      "Turn serial chapters into a polished book-like reading experience with genre, status, and shelf presence.",
    icon: BookMarked,
  },
  {
    title: "Improve with reader notes and AI",
    description:
      "Use reader feedback and future AI suggestions to sharpen scenes while keeping creative control.",
    icon: MessageSquareText,
  },
];

export function HowItWorks() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <SectionHeading
        eyebrow="How StoryVerse works"
        title="A publishing flow built for modern storytellers"
        description="StoryVerse connects drafting, publishing, discovery, and feedback in one warm digital library experience."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {steps.map((step, index) => {
          const Icon = step.icon;

          return (
            <article
              key={step.title}
              className="rounded-2xl border border-border/80 bg-card/80 p-6 shadow-[0_16px_45px_oklch(0.205_0.023_52.2_/_0.06)]"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-semibold text-terracotta">
                  Step {index + 1}
                </span>
                <span className="flex size-11 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                  <Icon className="size-5" aria-hidden="true" />
                </span>
              </div>
              <h3 className="mt-8 text-2xl font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                {step.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
