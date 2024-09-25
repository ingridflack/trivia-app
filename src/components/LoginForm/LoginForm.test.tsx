import { render, fireEvent, cleanup } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

import LoginForm, { LoginFormProps } from ".";
import { FieldErrors } from "react-hook-form";
import { LoginFormValues } from "../../pages/Login";

const setup = (props: Partial<LoginFormProps> = {}) =>
  render(
    <LoginForm
      onSubmit={vi.fn()}
      errors={{}}
      register={vi.fn()}
      isSubmitting={false}
      {...props}
    />
  );

const formFieldsData = [
  {
    errors: { email: { message: "Invalid email address" } },
    name: "email",
    regex: /invalid email address/i,
  },
  {
    errors: { password: { message: "Invalid password" } },
    name: "password",
    regex: /invalid password/i,
  },
];

describe("LoginForm", () => {
  afterEach(() => {
    cleanup();
  });

  it("should match the snapshot", () => {
    const { container } = setup();
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
    const button = getByRole("button", { name: /sign in/i });
    expect(button).toHaveProperty("disabled", true);
  });

  formFieldsData.forEach(({ errors, name, regex }) => {
    it(`should display the ${name} error message when it's invalid`, () => {
      const props = { errors: errors as FieldErrors<LoginFormValues> };
      const { getByText } = setup(props);
      expect(getByText(regex)).toBeTruthy();
    });
  });
});
