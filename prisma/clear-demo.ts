import "dotenv/config";

import { PrismaClient, UserRole } from "@prisma/client";

const prisma = new PrismaClient();

const ownerAuthorEmail = process.env.AUTHOR_EMAIL ?? "author@storyverse.dev";
const ownerAuthorName = process.env.AUTHOR_NAME ?? "StoryVerse Author";

async function main() {
  console.warn(
    "Clearing demo/test content: enhancements, comments, chapters, and stories will be deleted."
  );

  await prisma.$transaction([
    prisma.enhancement.deleteMany(),
    prisma.comment.deleteMany(),
    prisma.chapter.deleteMany(),
    prisma.story.deleteMany(),
  ]);

  await prisma.user.updateMany({
    where: {
      role: UserRole.AUTHOR,
      email: {
        not: ownerAuthorEmail,
      },
    },
    data: {
      role: UserRole.READER,
    },
  });

  await prisma.user.upsert({
    where: {
      email: ownerAuthorEmail,
    },
    update: {
      name: ownerAuthorName,
      role: UserRole.AUTHOR,
    },
    create: {
      name: ownerAuthorName,
      email: ownerAuthorEmail,
      role: UserRole.AUTHOR,
    },
  });

  console.log(`Demo content cleared. AUTHOR user is ready at ${ownerAuthorEmail}.`);
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
