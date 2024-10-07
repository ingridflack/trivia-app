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

export const TRIVIA_CATEGORIES: Record<
  number,
  {
    title: string;
    icon: string;
    color: string;
    params: {
      category: string;
      difficulty: string;
      type: string;
      amount: number;
    };
  }
> = {
  9: {
    title: "General Knowledge",
    icon: "/assets/general-knowledge.svg",
    color: "#abe885",
    params: { category: "9", difficulty: "any", type: "any", amount: 10 },
  },
  10: {
    title: "Books",
    icon: "/assets/books.svg",
    color: "#c88ab3",
    params: { category: "10", difficulty: "any", type: "any", amount: 10 },
  },
  31: {
    title: "Japanese Anime & Manga",
    icon: "/assets/japanese.svg",
    color: "#ffaf65",
    params: { category: "31", difficulty: "any", type: "any", amount: 10 },
  },
  19: {
    title: "Mathematics",
    icon: "/assets/math.svg",
    color: "#77ccf4",
    params: { category: "19", difficulty: "any", type: "any", amount: 10 },
  },
  14: {
    title: "Television",
    icon: "/assets/tv.svg",
    color: "#fe9295",
    params: { category: "14", difficulty: "any", type: "any", amount: 10 },
  },
};
