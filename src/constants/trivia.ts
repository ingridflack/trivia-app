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