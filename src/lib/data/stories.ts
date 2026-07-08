import { StoryStatus as PrismaStoryStatus } from "@prisma/client";
import { connection } from "next/server";

import {
  isDatabaseUnavailableError,
  logDatabaseUnavailable,
} from "@/lib/database-errors";
import { normalizeChapterContent } from "@/lib/chapter-content";
import { prisma } from "@/lib/prisma";
import type {
  CoverTheme,
  ReaderNote,
  SampleStory,
  StoryChapter,
  StoryStatus,
} from "@/lib/sample-stories";

type StoryQueryOptions = {
  deferToRequest?: boolean;
};

export type StoryListResult = {
  stories: SampleStory[];
  unavailable: boolean;
};

export type StoryResult = {
  story: SampleStory | null;
  unavailable: boolean;
};

const coverThemes = new Set<CoverTheme>([
  "terracotta",
  "gold",
  "library",
  "olive",
  "rose",
  "ink",
]);

const coverAccents: Record<CoverTheme, string> = {
  terracotta: "Copper lanterns and velvet shadows",
  gold: "Gilded ink over rain-polished stone",
  library: "Deep orbit blue with archival silver",
  olive: "Pressed botanicals and field notes",
  rose: "Faded rose paper and salt air",
  ink: "Charcoal vellum and ember seals",
};

const defaultOptions: Required<StoryQueryOptions> = {
  deferToRequest: true,
};

function normalizeCoverTheme(theme: string | null): CoverTheme {
  return theme && coverThemes.has(theme as CoverTheme) ? (theme as CoverTheme) : "library";
}

function mapStoryStatus(status: PrismaStoryStatus): StoryStatus {
  return status === PrismaStoryStatus.PUBLISHED ? "Complete" : "Draft";
}

function mapChapter(chapter: {
  id: string;
  title: string;
  chapterNumber: number;
  content: string;
  estimatedReadTime: string | null;
  comments?: {
    id: string;
    content: string;
    isHelpful: boolean;
    createdAt: Date;
    user: {
      name: string;
    } | null;
  }[];
}): StoryChapter {
  return {
    id: chapter.id,
    title: chapter.title,
    chapterNumber: chapter.chapterNumber,
    content: normalizeChapterContent(chapter.content),
    estimatedReadTime: chapter.estimatedReadTime ?? "Preview chapter",
    readerNotes: chapter.comments?.map(mapReaderNote) ?? [],
  };
}

function mapReaderNote(comment: {
  id: string;
  content: string;
  isHelpful: boolean;
  createdAt: Date;
  user: {
    name: string;
  } | null;
}): ReaderNote {
  return {
    id: comment.id,
    reader: comment.user?.name ?? "Anonymous reader",
    content: comment.content,
    isHelpful: comment.isHelpful,
    createdAt: comment.createdAt.toISOString(),
  };
}

function mapStory(story: {
  id: string;
  slug: string;
  title: string;
  genre: string;
  description: string;
  coverTheme: string | null;
  status: PrismaStoryStatus;
  author: {
    name: string;
  };
  chapters: {
    id: string;
    title: string;
    chapterNumber: number;
    content: string;
    estimatedReadTime: string | null;
    comments?: {
      id: string;
      content: string;
      isHelpful: boolean;
      createdAt: Date;
      user: {
        name: string;
      } | null;
    }[];
  }[];
  _count: {
    chapters: number;
    comments: number;
  };
}): SampleStory {
  const theme = normalizeCoverTheme(story.coverTheme);

  return {
    id: story.id,
    slug: story.slug,
    title: story.title,
    genre: story.genre,
    description: story.description,
    author: story.author.name,
    chapterCount: story._count.chapters,
    readerNotes: story._count.comments,
    status: mapStoryStatus(story.status),
    cover: {
      theme,
      accent: coverAccents[theme],
    },
    chapters: story.chapters.map(mapChapter),
  };
}

async function maybeDeferToRequest(options?: StoryQueryOptions) {
  const { deferToRequest } = { ...defaultOptions, ...options };

  if (deferToRequest) {
    await connection();
  }
}

export async function getPublishedStories(options?: StoryQueryOptions) {
  await maybeDeferToRequest(options);

  try {
    const stories = await prisma.story.findMany({
      where: {
        status: PrismaStoryStatus.PUBLISHED,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        chapters: {
          include: {
            comments: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 12,
            },
          },
          orderBy: [
            { chapterNumber: "asc" },
            { createdAt: "asc" },
            { id: "asc" },
          ],
        },
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
    });

    return {
      stories: stories.map(mapStory),
      unavailable: false,
    } satisfies StoryListResult;
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      logDatabaseUnavailable("getPublishedStories", error);
      return { stories: [], unavailable: true } satisfies StoryListResult;
    }

    throw error;
  }
}

export async function getStoryBySlug(slug: string, options?: StoryQueryOptions) {
  await maybeDeferToRequest(options);

  try {
    const story = await prisma.story.findFirst({
      where: {
        slug,
        status: PrismaStoryStatus.PUBLISHED,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        chapters: {
          include: {
            comments: {
              include: {
                user: {
                  select: {
                    name: true,
                  },
                },
              },
              orderBy: {
                createdAt: "desc",
              },
              take: 12,
            },
          },
          orderBy: [
            { chapterNumber: "asc" },
            { createdAt: "asc" },
            { id: "asc" },
          ],
        },
        _count: {
          select: {
            chapters: true,
            comments: true,
          },
        },
      },
    });

    return {
      story: story ? mapStory(story) : null,
      unavailable: false,
    } satisfies StoryResult;
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      logDatabaseUnavailable("getStoryBySlug", error);
      return { story: null, unavailable: true } satisfies StoryResult;
    }

    throw error;
  }
}

export async function getFeaturedStories(options?: StoryQueryOptions) {
  await maybeDeferToRequest(options);

  try {
    const stories = await prisma.story.findMany({
      where: {
        status: PrismaStoryStatus.PUBLISHED,
      },
      include: {
        author: {
          select: {
            name: true,
          },
        },
        chapters: {
          orderBy: [
            { chapterNumber: "asc" },
            { createdAt: "asc" },
            { id: "asc" },
          ],
        },
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
      take: 3,
    });

    return {
      stories: stories.map(mapStory),
      unavailable: false,
    } satisfies StoryListResult;
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      logDatabaseUnavailable("getFeaturedStories", error);
      return { stories: [], unavailable: true } satisfies StoryListResult;
    }

    throw error;
  }
}
