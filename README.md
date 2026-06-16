# StoryVerse

StoryVerse is a Next.js App Router project for a premium story publishing and reading experience. The current UI uses static sample data for the homepage, library, story detail pages, reader, Studio dashboard, and editor.

The Prisma database layer is prepared for the next phase, but the UI is intentionally not connected to Prisma yet.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Database Setup

StoryVerse is PostgreSQL-ready through Prisma. The app does not require a real `DATABASE_URL` for `npm run build` because the current UI still renders from static sample data.

1. Create a local environment file:

```bash
cp .env.example .env
```

2. Update `.env` with your PostgreSQL connection string:

```bash
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
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

6. Optionally inspect the database:

```bash
npm run prisma:studio
```

## Current Data Flow

- `src/lib/sample-stories.ts` powers the public story UI.
- `src/lib/studio-sample.ts` powers the Studio preview UI.
- `prisma/schema.prisma` and `prisma/seed.ts` prepare the database foundation for a later integration pass.
- `src/lib/prisma.ts` exposes a safe Prisma client singleton for future server-side data access.

Authentication, real AI enhancement calls, and form persistence are intentionally not implemented yet.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
