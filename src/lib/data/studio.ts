import "server-only";

import { StoryStatus } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type StudioStoryStatus = "Draft" | "Published" | "Needs Review";

export type StudioStory = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  status: StudioStoryStatus;
  progress: number;
  updatedAt: string;
  chapterLabel: string;
  note: string;
};

export type StudioStat = {
  label: string;
  value: string;
  detail: string;
};

export type StudioNote = {
  id: string;
  reader: string;
  storyTitle: string;
  chapterTitle: string | null;
  excerpt: string;
  receivedAt: string;
};

export type StudioFeedbackNote = {
  id: string;
  reader: string;
  content: string;
  isHelpful: boolean;
  receivedAt: string;
  chapterId: string | null;
  chapterTitle: string | null;
  chapterNumber: number | null;
};

export type EditableChapter = {
  id: string;
  title: string;
  chapterNumber: number;
  content: string;
  estimatedReadTime: string | null;
  wordCount: number;
  commentCount: number;
};

export type EditableStory = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  description: string;
  coverDirection: string;
  coverTheme: string;
  status: StoryStatus;
  chapters: EditableChapter[];
  readerNotes: StudioFeedbackNote[];
};

function formatStatus(status: StoryStatus): StudioStoryStatus {
  if (status === StoryStatus.PUBLISHED) {
    return "Published";
  }

  if (status === StoryStatus.NEEDS_REVIEW) {
    return "Needs Review";
  }

  return "Draft";
}

function progressForStatus(status: StoryStatus) {
  if (status === StoryStatus.PUBLISHED) {
    return 100;
  }

  if (status === StoryStatus.NEEDS_REVIEW) {
    return 78;
  }

  return 35;
}

function relativeDate(date: Date) {
  const diffMs = Date.now() - date.getTime();
  const diffMinutes = Math.max(1, Math.floor(diffMs / 60000));

  if (diffMinutes < 60) {
    return `Updated ${diffMinutes} min ago`;
  }

  const diffHours = Math.floor(diffMinutes / 60);

  if (diffHours < 24) {
    return `Updated ${diffHours} hr ago`;
  }

  const diffDays = Math.floor(diffHours / 24);
  return `Updated ${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

export async function getStudioDashboard(authorId: string) {
  const [statusCounts, readerNotesCount, stories, recentComments] = await Promise.all([
    prisma.story.groupBy({
      by: ["status"],
      where: { authorId },
      _count: {
        _all: true,
      },
    }),
    prisma.comment.count({
      where: {
        story: {
          authorId,
        },
      },
    }),
    prisma.story.findMany({
      where: { authorId },
      include: {
        _count: {
          select: {
            chapters: true,
            comments: true,
          },
        },
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: 6,
    }),
    prisma.comment.findMany({
      where: {
        story: {
          authorId,
        },
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        story: {
          select: {
            title: true,
          },
        },
        chapter: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 4,
    }),
  ]);

  const countByStatus = new Map(
    statusCounts.map((count) => [count.status, count._count._all])
  );

  const stats: StudioStat[] = [
    {
      label: "Draft stories",
      value: String(countByStatus.get(StoryStatus.DRAFT) ?? 0),
      detail: "Private author workspace",
    },
    {
      label: "Published stories",
      value: String(countByStatus.get(StoryStatus.PUBLISHED) ?? 0),
      detail: "Visible in public library",
    },
    {
      label: "Needs review",
      value: String(countByStatus.get(StoryStatus.NEEDS_REVIEW) ?? 0),
      detail: "Queued for author polish",
    },
    {
      label: "Reader notes",
      value: String(readerNotesCount),
      detail: "Across authored stories",
    },
  ];

  return {
    stats,
    stories: stories.map<StudioStory>((story) => ({
      id: story.id,
      slug: story.slug,
      title: story.title,
      genre: story.genre,
      status: formatStatus(story.status),
      progress: progressForStatus(story.status),
      updatedAt: relativeDate(story.updatedAt),
      chapterLabel: `${story._count.chapters} chapter${story._count.chapters === 1 ? "" : "s"}`,
      note:
        story.description ||
        `${story._count.comments} reader note${story._count.comments === 1 ? "" : "s"} collected.`,
    })),
    notes: recentComments.map<StudioNote>((comment) => ({
      id: comment.id,
      reader: comment.user?.name ?? "Anonymous reader",
      storyTitle: comment.story.title,
      chapterTitle: comment.chapter?.title ?? null,
      excerpt: comment.content,
      receivedAt: relativeDate(comment.createdAt).replace("Updated", "Received"),
    })),
  };
}

export async function getEditableStory(authorId: string, storyId: string) {
  const story = await prisma.story.findFirst({
    where: {
      id: storyId,
      authorId,
    },
    include: {
      chapters: {
        include: {
          _count: {
            select: {
              comments: true,
            },
          },
        },
        orderBy: {
          chapterNumber: "asc",
        },
      },
      comments: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
          chapter: {
            select: {
              id: true,
              title: true,
              chapterNumber: true,
            },
          },
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  if (!story) {
    return null;
  }

  return {
    id: story.id,
    slug: story.slug,
    title: story.title,
    genre: story.genre,
    description: story.description,
    coverDirection: story.coverImage ?? "",
    coverTheme: story.coverTheme ?? "terracotta",
    status: story.status,
    chapters: story.chapters.map<EditableChapter>((chapter) => ({
      id: chapter.id,
      title: chapter.title,
      chapterNumber: chapter.chapterNumber,
      content: chapter.content,
      estimatedReadTime: chapter.estimatedReadTime,
      wordCount: countWords(chapter.content),
      commentCount: chapter._count.comments,
    })),
    readerNotes: story.comments.map<StudioFeedbackNote>((comment) => ({
      id: comment.id,
      reader: comment.user?.name ?? "Anonymous reader",
      content: comment.content,
      isHelpful: comment.isHelpful,
      receivedAt: relativeDate(comment.createdAt).replace("Updated", "Received"),
      chapterId: comment.chapter?.id ?? null,
      chapterTitle: comment.chapter?.title ?? null,
      chapterNumber: comment.chapter?.chapterNumber ?? null,
    })),
  } satisfies EditableStory;
}
