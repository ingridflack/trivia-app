import { FieldErrors } from "react-hook-form";
import { render, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import ResetPasswordForm, { ResetPasswordFormProps } from ".";
import { ResetPasswordFormValues } from "../../pages/ResetPassword";

const setup = (props: Partial<ResetPasswordFormProps> = {}) =>
  render(
    <ResetPasswordForm
      onSubmit={vi.fn()}
      errors={{}}
      register={vi.fn()}
      isSubmitting={false}
      token="valid-token"
      {...props}
    />
  );

const formFieldsData = [
  {
    errors: { password: { message: "Invalid password" } },
    name: "password",
    regex: /invalid password/i,
  },
  {
    errors: {
      passwordConfirmation: { message: "Invalid password confirmation" },
    },
    name: "passwordConfirmation",
    regex: /invalid password confirmation/i,
  },
];

describe("ResetPasswordForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = setup();
    expect(container).toMatchSnapshot();
  });

  it("should match the snapshot when the token is invalid", () => {
    const { container } = setup({ token: "" });
    expect(container).toMatchSnapshot();
  });

  it("should call onSubmit when the form is submitted", () => {
    const mockOnSubmit = vi.fn();
    const { getByRole } = setup({ onSubmit: mockOnSubmit });

    fireEvent.submit(getByRole("form"));
    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should render the button in loading state when isSubmitting is true", () => {
    const { getByRole } = setup({ isSubmitting: true });
    const button = getByRole("button", { name: /reset/i });
    expect(button).toHaveProperty("disabled", true);
  });

  formFieldsData.forEach(({ errors, name, regex }) => {
    it(`should display the ${name} error message when it's invalid`, () => {
      const props = { errors: errors as FieldErrors<ResetPasswordFormValues> };
      const { getByText } = setup(props);
      expect(getByText(regex)).toBeTruthy();
    });
  });
});
