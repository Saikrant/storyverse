import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { StoryManagementForm } from "@/components/story-management-form";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
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
  const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
  const story = await getEditableStory(author.id, storyId);

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
