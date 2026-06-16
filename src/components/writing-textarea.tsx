import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type WritingTextareaProps = React.ComponentProps<typeof Textarea>;

export function WritingTextarea({ className, ...props }: WritingTextareaProps) {
  return (
    <Textarea
      className={cn(
        "min-h-[24rem] resize-y rounded-2xl bg-background/70 p-5 font-heading text-lg leading-8 shadow-inner placeholder:text-muted-foreground/75",
        className
      )}
      {...props}
    />
  );
}
