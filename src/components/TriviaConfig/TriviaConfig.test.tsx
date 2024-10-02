import { cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import TriviaConfig, { TriviaConfigProps } from ".";

import { FieldErrors } from "react-hook-form";
import { GameConfigValues } from "../../pages/Config";

const formFieldsData = [
  {
    errors: { category: { message: "Invalid category" } },
    name: "category",
    regex: /invalid category/i,
  },
  {
    errors: { amount: { message: "amount is required" } },
    name: "amount",
    regex: /amount is required/i,
  },
  {
    errors: { gameMode: { message: "Invalid gameMode" } },
    name: "gameMode",
    regex: /invalid gameMode/i,
  },
  {
    errors: { difficulty: { message: "Invalid difficulty" } },
    name: "difficulty",
    regex: /invalid difficulty/i,
  },
];

const setup = (props: Partial<TriviaConfigProps> = {}) =>
  render(
    <TriviaConfig
      onLoadUsers={vi.fn()}
      onInviteUser={vi.fn()}
      onGameModeChange={vi.fn()}
      onSubmit={vi.fn()}
      errors={{}}
      isSubmitting={false}
      register={vi.fn()}
      gameMode="single"
      invitedUsers={[]}
      {...props}
    />
  );

describe("TriviaConfig", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("renders category select", () => {
    const { getByLabelText } = setup();
    expect(getByLabelText(/Category/i)).toBeTruthy();
  });

  it("renders difficulty select", () => {
    const { getByLabelText } = setup();
    expect(getByLabelText(/Difficulty/i)).toBeTruthy();
  });

  it("renders amount select", () => {
    const { getByLabelText } = setup();
    expect(getByLabelText(/Number of questions/i)).toBeTruthy();
  });

  it("renders game mode select", () => {
    const { getByLabelText } = setup();
    expect(getByLabelText(/Game mode/i)).toBeTruthy();
  });

  it("renders Start trivia button in single mode", () => {
    const { getByRole } = setup();
    expect(getByRole("button", { name: /Start trivia/i })).toBeTruthy();
  });

  it("renders Start trivia button in multi mode", () => {
    const { getByRole } = setup({ gameMode: "multi" });
    expect(getByRole("button", { name: /Start game/i })).toBeTruthy();
  });

  it("should call onSubmit when the form is submitted", () => {
    const mockOnSubmit = vi.fn();
    const { getByRole } = setup({ onSubmit: mockOnSubmit });

    fireEvent.submit(getByRole("form"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("calls onGameModeChange when game mode is changed", () => {
    const onGameModeChange = vi.fn();
    const { getByRole, getByLabelText } = setup({ onGameModeChange });

    const gameModeSelect = getByLabelText(/Game mode/i, { selector: "select" });
    fireEvent.change(gameModeSelect, { target: { value: "multi" } });

    const startTriviaButton = getByRole("button", { name: /Start trivia/i });
    fireEvent.click(startTriviaButton);

    expect(onGameModeChange).toHaveBeenCalledWith("multi");
  });

  formFieldsData.forEach(({ errors, name, regex }) => {
    it(`should display the ${name} error message when it's invalid`, () => {
      const props = { errors: errors as FieldErrors<GameConfigValues> };
      const { getByText } = setup(props);
      expect(getByText(regex)).toBeTruthy();
    });
  });
});
