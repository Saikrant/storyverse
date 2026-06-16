import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { StoryReader } from "@/components/story-reader";
import { getStoryBySlug, sampleStories } from "@/lib/sample-stories";

export function generateStaticParams() {
  return sampleStories.map((story) => ({
    slug: story.slug,
  }));
}

export async function generateMetadata({ params }: PageProps<"/books/[slug]/read">) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    return {
      title: "Reader Not Found | StoryVerse",
    };
  }

  return {
    title: `Read ${story.title} | StoryVerse`,
    description: `Read sample chapters from ${story.title} by ${story.author}.`,
  };
}

export default async function StoryReaderPage({ params }: PageProps<"/books/[slug]/read">) {
  const { slug } = await params;
  const story = getStoryBySlug(slug);

  if (!story) {
    notFound();
  }

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <StoryReader story={story} />
    </div>
  );
}
