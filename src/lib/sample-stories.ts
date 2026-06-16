export type CoverTheme = "terracotta" | "gold" | "library" | "olive" | "rose" | "ink";

export type StoryStatus = "Featured" | "Serializing" | "Complete" | "Draft";

export type StoryChapter = {
  id: string;
  title: string;
  chapterNumber: number;
  content: string;
  estimatedReadTime: string;
};

export type SampleStory = {
  id: string;
  slug: string;
  title: string;
  genre: string;
  description: string;
  author: string;
  chapterCount: number;
  readerNotes: number;
  status: StoryStatus;
  cover: {
    theme: CoverTheme;
    accent: string;
  };
  chapters: StoryChapter[];
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
    readerNotes: 124,
    status: "Featured",
    cover: {
      theme: "terracotta",
      accent: "Copper lanterns and velvet shadows",
    },
    chapters: [
      {
        id: "lantern-archive-1",
        title: "The Door That Remembered",
        chapterNumber: 1,
        estimatedReadTime: "7 min",
        content:
          "Elian Voss knew every ordinary door in the Royal Archive by the way its hinges complained. The maple door to census records sighed like a tired clerk. The iron door to treaties clicked twice before surrendering. The little green door to forgotten songs opened only when rain touched the west windows.\n\nThe door at the end of Aisle Thirteen had never made a sound because, until that morning, it had never existed.\n\nIt stood between shelves of provincial maps, narrow and black, with a brass lantern etched where a handle should have been. Elian set down his cart of repaired folios and watched the flame inside the etching tremble. No candle fed it. No draft moved through the aisle. Still, the small bright mark leaned toward him as if listening.\n\nFrom somewhere beyond the wood came the soft rustle of pages turning themselves.",
      },
      {
        id: "lantern-archive-2",
        title: "Books With Pulsebeats",
        chapterNumber: 2,
        estimatedReadTime: "8 min",
        content:
          "The hidden wing smelled of warm dust, lamp oil, and storms that had not yet arrived. Shelves climbed higher than the archive roof should have allowed, each one packed with books that shifted in their sleep. Some covers rose and fell like breathing chests. Others clicked their clasps in tiny impatient rhythms.\n\nElian lifted the nearest volume. Its title surfaced in gold across the leather: A History of the Kingdom Before It Falls Asleep. The final word had not finished writing itself. Ink gathered, hesitated, and drew a careful black p.\n\nHe opened to the last page and found today's date waiting there.\n\nBelow it, in a hand that looked painfully like his own, a sentence appeared: The archivist arrives too late unless he learns which stories are keeping the bells awake.",
      },
      {
        id: "lantern-archive-3",
        title: "The Bell Beneath the City",
        chapterNumber: 3,
        estimatedReadTime: "9 min",
        content:
          "At midnight, the city bells did not ring. They inhaled.\n\nEvery tower drew the same long metallic breath, and every citizen in the sleeping capital turned toward the palace hill. Elian stood in the archive courtyard with the living book pressed beneath his coat. The pages warmed his ribs with each pulse.\n\nThe book had given him one instruction: find the bell no tower admits to holding.\n\nHe followed the sound beneath the public square, past old cistern steps and a wall painted with names of queens who had ruled before memory became official. At the bottom, he found a bronze bell large enough to shelter a carriage. Its surface was covered in handwriting. Some lines were prayers. Some were confessions. One was a question addressed directly to him.\n\nElian Voss, what story would you give up to keep your kingdom awake?",
      },
    ],
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
    readerNotes: 87,
    status: "Serializing",
    cover: {
      theme: "gold",
      accent: "Gilded ink over rain-polished stone",
    },
    chapters: [
      {
        id: "amberfall-1",
        title: "A Column in Disguise",
        chapterNumber: 1,
        estimatedReadTime: "6 min",
        content:
          "The morning edition accused Celia Wren of being sentimental, careless, and devastatingly correct. She read the sentence three times over coffee gone cold, then checked the byline again.\n\nJulian Quill. Of course.\n\nHis column occupied the opposite page of The Amberfall Gazette, where he specialized in dismantling civic optimism with elegant cruelty. Celia specialized in rebuilding it before lunch. The city adored their rivalry. Her editor called it healthy circulation. Celia called it a headache in excellent tailoring.\n\nBy dusk, a letter waited on her desk, sealed with plain wax and addressed to no name at all. Inside, someone had written: Tell me one true thing about this city that you would never print.",
      },
      {
        id: "amberfall-2",
        title: "Gold Ink Does Not Lie",
        chapterNumber: 2,
        estimatedReadTime: "7 min",
        content:
          "In Amberfall, promises written in gold ink became legally inconvenient. They tugged at the wrist when broken and warmed when remembered. Sensible people used it for contracts, vows, and the occasional theatrical apology.\n\nCelia bought a bottle from a stationer who pretended not to recognize her.\n\nShe answered the anonymous letter on thick cream paper: The truest thing about this city is that everyone looks up at the clock tower when they are lonely, even if they are pretending to check the hour.\n\nThe ink flashed once. A promise, then. Not of love or loyalty, but of honesty. Celia sealed the envelope before she could lose her nerve and left it beneath the third lion at the Gazette entrance, exactly where the stranger had asked.",
      },
      {
        id: "amberfall-3",
        title: "The Man at the Third Lion",
        chapterNumber: 3,
        estimatedReadTime: "8 min",
        content:
          "Julian Quill arrived at the third lion twelve minutes before midnight and looked annoyed to find Celia already there.\n\nFor a moment, neither of them spoke. Rain freckled the pavement. The lion's stone mouth held her sealed letter between its teeth, gold promise humming through paper and wax.\n\nJulian glanced from the envelope to Celia's face, and the practiced severity in his expression did something unexpected. It failed.\n\n'Wren,' he said, softly enough that the rain nearly took it.\n\n'Quill,' she replied.\n\nAbove them, the clock tower began to strike twelve. Both of them looked up.",
      },
    ],
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
    readerNotes: 203,
    status: "Complete",
    cover: {
      theme: "library",
      accent: "Deep orbit blue with archival silver",
    },
    chapters: [
      {
        id: "ninth-moon-1",
        title: "The Myth Vault",
        chapterNumber: 1,
        estimatedReadTime: "7 min",
        content:
          "Nia kept the myths of Earth in a room colder than any weather her students had ever felt. The children came from hydroponic neighborhoods and engine-warm corridors. They knew rain as a lesson, oceans as blue archive footage, and wolves as creatures that had once been useful for metaphors.\n\nEvery seventh day, Nia unlocked the Myth Vault and let them choose one impossible thing.\n\nToday, a girl named Jun pointed at a file labeled moonrise.\n\n'Which moon?' Nia asked.\n\nJun frowned, because she had been born after landfall, beneath a sky with nine pale stones in it. 'The first one,' she said. 'The lonely one.'",
      },
      {
        id: "ninth-moon-2",
        title: "Gravity Lessons",
        chapterNumber: 2,
        estimatedReadTime: "8 min",
        content:
          "The colony's new planet was generous but strange. Seeds grew too quickly. Rivers changed their beds after listening to wind. The ninth moon crossed the sky only once each month, and when it did, every dream in the settlement became vivid enough to leave fingerprints.\n\nNia cataloged those dreams because no one else wanted the job.\n\nBy the third crossing, she had collected eighty-seven reports of the same woman standing beside an ocean none of the children had seen. The woman carried a library card from a city that had drowned two centuries before launch.\n\nOn the back, in ink that smelled faintly of salt, someone had written Nia's full name.",
      },
      {
        id: "ninth-moon-3",
        title: "A Shoreline for the Unborn",
        chapterNumber: 3,
        estimatedReadTime: "9 min",
        content:
          "Nia projected the ocean across the settlement dome at dawn.\n\nFor six minutes, every ceiling became water. Whales moved above the breakfast tables. Foam curled over schoolroom lights. The children stood very still, their faces silvered by a memory no one had personally earned.\n\nWhen the projection ended, Jun raised her hand.\n\n'Is a myth still true if it happened to someone else?'\n\nNia looked at the rows of young faces, at the nine moons fading behind the glass, at the planet waiting below with no patience for nostalgia. She thought of Earth, not as a grave, but as a sentence they were still learning how to finish.\n\n'Yes,' she said. 'But only if we make it useful.'",
      },
    ],
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
    readerNotes: 96,
    status: "Featured",
    cover: {
      theme: "olive",
      accent: "Pressed foxglove and field notes",
    },
    chapters: [
      {
        id: "foxglove-map-1",
        title: "Pressed Between Pages",
        chapterNumber: 1,
        estimatedReadTime: "7 min",
        content:
          "Mara Bellamy found the first clue because the dead woman's atlas had been bound incorrectly. Page forty-two sat where page fourteen should have been, stitched tight as if the mistake had paid rent.\n\nShe slid a bone folder beneath the seam and eased the paper open. A pressed foxglove fell onto her workbench, purple bells flattened thin enough to be translucent.\n\nBehind it, someone had drawn a map in brown ink.\n\nMara knew the lanes of Graymere by trade and grief. This map showed the same village, but with one difference: seven houses were marked with tiny black roots. Six had belonged to people who vanished before winter. The seventh was hers.",
      },
      {
        id: "foxglove-map-2",
        title: "The Garden Ledger",
        chapterNumber: 2,
        estimatedReadTime: "8 min",
        content:
          "The village solicitor insisted the atlas was worthless. He said this while refusing to touch it.\n\nMara carried it home beneath her coat and searched the remaining pages by candlelight. Each specimen hid a notation: foxglove for the missing baker, hemlock for the schoolmaster's wife, rosemary for a child everyone claimed had run away.\n\nAt the back, pasted under the endpaper, she found a ledger of gardening accounts. Soil, twine, seed, lime. Ordinary purchases except for the dates, which matched every disappearance.\n\nSomeone in Graymere had been burying secrets with horticultural precision.",
      },
      {
        id: "foxglove-map-3",
        title: "Roots After Rain",
        chapterNumber: 3,
        estimatedReadTime: "8 min",
        content:
          "Rain softened the churchyard enough for Mara to see where the earth had settled. Not over graves. Beside them.\n\nShe knelt near the oldest yew and brushed mud from a brass label pushed almost flat into the ground. The name engraved there was not a plant. It was a street: Tallow Lane.\n\nHer street.\n\nA twig cracked behind her. Mara rose with the atlas clutched to her chest and turned to find Reverend Hale holding an umbrella neither of them believed he had brought for kindness.\n\n'You should have left the flowers where they were,' he said.\n\nMara opened the atlas to the foxglove page and felt, for the first time since inheriting it, that the dead had not left her a warning. They had left her a witness.",
      },
    ],
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
    readerNotes: 142,
    status: "Serializing",
    cover: {
      theme: "ink",
      accent: "Charcoal vellum and ember seals",
    },
    chapters: [
      {
        id: "cinder-court-1",
        title: "Ash on the Witness Stand",
        chapterNumber: 1,
        estimatedReadTime: "7 min",
        content:
          "The first ghost appeared in Judge Sera Voln's courtroom as a column of ash and bad manners. It refused the oath, sneezed soot on the clerk, and accused the Crown of murder before anyone had asked its name.\n\nSera was only an apprentice judge, which meant she was supposed to sharpen quills, fetch statutes, and keep her opinions folded behind her teeth.\n\nInstead, she heard herself say, 'The witness will be permitted to continue.'\n\nEvery living advocate in the Cinder Court turned to stare. The ghost smiled with a mouth made of smoke.",
      },
      {
        id: "cinder-court-2",
        title: "The Law of Burned Things",
        chapterNumber: 2,
        estimatedReadTime: "8 min",
        content:
          "After the Great Fire, the city wrote new laws for buildings, markets, and the proper storage of lamp oil. No one wrote a law for the dead who lingered in the ash.\n\nSera found the omission in the restricted stacks, where old legal codes slept under red thread. Burned things, one statute claimed, could not testify because fire purified ownership.\n\nShe read the line twice, then crossed it out in pencil.\n\nBy morning, someone had crossed out her crossing out. Beneath it, in ash-gray script, a new sentence waited: Ask what the palace saved first.",
      },
      {
        id: "cinder-court-3",
        title: "Embers in the Evidence Room",
        chapterNumber: 3,
        estimatedReadTime: "9 min",
        content:
          "The evidence room beneath the court still smelled of smoke twenty years after the fire. Sera unlocked cabinet after cabinet until she found a crate labeled kitchen tiles.\n\nInside were not tiles. Inside were crowns.\n\nSmall coronets for children, blackened at the edges. A queen's circlet split by heat. A prince's practice crown wrapped in cloth that had once been blue.\n\nSera understood then why the ghost had come to court angry. The fire had not begun in the market, as every schoolbook claimed. It had begun in the nursery wing, and the city had been rebuilt on a verdict no one had dared to hold.",
      },
    ],
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
    readerNotes: 58,
    status: "Draft",
    cover: {
      theme: "rose",
      accent: "Faded rose paper and salt air",
    },
    chapters: [
      {
        id: "paper-stars-1",
        title: "The Shop With No Sign",
        chapterNumber: 1,
        estimatedReadTime: "6 min",
        content:
          "The bookshop had lost its sign in the same storm that took their grandmother's last good umbrella. For eleven years, tourists called it the place by the blue steps, and locals called it Ada's, even after Ada herself became a framed photograph beside the register.\n\nWhen the three Oren sisters returned to reopen it, they found paper stars folded from receipt tape hanging in every window.\n\nNone of them had made the stars.\n\nMabel wanted to take them down. Ruth wanted to count them. Elsie, who had inherited Ada's talent for touching a book and knowing whether someone had cried over it, unfolded the smallest star and found a sentence written inside: Start with the margins.",
      },
      {
        id: "paper-stars-2",
        title: "Marginalia",
        chapterNumber: 2,
        estimatedReadTime: "7 min",
        content:
          "Ada had believed bookmarks were lazy. She used postcards, bus tickets, pressed sea grass, grocery lists, and once, memorably, a parking citation. The sisters found them tucked into novels across the shop, each one marked with handwriting that was not always their grandmother's.\n\nIn a weathered copy of The Waves, Ruth found a note from their mother dated three months before she left town. In a cookbook, Mabel found a recipe annotated with apologies. Elsie found nothing addressed to her, which felt worse than accusation.\n\nBy closing time, the counter was covered in other people's unfinished conversations.",
      },
      {
        id: "paper-stars-3",
        title: "Noon Tide",
        chapterNumber: 3,
        estimatedReadTime: "8 min",
        content:
          "At noon, the tide came in too far.\n\nIt slipped under the bookshop door in one clear sheet, crossed the floorboards, and stopped at the poetry shelves. The sisters stood on chairs and watched paper stars tremble in the windows.\n\nThen every marked book opened at once.\n\nPages fluttered without wind. Notes rose like small white birds and arranged themselves above the counter into a map of the town: bakery, pier, cemetery, bus station, blue steps. Ada had not left them an inheritance. She had left them a route through every silence their family had mistaken for peace.\n\nElsie stepped down into the impossible water first.",
      },
    ],
  },
];

export const featuredStories = sampleStories.slice(0, 3);

export function getStoryBySlug(slug: string) {
  return sampleStories.find((story) => story.slug === slug);
}
