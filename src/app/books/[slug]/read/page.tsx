import { notFound } from "next/navigation";

import { SiteHeader } from "@/components/site-header";
import { StoryReader } from "@/components/story-reader";
import { getStoryBySlug } from "@/lib/data/stories";

export async function generateMetadata({ params }: PageProps<"/books/[slug]/read">) {
  const { slug } = await params;
  const story = await getStoryBySlug(slug, { deferToRequest: false });

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
  const story = await getStoryBySlug(slug);

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
