import Link from "next/link";
import { BookOpenCheck } from "lucide-react";

import { LoginForm } from "@/app/author/login/login-form";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isDatabaseUnavailableError } from "@/lib/database-errors";
import { getAuthorSession } from "@/lib/auth";

export const metadata = {
  title: "Author Login | StoryVerse",
  description: "Author workspace access for StoryVerse Studio.",
};

type LoginPageProps = {
  searchParams: Promise<{
    next?: string;
  }>;
};

function getSafeNextPath(value: string | undefined) {
  return value && value.startsWith("/") && !value.startsWith("//") ? value : "/studio";
}

export default async function AuthorLoginPage({ searchParams }: LoginPageProps) {
  let session = null;
  let databaseUnavailable = false;

  try {
    session = await getAuthorSession();
  } catch (error) {
    if (isDatabaseUnavailableError(error)) {
      databaseUnavailable = true;
    } else {
      throw error;
    }
  }

  const { next } = await searchParams;
  const nextPath = getSafeNextPath(next);

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="flex-1">
        <section className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-14 sm:px-8 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <Badge className="rounded-full bg-accent text-accent-foreground">
              Author workspace
            </Badge>
            <h1 className="mt-5 max-w-3xl text-5xl font-semibold leading-[1.02] text-foreground sm:text-6xl">
              Studio is reserved for the author.
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-muted-foreground">
              Readers can browse published stories without signing in. The Studio stays locked for drafting, publishing, and future author tools.
            </p>
            <Button asChild variant="outline" className="mt-6 rounded-full bg-background/70">
              <Link href="/books">Browse Stories</Link>
            </Button>
          </div>

          <div className="rounded-[1.5rem] border border-border/80 bg-card/85 p-6 shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.10)] sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
              <BookOpenCheck className="size-5" aria-hidden="true" />
            </span>
            <h2 className="mt-5 text-3xl font-semibold text-foreground">Unlock Studio</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Use the configured author password to continue to the private workspace.
            </p>
            {databaseUnavailable ? (
              <div className="mt-6 rounded-2xl border border-destructive/30 bg-destructive/10 p-4">
                <p className="text-sm leading-6 text-destructive">
                  Studio could not connect to the library database. Please try again.
                </p>
              </div>
            ) : session ? (
              <div className="mt-6 rounded-2xl bg-background/70 p-4">
                <p className="text-sm text-muted-foreground">
                  Signed in as <span className="font-medium text-foreground">{session.name}</span>.
                </p>
                <Button asChild className="mt-4 h-11 rounded-full px-5">
                  <Link href={nextPath}>Continue to Studio</Link>
                </Button>
              </div>
            ) : (
              <LoginForm next={nextPath} />
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
