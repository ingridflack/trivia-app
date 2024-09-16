export const badgeColor = (difficulty?: string) => {
  console.log(difficulty);
  switch (difficulty) {
    case "easy":
      return "green";
    case "medium":
      return "orange";
    case "hard":
      return "red";
    default:
      return "gray";
  }
};
