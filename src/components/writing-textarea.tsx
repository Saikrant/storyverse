"use client";

import UnderlineExtension from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Heading1,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Minus,
  Quote,
  RemoveFormatting,
  Underline,
} from "lucide-react";
import type { ComponentType } from "react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type WritingEditorChangeEvent = {
  target: {
    value: string;
  };
};

type WritingTextareaProps = {
  name: string;
  value?: string;
  defaultValue?: string;
  onChange?: (event: WritingEditorChangeEvent) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
};

type ToolbarItem = {
  label: string;
  icon: ComponentType<{ className?: string; "aria-hidden"?: boolean }>;
  isActive: () => boolean;
  run: () => void;
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function hasHtmlTags(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

function formatInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/&lt;u&gt;([\s\S]+?)&lt;\/u&gt;/gi, "<u>$1</u>");
}

function markdownTextToHtml(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((block) => block.trim())
    .filter(Boolean)
    .map((block) => {
      if (/^##\s+/.test(block)) {
        return `<h2>${formatInlineMarkdown(block.replace(/^##\s+/, ""))}</h2>`;
      }

      if (/^#\s+/.test(block)) {
        return `<h1>${formatInlineMarkdown(block.replace(/^#\s+/, ""))}</h1>`;
      }

      if (/^>\s?/.test(block)) {
        return `<blockquote><p>${formatInlineMarkdown(block.replace(/^>\s?/gm, ""))}</p></blockquote>`;
      }

      if (/^(-{3,}|\*{3,}|_{3,})$/.test(block)) {
        return "<hr>";
      }

      if (block.split("\n").every((line) => /^[-*]\s+/.test(line.trim()))) {
        const items = block
          .split("\n")
          .map((line) => `<li>${formatInlineMarkdown(line.trim().replace(/^[-*]\s+/, ""))}</li>`)
          .join("");
        return `<ul>${items}</ul>`;
      }

      if (block.split("\n").every((line) => /^\d+\.\s+/.test(line.trim()))) {
        const items = block
          .split("\n")
          .map((line) => `<li>${formatInlineMarkdown(line.trim().replace(/^\d+\.\s+/, ""))}</li>`)
          .join("");
        return `<ol>${items}</ol>`;
      }

      return `<p>${formatInlineMarkdown(block).replace(/\n/g, "<br>")}</p>`;
    })
    .join("");
}

function contentToEditorHtml(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  return hasHtmlTags(trimmed) ? trimmed : markdownTextToHtml(trimmed);
}

function htmlForStorage(editor: NonNullable<ReturnType<typeof useEditor>>) {
  return editor.isEmpty ? "" : editor.getHTML();
}

export function WritingTextarea({
  name,
  value,
  defaultValue = "",
  onChange,
  required,
  placeholder = "Begin writing...",
  className,
}: WritingTextareaProps) {
  const initialContent = contentToEditorHtml(value ?? defaultValue);
  const [htmlValue, setHtmlValue] = useState(initialContent);
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2],
        },
      }),
      UnderlineExtension,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class:
          "min-h-[24rem] px-5 py-5 font-heading text-lg leading-8 outline-none prose-editor",
      },
    },
    immediatelyRender: false,
    onUpdate: ({ editor: currentEditor }) => {
      const nextValue = htmlForStorage(currentEditor);

      setHtmlValue(nextValue);
      onChange?.({ target: { value: nextValue } });
    },
  });

  useEffect(() => {
    if (!editor || value === undefined) {
      return;
    }

    const nextContent = contentToEditorHtml(value);

    if (nextContent !== editor.getHTML()) {
      editor.commands.setContent(nextContent, { emitUpdate: false });
      window.requestAnimationFrame(() => {
        setHtmlValue(value.trim() ? editor.getHTML() : "");
      });
    }
  }, [editor, value]);

  useEffect(() => {
    if (!editor) {
      return;
    }

    const currentEditor = editor;
    const form = currentEditor.view.dom.closest("form");

    function handleReset() {
      window.requestAnimationFrame(() => {
        currentEditor.commands.clearContent();
        setHtmlValue("");
        onChange?.({ target: { value: "" } });
      });
    }

    form?.addEventListener("reset", handleReset);

    return () => {
      form?.removeEventListener("reset", handleReset);
    };
  }, [editor, onChange]);

  const toolbarItems: ToolbarItem[] = editor
    ? [
        {
          label: "Bold",
          icon: Bold,
          isActive: () => editor.isActive("bold"),
          run: () => editor.chain().focus().toggleBold().run(),
        },
        {
          label: "Italic",
          icon: Italic,
          isActive: () => editor.isActive("italic"),
          run: () => editor.chain().focus().toggleItalic().run(),
        },
        {
          label: "Underline",
          icon: Underline,
          isActive: () => editor.isActive("underline"),
          run: () => editor.chain().focus().toggleUnderline().run(),
        },
        {
          label: "Heading 1",
          icon: Heading1,
          isActive: () => editor.isActive("heading", { level: 1 }),
          run: () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
        },
        {
          label: "Heading 2",
          icon: Heading2,
          isActive: () => editor.isActive("heading", { level: 2 }),
          run: () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
        },
        {
          label: "Bulleted list",
          icon: List,
          isActive: () => editor.isActive("bulletList"),
          run: () => editor.chain().focus().toggleBulletList().run(),
        },
        {
          label: "Numbered list",
          icon: ListOrdered,
          isActive: () => editor.isActive("orderedList"),
          run: () => editor.chain().focus().toggleOrderedList().run(),
        },
        {
          label: "Quote",
          icon: Quote,
          isActive: () => editor.isActive("blockquote"),
          run: () => editor.chain().focus().toggleBlockquote().run(),
        },
        {
          label: "Divider",
          icon: Minus,
          isActive: () => false,
          run: () => editor.chain().focus().setHorizontalRule().run(),
        },
        {
          label: "Clear formatting",
          icon: RemoveFormatting,
          isActive: () => false,
          run: () => editor.chain().focus().clearNodes().unsetAllMarks().run(),
        },
      ]
    : [];

  return (
    <div className={cn("relative", className)}>
      <input
        type="hidden"
        name={name}
        value={htmlValue}
        required={required}
        aria-hidden="true"
      />
      <div className="overflow-hidden rounded-2xl border border-input bg-background/70 shadow-inner focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <div
          className="flex flex-wrap gap-1 border-b border-border/70 bg-card/80 p-2"
          aria-label="Chapter formatting toolbar"
        >
          {toolbarItems.map((item) => {
            const Icon = item.icon;
            const active = item.isActive();

            return (
              <Button
                key={item.label}
                type="button"
                variant={active ? "secondary" : "ghost"}
                size="icon"
                className={cn(
                  "size-9 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground",
                  active && "text-foreground"
                )}
                aria-label={item.label}
                aria-pressed={active}
                title={item.label}
                onClick={item.run}
              >
                <Icon className="size-4" aria-hidden />
              </Button>
            );
          })}
        </div>
        <div className="relative">
          {editor?.isEmpty ? (
            <p className="pointer-events-none absolute left-5 top-5 font-heading text-lg leading-8 text-muted-foreground/75">
              {placeholder}
            </p>
          ) : null}
          <EditorContent editor={editor} />
        </div>
      </div>
    </div>
  );
}
