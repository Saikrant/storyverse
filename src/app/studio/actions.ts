"use server";

import { StoryStatus } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { clearAuthorSession, requireAuthor } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export type StoryEditorActionState = {
  error?: string;
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
  return value.split(/\s+/).filter(Boolean).length;
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
  const chapterContent = getStringValue(formData, "chapterContent");

  if (!title) {
    return { error: "Story title is required." };
  }

  if (!chapterTitle) {
    return { error: "Chapter title is required." };
  }

  if (!chapterContent) {
    return { error: "Chapter content is required." };
  }

  const slug = await getUniqueSlug(title);
  const status = intent === "publish" ? StoryStatus.PUBLISHED : StoryStatus.DRAFT;

  await prisma.story.create({
    data: {
      authorId: author.id,
      title,
      slug,
      genre,
      description,
      coverTheme,
      coverImage: coverDirection,
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

  redirect("/studio");
}
