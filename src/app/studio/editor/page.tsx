import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { StoryEditorForm } from "@/components/story-editor-form";
import { Button } from "@/components/ui/button";
import { requireAuthor } from "@/lib/auth";

export const metadata = {
  title: "Story Editor | StoryVerse Studio",
  description:
    "A private StoryVerse editor for drafting and publishing stories.",
};

export default async function StudioEditorPage() {
  await requireAuthor("/studio/editor");

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
