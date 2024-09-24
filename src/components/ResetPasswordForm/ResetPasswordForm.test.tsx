import {
  render,
  fireEvent,
  waitFor,
  cleanup,
  screen,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ResetPasswordForm from ".";

const mockOnSubmit = vi.fn();

const setup = (errors = {}, isSubmitting = false) => {
  const register = vi.fn();

  render(
    <ResetPasswordForm
      onSubmit={mockOnSubmit}
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
      token="valid-token"
    />
  );
};

describe("ResetPasswordForm", () => {
  setup();

  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = render(
      <ResetPasswordForm
        onSubmit={mockOnSubmit}
        errors={{}}
        register={vi.fn()}
        isSubmitting={false}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("displays password error message when password is invalid", () => {
    setup({ password: { message: "Invalid password" } });
    expect(screen.getByText(/invalid password/i)).toBeTruthy();
  });

  it("displays passwordConfirmation error message when passwordConfirmation is invalid", () => {
    setup({
      passwordConfirmation: { message: "Invalid password confirmation" },
    });
    expect(screen.getByText(/invalid password confirmation/i)).toBeTruthy();
  });

  it("calls onSubmit when form is submitted", async () => {
    setup();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("button is loading when isSubmitting is true", () => {
    setup({}, true);
    expect(screen.getByRole("button", { name: /reset/i })).toHaveProperty(
      "disabled",
      true
    );
  });

  it("should render invalid token message when token is invalid", () => {
    const { container } = render(
      <ResetPasswordForm
        onSubmit={mockOnSubmit}
        errors={{}}
        register={vi.fn()}
        isSubmitting={false}
        token=""
      />
    );

    expect(container).toMatchSnapshot();
  });
});
