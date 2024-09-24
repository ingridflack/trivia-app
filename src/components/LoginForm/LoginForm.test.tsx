import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import LoginForm from ".";

const mockOnSubmit = vi.fn();

const setup = (errors = {}, isSubmitting = false) => {
  const register = vi.fn();
  render(
    <LoginForm
      onSubmit={mockOnSubmit}
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
    />
  );
};

describe("LoginForm", () => {
  setup();

  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = render(
      <LoginForm
        onSubmit={mockOnSubmit}
        errors={{}}
        register={vi.fn()}
        isSubmitting={false}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("displays email error message when email is invalid", () => {
    setup({ email: { message: "Invalid email address" } });
    expect(screen.getByText(/invalid email address/i)).toBeTruthy();
  });

  it("displays password error message when password is required", () => {
    setup({ password: { message: "Password is required." } });
    expect(screen.getByText(/password is required/i)).toBeTruthy();
  });

  it("calls onSubmit when form is submitted", async () => {
    setup();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("button is loading when isSubmitting is true", () => {
    setup({}, true);
    expect(screen.getByRole("button", { name: /sign in/i })).toHaveProperty(
      "disabled",
      true
    );
  });
});
