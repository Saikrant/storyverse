# StoryVerse

StoryVerse is a Next.js App Router project for a premium story publishing and reading experience. Public story pages read published stories from Prisma, while Studio is a private author workspace for drafting and publishing stories.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

StoryVerse is PostgreSQL-ready through Prisma. Public library and Studio routes use the configured database at request time.

1. Create a local environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
AUTHOR_NAME="StoryVerse Author"
AUTHOR_EMAIL="author@storyverse.dev"
AUTHOR_LOGIN_PASSWORD="set-a-private-password"
AUTHOR_SESSION_SECRET="set-a-long-random-session-secret"
```

Do not commit `.env`; it is ignored by git. `.env.example` is committed as the safe template.

3. Generate the Prisma client:

```bash
npm run prisma:generate
```

4. Create and apply a migration:

```bash
npm run prisma:migrate
```

5. Seed the database with sample StoryVerse data:

```bash
npm run prisma:seed
```

The seed creates fictional demo stories only and one configured AUTHOR user from `AUTHOR_NAME` and `AUTHOR_EMAIL`.

6. Optionally inspect the database:

```bash
npm run prisma:studio
```

## Current Data Flow

- `src/lib/data/stories.ts` powers the public library and only returns `PUBLISHED` stories.
- `src/lib/data/studio.ts` powers the protected Studio dashboard from Prisma.
- `src/app/studio/actions.ts` creates draft or published stories and first chapters from the Studio editor.
- `src/lib/auth.ts` provides the MVP author guard using an httpOnly signed cookie.
- `src/lib/sample-stories.ts` remains fictional demo content for seeding and static homepage shelves.

Normal visitors can read public stories without logging in. Studio routes redirect to `/author/login` unless the configured author password has unlocked an AUTHOR or ADMIN user session.

Real private story content should be entered later through Studio and stored in the database, not committed to seed files or sample data.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
