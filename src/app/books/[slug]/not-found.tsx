import Link from "next/link";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

export default function StoryNotFound() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <SiteHeader />
      <main className="mx-auto flex w-full max-w-3xl flex-1 flex-col items-center justify-center px-5 py-20 text-center sm:px-8">
        <div className="rounded-[2rem] border border-border/80 bg-card/85 p-8 shadow-[0_24px_70px_oklch(0.205_0.023_52.2_/_0.1)] sm:p-10">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-terracotta">
            Missing shelf
          </p>
          <h1 className="mt-4 text-4xl font-semibold text-foreground">This story is not in the library.</h1>
          <p className="mt-4 text-base leading-7 text-muted-foreground">
            The sample catalog is static for now. Return to the library to choose one of the available StoryVerse previews.
          </p>
          <Button asChild className="mt-8 rounded-full px-6">
            <Link href="/books">Back to Library</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
