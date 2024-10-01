import { afterEach, describe, expect, it } from "vitest";
import QuestionItem from ".";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";
import { useForm } from "react-hook-form";

const { result } = renderHook(() => useForm());

describe("QuestionItem", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match snapshot", () => {
    const { container } = render(
      <QuestionItem
        question={{
          _id: "1",
          difficulty: "easy",
          question: "What is the capital of France?",
          answers: ["Paris", "London", "Berlin", "Madrid"],
        }}
        // @ts-expect-error- ignore the error for the purpose of the test
        control={result.current.control}
        errors={{}}
      />
    );
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when question is undefined", () => {
    const { container } = render(
      <QuestionItem
        question={undefined}
        // @ts-expect-error- ignore the error for the purpose of the test
        control={result.current.control}
        errors={{}}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("should render the question and answer options", () => {
    const { getByText, getAllByRole } = render(
      <QuestionItem
        question={{
          _id: "1",
          difficulty: "easy",
          question: "What is the capital of France?",
          answers: ["Paris", "London", "Berlin", "Madrid"],
        }}
        // @ts-expect-error- ignore the error for the purpose of the test
        control={result.current.control}
        errors={{}}
      />
    );

    expect(getByText(/What is the capital of France?/i)).toBeTruthy();
    expect(getAllByRole("radio")).toHaveLength(4);
  });

  it("should select the answer when the user clicks on an option", () => {
    const { getAllByRole } = render(
      <QuestionItem
        question={{
          _id: "1",
          difficulty: "easy",
          question: "What is the capital of France?",
          answers: ["Paris", "London", "Berlin", "Madrid"],
        }}
        // @ts-expect-error- ignore the error for the purpose of the test
        control={result.current.control}
        errors={{}}
      />
    );

    const options = getAllByRole("radio");
    const [paris, london, berlin, madrid] = options.map(
      (option) => option.parentElement
    );

    if (!paris || !london || !berlin || !madrid) {
      throw new Error("Option not found");
    }

    expect(paris.hasAttribute("data-checked")).toBeFalsy();
    expect(london.hasAttribute("data-checked")).toBeFalsy();
    expect(berlin.hasAttribute("data-checked")).toBeFalsy();
    expect(madrid.hasAttribute("data-checked")).toBeFalsy();

    fireEvent.click(paris);

    expect(paris.hasAttribute("data-checked")).toBeTruthy();
    expect(london.hasAttribute("data-checked")).toBeFalsy();
    expect(berlin.hasAttribute("data-checked")).toBeFalsy();
    expect(madrid.hasAttribute("data-checked")).toBeFalsy();
  });

  it("should render the error message when the user submits without selecting an answer", () => {
    const { getByText } = render(
      <QuestionItem
        question={{
          _id: "1",
          difficulty: "easy",
          question: "What is the capital of France?",
          answers: ["Paris", "London", "Berlin", "Madrid"],
        }}
        // @ts-expect-error- ignore the error for the purpose of the test
        control={result.current.control}
        errors={{
          answer: { type: "required", message: "This field is required" },
        }}
      />
    );

    expect(getByText(/This field is required/i)).toBeTruthy();
  });
});
