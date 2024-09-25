import SendEmailForm, { SendEmailFormProps } from "./SendEmailForm";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { FieldErrors } from "react-hook-form";
import { afterEach, describe, expect, it, vi } from "vitest";
import { SendEmailFormValues } from "../../pages/RequestResetPasswordLink";

const setup = (props: Partial<SendEmailFormProps> = {}) =>
  render(
    <SendEmailForm
      onSubmit={vi.fn()}
      errors={{}}
      register={vi.fn()}
      isSubmitting={false}
      successfullySent={false}
      {...props}
    />
  );

describe("SendEmailForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should render success message when email is sent successfully", () => {
    const { container } = setup({ successfullySent: true });
    expect(container).toMatchSnapshot();
  });

  it("displays email error message when email is invalid", () => {
    const props = {
      errors: {
        email: { message: "Invalid email address" },
      } as FieldErrors<SendEmailFormValues>,
      regex: /invalid email address/i,
    };

    const { getByText } = setup(props);
    expect(getByText(props.regex)).toBeTruthy();
  });

  it("should call onSubmit when the form is submitted", () => {
    const mockOnSubmit = vi.fn();
    const { getByRole } = setup({ onSubmit: mockOnSubmit });

    fireEvent.submit(getByRole("form"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should render the button in loading state when isSubmitting is true", () => {
    const { getByRole } = setup({ isSubmitting: true });
    const button = getByRole("button", { name: /send/i });
    expect(button).toHaveProperty("disabled", true);
  });
});
