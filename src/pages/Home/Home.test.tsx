import { cleanup, render, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, Mock, vi } from "vitest";
import useAuth from "../../hooks/useAuth";
import { MemoryRouter } from "react-router-dom";
import Home from ".";
import * as TriviaService from "../../services/triviaService";

vi.mock("../../hooks/useAuth");
vi.mock("../../services/triviaService");

describe("Home", () => {
  afterEach(() => {
    cleanup();
  });

  const userDataMock = {
    name: "testUser",
    username: "testUsername",
    id: "testId",
    avatar: "testAvatar.png",
  };

  it("should match the snapshot when userData is present and has pending trivia", async () => {
    (useAuth as Mock).mockReturnValue({
      userData: userDataMock,
    });

    (TriviaService.getPendingTrivia as Mock).mockResolvedValue({
      data: {
        pendingTrivia: [
          {
            trivia: {
              _id: "trivia1",
              category: "1",
              difficulty: "easy",
              users: [
                {
                  _id: "testId",
                  username: "testUsername",
                  avatar: "testAvatar.png",
                },
              ],
            },
            completed: false,
          },
        ],
      },
    });

    const { container, getByText } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    await waitFor(() => {
      const heading = getByText(/Pending trivias/);
      expect(heading).toBeTruthy();
    });

    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when userData is absent", () => {
    (useAuth as Mock).mockReturnValue({
      userData: null,
    });

    const { container } = render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
