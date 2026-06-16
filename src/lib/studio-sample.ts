import { sampleStories } from "@/lib/sample-stories";

export type StudioStoryStatus = "Draft" | "Published" | "Needs Review";

export type StudioStory = {
  id: string;
  title: string;
  genre: string;
  status: StudioStoryStatus;
  progress: number;
  updatedAt: string;
  chapterLabel: string;
  note: string;
};

export type StudioNote = {
  id: string;
  reader: string;
  storyTitle: string;
  excerpt: string;
  receivedAt: string;
};

export const studioStories: StudioStory[] = [
  {
    id: sampleStories[5].id,
    title: sampleStories[5].title,
    genre: sampleStories[5].genre,
    status: "Draft",
    progress: 62,
    updatedAt: "Updated today",
    chapterLabel: "Chapter 3 draft",
    note: "Opening arc is ready for a full continuity pass.",
  },
  {
    id: sampleStories[2].id,
    title: sampleStories[2].title,
    genre: sampleStories[2].genre,
    status: "Published",
    progress: 100,
    updatedAt: "Published 4 days ago",
    chapterLabel: "24 chapters live",
    note: "Complete season available in the public library.",
  },
  {
    id: sampleStories[4].id,
    title: sampleStories[4].title,
    genre: sampleStories[4].genre,
    status: "Needs Review",
    progress: 78,
    updatedAt: "Review queued",
    chapterLabel: "Chapter 12 polish",
    note: "Reader notes point to pacing questions near the midpoint.",
  },
];

export const studioNotes: StudioNote[] = [
  {
    id: "note-avery-lantern",
    reader: "Avery",
    storyTitle: "The Lantern Archive",
    excerpt: "The hidden archive feels cinematic. I wanted one more beat before the bell reveal.",
    receivedAt: "12 min ago",
  },
  {
    id: "note-mika-cinder",
    reader: "Mika",
    storyTitle: "The Cinder Court",
    excerpt: "The courtroom ghost has a sharp voice. This would make a strong featured excerpt.",
    receivedAt: "1 hr ago",
  },
  {
    id: "note-ren-paper",
    reader: "Ren",
    storyTitle: "Paper Stars at Noon",
    excerpt: "The sisters already feel distinct. Elsie's point of view is the one I would follow next.",
    receivedAt: "Yesterday",
  },
];

export const studioStats = [
  {
    label: "Draft stories",
    value: "3",
    detail: "2 active this week",
  },
  {
    label: "Published stories",
    value: "6",
    detail: "Static library previews",
  },
  {
    label: "Reader notes",
    value: "710",
    detail: "Across sample books",
  },
  {
    label: "AI suggestions",
    value: "24",
    detail: "Mock enhancement queue",
  },
];
