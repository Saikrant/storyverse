"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { StoryStatus, UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

export type ReaderNoteActionState = {
  error?: string;
  message?: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value.trim() : "";
}

export async function createReaderNote(
  slug: string,
  chapterId: string,
  _prevState: ReaderNoteActionState,
  formData: FormData
): Promise<ReaderNoteActionState> {
  const displayName = getStringValue(formData, "displayName");
  const content = getStringValue(formData, "content");

  if (displayName.length > 80) {
    return { error: "Display name must be 80 characters or fewer." };
  }

  if (!content) {
    return { error: "Please write a note before sending it." };
  }

  if (content.length > 1000) {
    return { error: "Reader notes must be 1000 characters or fewer." };
  }

  const story = await prisma.story.findFirst({
    where: {
      slug,
      status: StoryStatus.PUBLISHED,
      chapters: {
        some: {
          id: chapterId,
        },
      },
    },
    select: {
      id: true,
      slug: true,
    },
  });

  if (!story) {
    return { error: "This story is not available for public notes." };
  }

  const user = displayName
    ? await prisma.user.create({
        data: {
          name: displayName,
          email: `reader-note-${randomUUID()}@storyverse.local`,
          role: UserRole.READER,
        },
        select: {
          id: true,
        },
      })
    : null;

  await prisma.comment.create({
    data: {
      storyId: story.id,
      chapterId,
      userId: user?.id,
      content,
    },
  });

  revalidatePath(`/books/${story.slug}`);
  revalidatePath(`/books/${story.slug}/read`);
  revalidatePath("/studio");

  return { message: "Your note has been sent to the author." };
}
