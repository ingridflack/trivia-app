import { describe, expect, it } from "vitest";
import ResetPassword from ".";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("ResetPassword", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <ResetPassword />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
