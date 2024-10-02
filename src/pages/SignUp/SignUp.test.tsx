import { describe, expect, it } from "vitest";
import SignUp from ".";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("SignUp", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
