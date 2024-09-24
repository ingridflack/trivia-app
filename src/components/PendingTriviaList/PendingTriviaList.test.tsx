import { render } from "@testing-library/react";

import { describe, it, expect } from "vitest";
import { PendingTriviaList } from ".";
import { PendingTrivia } from "../../types/sharedTypes";

const mockPendingTriviaList: PendingTrivia[] = [
  {
    trivia: {
      category: "science",
      difficulty: "easy",
      users: [
        { username: "User1", _id: "1" },
        { username: "User2", _id: "2", avatar: "avatar1.png" },
      ],
      _id: "66c8f351942dd47ad29d4ba1",
    },
  },
  {
    trivia: {
      category: "history",
      difficulty: "medium",
      users: [
        { username: "User3", _id: "3" },
        { username: "User4", _id: "4", avatar: "avatar2.png" },
      ],
      _id: "66c8f351942dd47ad29d4ba2",
    },
  },
];

describe("PendingTriviaList", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <PendingTriviaList pendingTriviaList={mockPendingTriviaList} />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render the pending trivia list with the correct amount of items", () => {
    const { container } = render(
      <PendingTriviaList pendingTriviaList={mockPendingTriviaList} />
    );

    const pendingTriviaItems = container.querySelectorAll(".chakra-card");

    expect(pendingTriviaItems.length).toBe(mockPendingTriviaList.length);
  });
});
