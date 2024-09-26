export const ANSWER_TIME_LIMIT = 15;

export const DIFFICULTY_OPTIONS = [
  { value: "any", label: "Any" },
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

export const GAME_MODE_OPTIONS = [
  { value: "single", label: "Single player" },
  { value: "multi", label: "Multiplayer" },
];

export const AMOUNT_OPTIONS = [{ value: 5 }, { value: 10 }, { value: 15 }];

export const CATEGORY_LABELS: { [key: string]: string } = {
  9: "General Knowledge",
  10: "Entertainment: Books",
  31: "Entertainment: Japanese Anime & Manga",
  19: "Science: Mathematics",
  14: "Entertainment: Television",
};

export const CATEGORY_CARDS_DATA = [
  {
    title: "General Knowledge",
    icon: "/src/assets/general-knowledge.svg",
    color: "#abe885",
  },
  {
    title: "Books",
    icon: "/src/assets/books.svg",
    color: "#c88ab3",
  },
  {
    title: "Japanese Anime & Manga",
    icon: "/src/assets/japanese.svg",
    color: "#ffaf65",
  },
  {
    title: "Mathematics",
    icon: "/src/assets/math.svg",
    color: "#77ccf4",
  },
  {
    title: "Television",
    icon: "/src/assets/tv.svg",
    color: "#fe9295",
  },
];
