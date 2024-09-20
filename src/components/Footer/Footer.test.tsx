import { cleanup, render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, it, expect, afterEach } from "vitest";
import { Footer } from ".";

describe("Footer", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
