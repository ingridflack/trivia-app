import { describe, expect, it } from "vitest";
import Trivia from ".";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Trivia", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Trivia />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
