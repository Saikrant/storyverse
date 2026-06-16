import { BookOpen, MessageCircle, Sparkles } from "lucide-react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type BookCardProps = {
  title: string;
  author: string;
  genre: string;
  description: string;
  tone: "terracotta" | "gold" | "library";
  chapters: number;
  comments: number;
};

const toneClasses: Record<BookCardProps["tone"], string> = {
  terracotta: "from-terracotta to-primary",
  gold: "from-gold to-terracotta",
  library: "from-library to-primary",
};

export function BookCard({
  title,
  author,
  genre,
  description,
  tone,
  chapters,
  comments,
}: BookCardProps) {
  return (
    <Card className="border-border/80 bg-card/90 shadow-[0_18px_50px_oklch(0.205_0.023_52.2_/_0.08)] transition-transform duration-300 hover:-translate-y-1">
      <CardHeader className="gap-4">
        <div className="flex items-start justify-between gap-4">
          <div
            className={cn(
              "relative h-36 w-24 shrink-0 overflow-hidden rounded-md bg-linear-to-br shadow-lg",
              toneClasses[tone]
            )}
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 left-0 w-4 bg-black/15" />
            <div className="absolute inset-x-4 top-5 h-px bg-white/35" />
            <div className="absolute inset-x-5 bottom-5 h-12 rounded-sm border border-white/35" />
          </div>
          <Badge variant="secondary" className="rounded-full border border-border/70 bg-secondary/80 text-secondary-foreground">
            {genre}
          </Badge>
        </div>
        <div>
          <CardTitle className="text-xl font-semibold leading-snug text-foreground">
            {title}
          </CardTitle>
          <p className="mt-1 text-sm text-muted-foreground">by {author}</p>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </CardContent>
      <CardFooter className="mt-auto justify-between border-t border-border/70 text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <BookOpen className="size-3.5" aria-hidden="true" />
          {chapters} chapters
        </span>
        <span className="inline-flex items-center gap-1.5">
          <MessageCircle className="size-3.5" aria-hidden="true" />
          {comments} notes
        </span>
        <span className="inline-flex items-center gap-1.5 text-terracotta">
          <Sparkles className="size-3.5" aria-hidden="true" />
          Featured
        </span>
      </CardFooter>
    </Card>
  );
}
