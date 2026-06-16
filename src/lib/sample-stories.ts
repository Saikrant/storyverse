export type StoryTone = "terracotta" | "gold" | "library" | "olive" | "rose" | "ink";

export type SampleStory = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  description: string;
  author: string;
  chapterCount: number;
  status: "Featured" | "Serializing" | "Complete" | "Draft";
  tone: StoryTone;
  readerNotes: number;
};

export const sampleStories: SampleStory[] = [
  {
    id: "story-lantern-archive",
    slug: "the-lantern-archive",
    title: "The Lantern Archive",
    genre: "Fantasy",
    description:
      "A quiet archivist discovers a wing of living books, each rewriting itself as kingdoms fall asleep.",
    author: "Mira Vale",
    chapterCount: 18,
    status: "Featured",
    tone: "terracotta",
    readerNotes: 124,
  },
  {
    id: "story-letters-amberfall",
    slug: "letters-from-amberfall",
    title: "Letters from Amberfall",
    genre: "Romance",
    description:
      "Two rival columnists trade anonymous letters in a city where every promise is bound in gold ink.",
    author: "Theo Maren",
    chapterCount: 12,
    status: "Serializing",
    tone: "gold",
    readerNotes: 87,
  },
  {
    id: "story-ninth-moon",
    slug: "after-the-ninth-moon",
    title: "After the Ninth Moon",
    genre: "Science Fiction",
    description:
      "A generation ship librarian curates the last myths of Earth while teaching a new world how to dream.",
    author: "Sana Rook",
    chapterCount: 24,
    status: "Complete",
    tone: "library",
    readerNotes: 203,
  },
  {
    id: "story-foxglove-map",
    slug: "the-foxglove-map",
    title: "The Foxglove Map",
    genre: "Mystery",
    description:
      "A bookbinder inherits a botanical atlas whose pressed flowers point to unsolved disappearances.",
    author: "Iris Bell",
    chapterCount: 16,
    status: "Featured",
    tone: "olive",
    readerNotes: 96,
  },
  {
    id: "story-cinder-court",
    slug: "the-cinder-court",
    title: "The Cinder Court",
    genre: "Historical Fantasy",
    description:
      "In a royal city rebuilt after fire, an apprentice judge hears testimony from ghosts in the ash.",
    author: "Nolan Ash",
    chapterCount: 21,
    status: "Serializing",
    tone: "ink",
    readerNotes: 142,
  },
  {
    id: "story-paper-stars",
    slug: "paper-stars-at-noon",
    title: "Paper Stars at Noon",
    genre: "Literary",
    description:
      "Three sisters reopen their grandmother's seaside bookshop and uncover the lives hidden in its margins.",
    author: "Leah Oren",
    chapterCount: 9,
    status: "Draft",
    tone: "rose",
    readerNotes: 58,
  },
];

export const featuredStories = sampleStories.slice(0, 3);
