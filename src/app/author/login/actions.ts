"use server";

import { redirect } from "next/navigation";

import {
  getAuthorEmail,
  setAuthorSession,
  verifyAuthorPassword,
} from "@/lib/auth";
import { isDatabaseUnavailableError, logDatabaseUnavailable } from "@/lib/database-errors";
import { prisma } from "@/lib/prisma";

export type LoginActionState = {
  error?: string;
};

function getStringValue(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
}

function getSafeNextPath(value: string) {
  return value.startsWith("/") && !value.startsWith("//") ? value : "/studio";
}

export async function loginAuthor(
  _prevState: LoginActionState,
  formData: FormData
): Promise<LoginActionState> {
  const password = getStringValue(formData, "password");
  const next = getSafeNextPath(getStringValue(formData, "next"));
  const authorEmail = getAuthorEmail();

  if (!password) {
    return { error: "Enter the author workspace password." };
  }

  if (!verifyAuthorPassword(password)) {
    return { error: "That password does not unlock the author workspace." };
  }

  let author;

  try {
    author = await prisma.user.findUnique({
      where: { email: authorEmail },
      select: {
        email: true,
        role: true,
      },
    });
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      logDatabaseUnavailable("loginAuthor", error);
      return { error: "Studio could not connect to the library database. Please try again." };
    }

    throw error;
  }

  if (!author || (author.role !== "AUTHOR" && author.role !== "ADMIN")) {
    return { error: "The configured author user was not found. Check AUTHOR_EMAIL or run the demo cleanup/setup script." };
  }

  await setAuthorSession(author.email);
  redirect(next);
}
