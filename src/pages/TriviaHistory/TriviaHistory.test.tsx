import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import TriviaHistory from ".";
import {
  cleanup,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import * as TriviaService from "../../services/triviaService";

vi.mock("../../services/triviaService");

describe("TriviaHistory", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot when trivia history is present", async () => {
    (TriviaService.getTriviaHistory as Mock).mockResolvedValue({
      data: {
        triviaHistory: [
          {
            trivia: {
              _id: "trivia1",
              category: "1",
              createdAt: "2023-10-01T00:00:00Z",
              difficulty: "easy",
              score: 5,
              status: "completed",
            },
            items: [
              {
                _id: "item1",
                answerTime: 30,
                isCorrect: true,
                question: { question: "Question 1?" },
              },
              {
                _id: "item2",
                answerTime: 20,
                isCorrect: false,
                question: { question: "Question 2?" },
              },
            ],
            completed: true,
          },
        ],
      },
    });

    const { container, queryByText } = render(
      <MemoryRouter>
        <TriviaHistory />
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() =>
      queryByText(/Your trivia history is empty/)
    );

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when trivia history is empty", async () => {
    (TriviaService.getTriviaHistory as Mock).mockResolvedValue({
      data: {
        triviaHistory: [],
      },
    });

    const { container, queryByText } = render(
      <MemoryRouter>
        <TriviaHistory />
      </MemoryRouter>
    );

    expect(queryByText(/Your trivia history is empty/)).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
});
