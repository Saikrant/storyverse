import Link from "next/link";
import { Feather } from "lucide-react";

import { Button } from "@/components/ui/button";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 text-sm font-semibold tracking-wide text-foreground">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
            <Feather className="size-4" aria-hidden="true" />
          </span>
          <span>StoryVerse</span>
        </Link>
        <nav aria-label="Primary navigation" className="hidden items-center gap-6 text-sm text-muted-foreground sm:flex">
          <Link href="/books" className="transition-colors hover:text-foreground">
            Stories
          </Link>
          <Link href="/studio" className="transition-colors hover:text-foreground">
            Studio
          </Link>
          <Link href="/#ai" className="transition-colors hover:text-foreground">
            AI
          </Link>
        </nav>
        <Button asChild size="sm" className="rounded-full px-4">
          <Link href="/studio/editor">Start Writing</Link>
        </Button>
      </div>
    </header>
  );
}
