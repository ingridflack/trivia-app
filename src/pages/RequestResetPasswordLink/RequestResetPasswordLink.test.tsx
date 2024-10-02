import { describe, expect, it } from "vitest";
import RequestResetPasswordLink from ".";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

describe("RequestResetPasswordLink", () => {
  it("should match the snapshot", () => {
    const { container } = render(
      <MemoryRouter>
        <RequestResetPasswordLink />
      </MemoryRouter>
    );

    expect(container).toMatchSnapshot();
  });
});
