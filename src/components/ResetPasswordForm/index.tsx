import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { ResetPasswordFormValues } from "../../pages/ResetPassword";

interface ResetPasswordFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<ResetPasswordFormValues>;
  register: UseFormRegister<ResetPasswordFormValues>;
  isSubmitting: boolean;
  token?: string;
}

export default function ResetPasswordForm({
  onSubmit,
  errors,
  register,
  isSubmitting,
  token,
}: ResetPasswordFormProps) {
  if (!token) {
    return (
      <div>
        <p>Invalid token.</p>
      </div>
    );
  }

  return (
    <Stack
      as="form"
      onSubmit={onSubmit}
      gap="16px"
      maxWidth="400px"
      role="form"
    >
      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          placeholder="Password"
          id="password"
          {...register("password", {
            required: "Password is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.passwordConfirmation}>
        <FormLabel htmlFor="passwordConfirmation">
          Password confirmation
        </FormLabel>
        <Input
          type="password"
          placeholder="Password Confirmation"
          id="passwordConfirmation"
          {...register("passwordConfirmation", {
            required: "Password confirmation is required.",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            validate: {
              isEqual: (value, { password }) =>
                value !== password ? "The passwords do not match" : true,
            },
          })}
        />
        <FormErrorMessage>
          {errors.passwordConfirmation && errors.passwordConfirmation.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="purple"
        size="lg"
        width="100%"
        isLoading={isSubmitting}
        type="submit"
      >
        Reset
      </Button>
    </Stack>
  );
}
