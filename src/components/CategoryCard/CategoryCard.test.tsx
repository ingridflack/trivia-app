import { MemoryRouter } from "react-router-dom";
import { CategoryCard } from ".";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

describe("CategoryCard", () => {
  it("should match the snapshot", () => {
    const title = "Test Category";
    const icon = "test-icon.png";
    const color = "blue";

    const { container } = render(
      <MemoryRouter>
        <CategoryCard title={title} icon={icon} color={color} />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
