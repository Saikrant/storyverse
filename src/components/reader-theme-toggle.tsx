"use client";

import { Moon, Sun, Sunrise } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type ReaderTheme = "light" | "sepia" | "dark";

const themes: Array<{
  value: ReaderTheme;
  label: string;
  icon: typeof Sun;
}> = [
  { value: "light", label: "Light", icon: Sun },
  { value: "sepia", label: "Sepia", icon: Sunrise },
  { value: "dark", label: "Dark", icon: Moon },
];

type ReaderThemeToggleProps = {
  value: ReaderTheme;
  onChange: (theme: ReaderTheme) => void;
};

export function ReaderThemeToggle({ value, onChange }: ReaderThemeToggleProps) {
  return (
    <div className="inline-flex rounded-full border border-border/70 bg-card/80 p-1 shadow-sm">
      {themes.map((theme) => {
        const Icon = theme.icon;

        return (
          <Button
            key={theme.value}
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onChange(theme.value)}
            className={cn(
              "h-9 rounded-full px-3 text-xs",
              value === theme.value
                ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                : "text-muted-foreground"
            )}
            aria-pressed={value === theme.value}
          >
            <Icon className="size-3.5" aria-hidden="true" />
            {theme.label}
          </Button>
        );
      })}
    </div>
  );
}
