import sanitizeHtml from "sanitize-html";

const allowedTags = [
  "blockquote",
  "br",
  "em",
  "h1",
  "h2",
  "hr",
  "li",
  "ol",
  "p",
  "strong",
  "u",
  "ul",
];

const emptyHtmlPattern = /^(<p>\s*(<br>)?\s*<\/p>\s*)+$/i;

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

function plainTextToHtml(value: string) {
  return value
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("");
}

function markdownTextToHtml(value: string) {
  const lines = value.replace(/\r\n/g, "\n").split("\n");
  const blocks: string[] = [];
  let index = 0;

  while (index < lines.length) {
    const trimmed = lines[index].trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (/^(-{3,}|\*{3,}|_{3,})$/.test(trimmed)) {
      blocks.push("<hr>");
      index += 1;
      continue;
    }

    const heading = /^(#{1,2})\s+(.+)$/.exec(trimmed);
    if (heading) {
      const tag = heading[1].length === 1 ? "h1" : "h2";
      blocks.push(`<${tag}>${formatInlineMarkdown(heading[2])}</${tag}>`);
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];
      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }
      blocks.push(`<blockquote><p>${formatInlineMarkdown(quoteLines.join(" "))}</p></blockquote>`);
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(`<li>${formatInlineMarkdown(lines[index].trim().replace(/^[-*]\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ul>${items.join("")}</ul>`);
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(`<li>${formatInlineMarkdown(lines[index].trim().replace(/^\d+\.\s+/, ""))}</li>`);
        index += 1;
      }
      blocks.push(`<ol>${items.join("")}</ol>`);
      continue;
    }

    const paragraphLines: string[] = [];
    while (index < lines.length && lines[index].trim()) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }
    blocks.push(`<p>${formatInlineMarkdown(paragraphLines.join(" "))}</p>`);
  }

  return blocks.join("");
}

function formatInlineMarkdown(value: string) {
  return escapeHtml(value)
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/\*([^*]+)\*/g, "<em>$1</em>")
    .replace(/&lt;u&gt;([\s\S]+?)&lt;\/u&gt;/gi, "<u>$1</u>");
}

export function sanitizeChapterHtml(value: string) {
  return sanitizeHtml(value, {
    allowedTags,
    allowedAttributes: {},
    disallowedTagsMode: "discard",
    enforceHtmlBoundary: true,
  }).trim();
}

export function normalizeChapterContent(value: string) {
  const trimmed = value.trim();

  if (!trimmed) {
    return "";
  }

  const html = hasHtmlTags(trimmed) ? trimmed : markdownTextToHtml(trimmed) || plainTextToHtml(trimmed);

  return sanitizeChapterHtml(html);
}

export function isChapterContentEmpty(value: string) {
  const normalized = normalizeChapterContent(value);

  if (!normalized || emptyHtmlPattern.test(normalized)) {
    return true;
  }

  return sanitizeHtml(normalized, {
    allowedTags: [],
    allowedAttributes: {},
  }).trim().length === 0;
}

export function getChapterPlainText(value: string) {
  const normalized = normalizeChapterContent(value);

  return sanitizeHtml(normalized, {
    allowedTags: [],
    allowedAttributes: {},
    textFilter: (text) => text.replace(/\s+/g, " "),
  }).trim();
}
