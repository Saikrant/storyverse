import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StoryManagementForm } from "@/components/story-management-form";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { isDatabaseUnavailableError } from "@/lib/database-errors";
import { requireAuthor } from "@/lib/auth";
import { getEditableStory } from "@/lib/data/studio";

export const metadata = {
  title: "Edit Story | StoryVerse Studio",
  description:
    "A private StoryVerse workspace for editing story details and managing chapters.",
};

export default async function EditStoryPage({
  params,
}: PageProps<"/studio/stories/[storyId]/edit">) {
  const { storyId } = await params;
  let story;

  try {
    const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
    story = await getEditableStory(author.id, storyId);
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
                Please try again before editing this story.
              </p>
              <Button asChild className="mt-8 rounded-full px-6">
                <Link href="/studio">Back to Studio</Link>
              </Button>
            </div>
          </main>
        </div>
      );
    }

    throw error;
  }

  if (!story) {
    notFound();
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
          <StoryManagementForm story={story} />
        </section>
      </main>
    </div>
  );
}
