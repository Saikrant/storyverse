import { CheckCircle2, Sparkles, WandSparkles } from "lucide-react";

import { SectionHeading } from "@/components/section-heading";

const suggestions = [
  "Strengthen the final image before the chapter break.",
  "Add one sensory detail to anchor the archive setting.",
  "Convert repeated exposition into a line of dialogue.",
];

export function AiPreviewPanel() {
  return (
    <section id="ai" className="mx-auto w-full max-w-6xl px-5 py-16 sm:px-8">
      <div className="grid gap-8 rounded-[2rem] border border-border/80 bg-parchment/80 p-6 shadow-[0_20px_70px_oklch(0.205_0.023_52.2_/_0.08)] sm:p-8 lg:grid-cols-[0.82fr_1fr] lg:items-center">
        <SectionHeading
          eyebrow="AI enhancement preview"
          title="Creative suggestions without taking the pen away"
          description="The future AI layer is framed as an editor at the margin: useful, specific, and always optional for the author."
          className="mx-0 text-left"
        />
        <div className="rounded-2xl border border-border/80 bg-card/90 p-5 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.08)]">
          <div className="flex items-center justify-between border-b border-border/70 pb-4">
            <div className="flex items-center gap-3">
              <span className="flex size-11 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <WandSparkles className="size-5" aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-foreground">
                  Chapter polish
                </p>
                <p className="text-xs text-muted-foreground">
                  Scene-level writing notes
                </p>
              </div>
            </div>
            <Sparkles className="size-5 text-terracotta" aria-hidden="true" />
          </div>
          <div className="mt-5 rounded-xl bg-secondary/60 p-4 text-sm leading-7 text-secondary-foreground">
            The library held its breath as Elian opened the book that no reader
            had ever finished. In the margin, a stranger had left a question in
            copper ink.
          </div>
          <div className="mt-5 space-y-3">
            {suggestions.map((suggestion) => (
              <div
                key={suggestion}
                className="flex items-start gap-3 rounded-xl border border-border/70 bg-background/60 p-3 text-sm text-muted-foreground"
              >
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-terracotta" aria-hidden="true" />
                <span>{suggestion}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
