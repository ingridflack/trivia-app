import { afterEach, describe, expect, it, vi } from "vitest";
import SignUpForm, { SignUpFormProps } from ".";
import { cleanup, fireEvent, render, renderHook } from "@testing-library/react";

import { FieldErrors, useForm } from "react-hook-form";
import { SignUpValues } from "../../pages/SignUp";

const { result } = renderHook(() => useForm());

const setup = (props: Partial<SignUpFormProps> = {}) =>
  render(
    <SignUpForm
      onSubmit={vi.fn()}
      errors={{}}
      register={vi.fn()}
      isSubmitting={false}
      // @ts-expect-error- ignore the error for the purpose of the test
      control={result.current.control}
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
    errors: { name: { message: "Name is required" } },
    name: "name",
    regex: /name is required/i,
  },
  {
    errors: { username: { message: "username is required" } },
    name: "username",
    regex: /username is required/i,
  },
  {
    errors: { password: { message: "Invalid password" } },
    name: "password",
    regex: /invalid password/i,
  },
  {
    errors: { avatar: { message: "Invalid avatar" } },
    name: "avatar",
    regex: /invalid avatar/i,
  },
  {
    errors: {
      passwordConfirmation: { message: "Invalid password confirmation" },
    },
    name: "passwordConfirmation",
    regex: /invalid password confirmation/i,
  },
];

describe("SignUpForm", () => {
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
    const button = getByRole("button", { name: /sign Up/i });
    expect(button).toHaveProperty("disabled", true);
  });

  formFieldsData.forEach(({ errors, name, regex }) => {
    it(`should display the ${name} error message when it's invalid`, () => {
      const props = { errors: errors as FieldErrors<SignUpValues> };
      const { getByText } = setup(props);
      expect(getByText(regex)).toBeTruthy();
    });
  });
});
