import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { StoryEditorForm } from "@/components/story-editor-form";
import { Button } from "@/components/ui/button";
import { isDatabaseUnavailableError } from "@/lib/database-errors";
import { requireAuthor } from "@/lib/auth";

export const metadata = {
  title: "Story Editor | StoryVerse Studio",
  description:
    "A private StoryVerse editor for drafting and publishing stories.",
};

export default async function StudioEditorPage() {
  try {
    await requireAuthor("/studio/editor");
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      return (
        <div className="flex min-h-full flex-1 flex-col">
          <SiteHeader />
          <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
            <div className="rounded-[2rem] border border-border/80 bg-card/85 p-8 shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.1)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
                Studio unavailable
              </p>
              <h1 className="mt-4 text-4xl font-semibold text-foreground">
                Studio could not connect to the library database.
              </h1>
              <p className="mt-4 text-base leading-7 text-muted-foreground">
                Please try again before creating a new story.
              </p>
              <Button asChild className="mt-8 rounded-full px-6">
                <Link href="/studio/editor">Try Again</Link>
              </Button>
            </div>
          </main>
        </div>
      );
    }

    throw error;
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-5 py-8 sm:px-8 sm:py-10">
          <Button
            asChild
            variant="ghost"
            className="mb-6 w-fit rounded-full px-0 text-muted-foreground hover:bg-transparent hover:text-foreground"
          >
            <Link href="/studio">
              <ArrowLeft className="size-4" aria-hidden="true" />
              Back to Studio
            </Link>
          </Button>
          <StoryEditorForm />
        </section>
      </main>
    </div>
  );
}
