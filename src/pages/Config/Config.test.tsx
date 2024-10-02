import { describe, expect, it } from "vitest";
import Config from ".";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("Config", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Config />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
