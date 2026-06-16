import Link from "next/link";
import { notFound } from "next/navigation";

import { ChapterList } from "@/components/chapter-list";
import { SiteHeader } from "@/components/site-header";
import { StoryDetailHero } from "@/components/story-detail-hero";
import { Button } from "@/components/ui/button";
import { getStoryBySlug } from "@/lib/data/stories";

export async function generateMetadata({ params }: PageProps<"/books/[slug]">) {
  const { slug } = await params;
  const { story } = await getStoryBySlug(slug, { deferToRequest: false });

  if (!story) {
    return {
      title: "Story Not Found | StoryVerse",
    };
  }

  return {
    title: `${story.title} | StoryVerse`,
    description: story.description,
  };
}

export default async function StoryDetailPage({ params }: PageProps<"/books/[slug]">) {
  const { slug } = await params;
  const { story, unavailable } = await getStoryBySlug(slug);

  if (unavailable) {
    return (
      <div className="flex min-h-full flex-1 flex-col">
        <SiteHeader />
        <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
          <div className="rounded-[2rem] border border-border/80 bg-card/85 p-8 shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.1)] sm:p-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
              Library unavailable
            </p>
            <h1 className="mt-4 text-4xl font-semibold text-foreground">
              This story could not be loaded right now.
            </h1>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The library database is temporarily unreachable. Please try again soon.
            </p>
            <Button asChild className="mt-8 rounded-full px-6">
              <Link href="/books">Back to Library</Link>
            </Button>
          </div>
        </main>
      </div>
    );
  }

  if (!story) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <StoryDetailHero story={story} />
        <ChapterList story={story} />
      </main>
    </div>
  );
}
