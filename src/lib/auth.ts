import "server-only";

import { createHmac, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { UserRole } from "@prisma/client";

import { prisma } from "@/lib/prisma";

const AUTHOR_SESSION_COOKIE = "storyverse_author";
const fallbackAuthorEmail = "author@storyverse.dev";

export type AuthorSession = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

function getSessionSecret() {
  if (process.env.AUTHOR_SESSION_SECRET) {
    return process.env.AUTHOR_SESSION_SECRET;
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("AUTHOR_SESSION_SECRET is required for author sessions.");
  }

  return "storyverse-local-author-session";
}

export function getAuthorEmail() {
  return process.env.AUTHOR_EMAIL ?? fallbackAuthorEmail;
}

export function getAuthorName() {
  return process.env.AUTHOR_NAME ?? "StoryVerse Author";
}

function signSession(email: string) {
  return createHmac("sha256", getSessionSecret()).update(email).digest("hex");
}

function isEqual(a: string, b: string) {
  const left = Buffer.from(a);
  const right = Buffer.from(b);

  return left.length === right.length && timingSafeEqual(left, right);
}

export function createAuthorSessionValue(email: string) {
  return `${email}.${signSession(email)}`;
}

export function verifyAuthorPassword(password: string) {
  const expectedPassword = process.env.AUTHOR_LOGIN_PASSWORD;

  if (!expectedPassword) {
    return false;
  }

  return isEqual(password, expectedPassword);
}

export async function setAuthorSession(email: string) {
  const cookieStore = await cookies();

  cookieStore.set({
    name: AUTHOR_SESSION_COOKIE,
    value: createAuthorSessionValue(email),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAuthorSession() {
  const cookieStore = await cookies();
  cookieStore.delete(AUTHOR_SESSION_COOKIE);
}

export async function getAuthorSession(): Promise<AuthorSession | null> {
  const cookieStore = await cookies();
  const sessionValue = cookieStore.get(AUTHOR_SESSION_COOKIE)?.value;

  if (!sessionValue) {
    return null;
  }

  const separatorIndex = sessionValue.lastIndexOf(".");

  if (separatorIndex === -1) {
    return null;
  }

  const email = sessionValue.slice(0, separatorIndex);
  const signature = sessionValue.slice(separatorIndex + 1);

  if (!isEqual(signature, signSession(email))) {
    return null;
  }

  const user = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  });

  if (!user || (user.role !== UserRole.AUTHOR && user.role !== UserRole.ADMIN)) {
    return null;
  }

  return user;
}

export async function requireAuthor(next = "/studio") {
  const session = await getAuthorSession();

  if (!session) {
    redirect(`/author/login?next=${encodeURIComponent(next)}`);
  }

  return session;
}
