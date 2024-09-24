import SendEmailForm from "./SendEmailForm";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  cleanup,
} from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockOnSubmit = vi.fn();

const setup = (errors = {}, isSubmitting = false) => {
  const register = vi.fn();

  render(
    <SendEmailForm
      onSubmit={mockOnSubmit}
      errors={errors}
      register={register}
      isSubmitting={isSubmitting}
      successfullySent={false}
    />
  );
};

describe("SendEmailForm", () => {
  setup();

  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = render(
      <SendEmailForm
        onSubmit={mockOnSubmit}
        errors={{}}
        register={vi.fn()}
        isSubmitting={false}
        successfullySent={false}
      />
    );

    expect(container).toMatchSnapshot();
  });

  it("displays email error message when email is invalid", () => {
    setup({ email: { message: "Invalid email address" } });
    expect(screen.getByText(/invalid email address/i)).toBeTruthy();
  });

  it("calls onSubmit when form is submitted", async () => {
    setup();
    fireEvent.submit(screen.getByRole("form"));
    await waitFor(() => expect(mockOnSubmit).toHaveBeenCalled());
  });

  it("button is loading when isSubmitting is true", () => {
    setup({}, true);
    expect(screen.getByRole("button", { name: /send/i })).toHaveProperty(
      "disabled",
      true
    );
  });

  it("should render success message when email is sent successfully", () => {
    const { container } = render(
      <SendEmailForm
        onSubmit={mockOnSubmit}
        errors={{}}
        register={vi.fn()}
        isSubmitting={false}
        successfullySent={true}
      />
    );

    expect(container).toMatchSnapshot();
  });
});
