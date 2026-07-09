"use server";

import { Prisma, StoryStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { clearAuthorSession, requireAuthor } from "@/lib/auth";
import {
  getChapterPlainText,
  isChapterContentEmpty,
  normalizeChapterContent,
} from "@/lib/chapter-content";
import { prisma } from "@/lib/prisma";

export type StoryEditorActionState = {
  error?: string;
  message?: string;
};

const coverThemes = ["terracotta", "gold", "library", "olive", "rose", "ink"] as const;

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

function countWords(value: string) {
  return getChapterPlainText(value).split(/\s+/).filter(Boolean).length;
}

function getEstimatedReadTime(content: string) {
  return `${Math.max(1, Math.ceil(countWords(content) / 225))} min read`;
}

async function getUniqueSlug(title: string) {
  const baseSlug = slugify(title) || "untitled-story";
  let slug = baseSlug;
  let suffix = 2;

  while (await prisma.story.findUnique({ where: { slug }, select: { id: true } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  return slug;
}

function normalizeCoverTheme(value: string) {
  return coverThemes.includes(value as (typeof coverThemes)[number])
    ? value
    : "terracotta";
}

function normalizeStoryStatus(value: string) {
  return value === StoryStatus.PUBLISHED ? StoryStatus.PUBLISHED : StoryStatus.DRAFT;
}

async function getAuthorStory(storyId: string, authorId: string) {
  return prisma.story.findFirst({
    where: {
      id: storyId,
      authorId,
    },
    select: {
      id: true,
      slug: true,
      status: true,
    },
  });
}

function revalidateStoryWorkflows(storyId: string, slug?: string) {
  revalidatePath("/studio");
  revalidatePath(`/studio/stories/${storyId}/edit`);
  revalidatePath("/books");

  if (slug) {
    revalidatePath(`/books/${slug}`);
    revalidatePath(`/books/${slug}/read`);
  }
}

export async function logoutAuthor() {
  await clearAuthorSession();
  redirect("/author/login");
}

export async function createStory(
  _prevState: StoryEditorActionState,
  formData: FormData
): Promise<StoryEditorActionState> {
  const author = await requireAuthor("/studio/editor");
  const intent = getStringValue(formData, "intent");
  const title = getStringValue(formData, "title");
  const genre = getStringValue(formData, "genre") || "Fantasy";
  const description = getStringValue(formData, "description");
  const coverDirection = getStringValue(formData, "coverDirection");
  const coverTheme = normalizeCoverTheme(getStringValue(formData, "coverTheme"));
  const chapterTitle = getStringValue(formData, "chapterTitle");
  const chapterContent = normalizeChapterContent(getStringValue(formData, "chapterContent"));

  if (!title) {
    return { error: "Story title is required." };
  }

  if (!chapterTitle) {
    return { error: "Chapter title is required." };
  }

  if (isChapterContentEmpty(chapterContent)) {
    return { error: "Chapter content is required." };
  }

  const slug = await getUniqueSlug(title);
  const status = intent === "publish" ? StoryStatus.PUBLISHED : StoryStatus.DRAFT;

  const story = await prisma.story.create({
    data: {
      authorId: author.id,
      title,
      slug,
      genre,
      description,
      coverTheme,
      coverImage: coverDirection || null,
      status,
      chapters: {
        create: {
          title: chapterTitle,
          chapterNumber: 1,
          content: chapterContent,
          estimatedReadTime: getEstimatedReadTime(chapterContent),
        },
      },
    },
  });

  revalidatePath("/studio");
  revalidatePath("/books");

  if (status === StoryStatus.PUBLISHED) {
    redirect(`/books/${slug}`);
  }

  redirect(`/studio/stories/${story.id}/edit`);
}

export async function updateStoryDetails(
  storyId: string,
  _prevState: StoryEditorActionState,
  formData: FormData
): Promise<StoryEditorActionState> {
  const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
  const story = await getAuthorStory(storyId, author.id);

  if (!story) {
    return { error: "Story not found for this author." };
  }

  const title = getStringValue(formData, "title");
  const genre = getStringValue(formData, "genre") || "Fantasy";
  const description = getStringValue(formData, "description");
  const coverDirection = getStringValue(formData, "coverDirection");
  const coverTheme = normalizeCoverTheme(getStringValue(formData, "coverTheme"));
  const status = normalizeStoryStatus(getStringValue(formData, "status"));

  if (!title) {
    return { error: "Story title is required." };
  }

  await prisma.story.update({
    where: {
      id: story.id,
    },
    data: {
      title,
      genre,
      description,
      coverImage: coverDirection || null,
      coverTheme,
      status,
    },
  });

  revalidateStoryWorkflows(story.id, story.slug);

  return {
    message: status === StoryStatus.PUBLISHED ? "Story saved and published." : "Story saved as a private draft.",
  };
}

export async function createChapter(
  storyId: string,
  _prevState: StoryEditorActionState,
  formData: FormData
): Promise<StoryEditorActionState> {
  const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
  const story = await getAuthorStory(storyId, author.id);

  if (!story) {
    return { error: "Story not found for this author." };
  }

  const title = getStringValue(formData, "chapterTitle");
  const content = normalizeChapterContent(getStringValue(formData, "chapterContent"));

  if (!title) {
    return { error: "Chapter title is required." };
  }

  if (isChapterContentEmpty(content)) {
    return { error: "Chapter content is required." };
  }

  try {
    const result = await prisma.$transaction(
      async (tx) => {
        const existingDuplicate = await tx.chapter.findFirst({
          where: {
            storyId: story.id,
            title,
            content,
          },
          select: {
            id: true,
          },
        });

        if (existingDuplicate) {
          return "duplicate";
        }

        const lastChapter = await tx.chapter.findFirst({
          where: {
            storyId: story.id,
          },
          orderBy: [
            { chapterNumber: "desc" },
            { createdAt: "desc" },
            { id: "desc" },
          ],
          select: {
            chapterNumber: true,
          },
        });

        await tx.chapter.create({
          data: {
            storyId: story.id,
            title,
            content,
            chapterNumber: (lastChapter?.chapterNumber ?? 0) + 1,
            estimatedReadTime: getEstimatedReadTime(content),
          },
        });

        return "created";
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable }
    );

    if (result === "duplicate") {
      return { message: "That chapter is already in this story." };
    }
  } catch (error) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      (error.code === "P2002" || error.code === "P2034")
    ) {
      return {
        error:
          "Another chapter save finished at the same time. Refresh the story and try again if the new chapter is missing.",
      };
    }

    throw error;
  }

  revalidateStoryWorkflows(story.id, story.slug);

  return { message: "Chapter added." };
}

export async function updateChapter(
  storyId: string,
  chapterId: string,
  _prevState: StoryEditorActionState,
  formData: FormData
): Promise<StoryEditorActionState> {
  const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
  const story = await getAuthorStory(storyId, author.id);

  if (!story) {
    return { error: "Story not found for this author." };
  }

  const chapter = await prisma.chapter.findFirst({
    where: {
      id: chapterId,
      storyId: story.id,
    },
    select: {
      id: true,
    },
  });

  if (!chapter) {
    return { error: "Chapter not found for this story." };
  }

  const title = getStringValue(formData, "chapterTitle");
  const content = normalizeChapterContent(getStringValue(formData, "chapterContent"));

  if (!title) {
    return { error: "Chapter title is required." };
  }

  if (isChapterContentEmpty(content)) {
    return { error: "Chapter content is required." };
  }

  await prisma.chapter.update({
    where: {
      id: chapter.id,
    },
    data: {
      title,
      content,
      estimatedReadTime: getEstimatedReadTime(content),
    },
  });

  revalidateStoryWorkflows(story.id, story.slug);

  return { message: "Chapter saved." };
}

export async function deleteChapter(
  storyId: string,
  chapterId: string,
  _prevState: StoryEditorActionState,
  _formData: FormData
): Promise<StoryEditorActionState> {
  void _prevState;
  void _formData;

  const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
  const story = await getAuthorStory(storyId, author.id);

  if (!story) {
    return { error: "Story not found for this author." };
  }

  const [chapter, chapterCount] = await Promise.all([
    prisma.chapter.findFirst({
      where: {
        id: chapterId,
        storyId: story.id,
      },
      include: {
        _count: {
          select: {
            comments: true,
          },
        },
      },
    }),
    prisma.chapter.count({
      where: {
        storyId: story.id,
      },
    }),
  ]);

  if (!chapter) {
    return { error: "Chapter not found for this story." };
  }

  if (chapterCount <= 1) {
    return { error: "A story needs at least one chapter." };
  }

  if (chapter._count.comments > 0) {
    return { error: "Chapters with reader notes cannot be deleted safely." };
  }

  await prisma.$transaction([
    prisma.chapter.delete({
      where: {
        id: chapter.id,
      },
    }),
    prisma.chapter.updateMany({
      where: {
        storyId: story.id,
        chapterNumber: {
          gt: chapter.chapterNumber,
        },
      },
      data: {
        chapterNumber: {
          decrement: 1,
        },
      },
    }),
  ]);

  revalidateStoryWorkflows(story.id, story.slug);

  return { message: "Chapter deleted." };
}

export async function toggleReaderNoteHelpful(
  storyId: string,
  commentId: string,
  _prevState: StoryEditorActionState,
  _formData: FormData
): Promise<StoryEditorActionState> {
  void _prevState;
  void _formData;

  const author = await requireAuthor(`/studio/stories/${storyId}/edit`);
  const story = await getAuthorStory(storyId, author.id);

  if (!story) {
    return { error: "Story not found for this author." };
  }

  const comment = await prisma.comment.findFirst({
    where: {
      id: commentId,
      storyId: story.id,
    },
    select: {
      id: true,
      isHelpful: true,
    },
  });

  if (!comment) {
    return { error: "Reader note not found for this story." };
  }

  const updatedComment = await prisma.comment.update({
    where: {
      id: comment.id,
    },
    data: {
      isHelpful: !comment.isHelpful,
    },
    select: {
      isHelpful: true,
    },
  });

  revalidateStoryWorkflows(story.id, story.slug);

  return {
    message: updatedComment.isHelpful
      ? "Reader note marked helpful."
      : "Reader note unmarked.",
  };
}
