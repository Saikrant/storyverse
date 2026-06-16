# StoryVerse

StoryVerse is a Next.js App Router project for a premium story publishing and reading experience. Public story pages read published stories from Prisma, while Studio is a private author workspace for drafting, publishing, and reviewing reader feedback.

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

5. For local demo/testing only, seed the database with fictional StoryVerse data:

```bash
npm run prisma:seed
```

The seed creates fictional demo stories only and one configured AUTHOR user from `AUTHOR_NAME` and `AUTHOR_EMAIL`. Do not run the seed on production after real author content has been added.

6. Optionally inspect the database:

```bash
npm run prisma:studio
```

## Production Content Rules

- Do not commit `.env`.
- Do not commit real stories, private drafts, or private author content.
- Use Studio (`/studio`) for real author content.
- Use `npm run prisma:seed` only for local demo/testing.
- Do not run seed on production after real stories exist.

## Clear Demo Content

The following command is destructive and should be run only when you intentionally want to remove demo/test content before launch:

```bash
npm run prisma:clear-demo
```

It deletes:

- enhancements
- comments
- chapters
- stories

It keeps or recreates the configured AUTHOR user from `AUTHOR_NAME` and `AUTHOR_EMAIL`. It does not run automatically.

## Current Data Flow

- `src/lib/data/stories.ts` powers the public library and only returns `PUBLISHED` stories.
- `src/lib/data/studio.ts` powers the protected Studio dashboard from Prisma.
- `src/app/studio/actions.ts` creates and updates draft or published stories, chapters, and Studio feedback markers.
- `src/app/books/actions.ts` lets public readers submit notes on published story chapters.
- `src/lib/auth.ts` provides the MVP author guard using an httpOnly signed cookie.
- `src/lib/sample-stories.ts` remains fictional demo content for local seeding.

Normal visitors can read public stories without logging in. Studio routes redirect to `/author/login` unless the configured author password has unlocked an AUTHOR or ADMIN user session.

Real private story content should be entered later through Studio and stored in the database, not committed to seed files or sample data.

## Surprise Reveal

The reveal page is available at:

```text
/surprise
```

It is intentionally route-only and not promoted in the main navigation.

## Deploy on Vercel

1. Push this repository to GitHub.
2. Import the GitHub repository in Vercel.
3. Add these environment variables in Vercel:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
AUTHOR_NAME="The Author Name"
AUTHOR_EMAIL="author@example.com"
AUTHOR_LOGIN_PASSWORD="set-a-private-author-password"
AUTHOR_SESSION_SECRET="set-a-long-random-session-secret"
```

4. Run Prisma migrations against the production database when needed:

```bash
npx prisma migrate deploy
```

5. If you seeded or tested production data before launch, intentionally clear demo/test content:

```bash
npm run prisma:clear-demo
```

6. Do not run `npm run prisma:seed` on production after real content has been added.
7. Give the author the `/author/login` URL and configured password, or send `/surprise` first for the reveal.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Deployment](https://vercel.com/docs)
