import { EnhancementType, PrismaClient, StoryStatus, UserRole } from "@prisma/client";

import { sampleStories } from "../src/lib/sample-stories";

const prisma = new PrismaClient();

const seededStories = sampleStories;

function authorEmail(name: string) {
  return `${name.toLowerCase().replaceAll(" ", ".")}@storyverse.dev`;
}

async function main() {
  await prisma.$transaction([
    prisma.enhancement.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.chapter.deleteMany(),
    prisma.story.deleteMany(),
  ]);

  const readerAvery = await prisma.user.upsert({
    where: { email: "avery.reader@storyverse.dev" },
    update: {},
    create: {
      name: "Avery Stone",
      email: "avery.reader@storyverse.dev",
      role: UserRole.READER,
    },
  });

  const readerMika = await prisma.user.upsert({
    where: { email: "mika.reader@storyverse.dev" },
    update: {},
    create: {
      name: "Mika Chen",
      email: "mika.reader@storyverse.dev",
      role: UserRole.READER,
    },
  });

  const readerRen = await prisma.user.upsert({
    where: { email: "ren.reader@storyverse.dev" },
    update: {},
    create: {
      name: "Ren Patel",
      email: "ren.reader@storyverse.dev",
      role: UserRole.READER,
    },
  });

  for (const [storyIndex, sampleStory] of seededStories.entries()) {
    const author = await prisma.user.upsert({
      where: { email: authorEmail(sampleStory.author) },
      update: {
        name: sampleStory.author,
        role: UserRole.AUTHOR,
      },
      create: {
        name: sampleStory.author,
        email: authorEmail(sampleStory.author),
        role: UserRole.AUTHOR,
      },
    });

    const story = await prisma.story.create({
      data: {
        authorId: author.id,
        title: sampleStory.title,
        slug: sampleStory.slug,
        description: sampleStory.description,
        genre: sampleStory.genre,
        coverTheme: sampleStory.cover.theme,
        status: StoryStatus.PUBLISHED,
      },
    });

    await prisma.enhancement.create({
      data: {
        storyId: story.id,
        type: storyIndex === 0 ? EnhancementType.SUMMARY : EnhancementType.TITLE,
        originalText: sampleStory.description,
        enhancedText: `${sampleStory.description} A stronger launch blurb can emphasize the central mystery and reader promise.`,
      },
    });

    for (const chapter of sampleStory.chapters.slice(0, 3)) {
      const seededChapter = await prisma.chapter.create({
        data: {
          storyId: story.id,
          title: chapter.title,
          chapterNumber: chapter.chapterNumber,
          content: chapter.content,
          estimatedReadTime: chapter.estimatedReadTime,
        },
      });

      await prisma.comment.createMany({
        data: [
          {
            userId: readerAvery.id,
            storyId: story.id,
            chapterId: seededChapter.id,
            content: `The mood in "${chapter.title}" feels polished and ready for reader feedback.`,
            isHelpful: true,
          },
          {
            userId: readerMika.id,
            storyId: story.id,
            chapterId: seededChapter.id,
            content: "This chapter has a strong closing beat. I would keep reading immediately.",
          },
          {
            userId: readerRen.id,
            storyId: story.id,
            chapterId: seededChapter.id,
            content: `The cover direction, ${sampleStory.cover.accent.toLowerCase()}, matches the promise of this chapter.`,
          },
        ],
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
