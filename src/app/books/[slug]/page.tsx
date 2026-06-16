import { notFound } from "next/navigation";

import { ChapterList } from "@/components/chapter-list";
import { SiteHeader } from "@/components/site-header";
import { StoryDetailHero } from "@/components/story-detail-hero";
import { getStoryBySlug, sampleStories } from "@/lib/sample-stories";

export function generateStaticParams() {
  return sampleStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps<"/books/[slug]">) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

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
  const story = getStoryBySlug(slug);

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
