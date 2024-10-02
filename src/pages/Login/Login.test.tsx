import { describe, expect, it } from "vitest";
import Login from ".";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Login", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
