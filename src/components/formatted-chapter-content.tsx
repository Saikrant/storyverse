import { cn } from "@/lib/utils";

type FormattedChapterContentProps = {
  content: string;
  className?: string;
};

export function FormattedChapterContent({ content, className }: FormattedChapterContentProps) {
  return (
    <div
      className={cn(
        "chapter-content mx-auto mt-10 max-w-2xl font-heading text-[1.25rem] leading-9 sm:text-[1.35rem] sm:leading-10",
        className
      )}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
