import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { LoginFormValues } from "../../pages/Login";
import { BaseSyntheticEvent } from "react";

interface LoginFormProps {
  onSubmit: (
    e?: BaseSyntheticEvent<object, unknown, unknown> | undefined
  ) => Promise<void>;
  errors: FieldErrors<LoginFormValues>;
  register: UseFormRegister<LoginFormValues>;
  isSubmitting: boolean;
}

export default function LoginForm({
  onSubmit,
  errors,
  register,
  isSubmitting,
}: LoginFormProps) {
  return (
    <Stack
      as="form"
      onSubmit={onSubmit}
      gap="16px"
      maxWidth="400px"
      role="form"
    >
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email address</FormLabel>
        <Input
          type="email"
          placeholder="Enter your email"
          id="email"
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        <FormErrorMessage>
          {errors.email && errors.email.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.password}>
        <FormLabel htmlFor="password">Password</FormLabel>
        <Input
          type="password"
          placeholder="Enter your password"
          id="password"
          {...register("password", {
            required: "Password is required.",
          })}
        />
        <FormErrorMessage>
          {errors.password && errors.password.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="purple"
        size="lg"
        width="100%"
        isLoading={isSubmitting}
        type="submit"
      >
        Sign in
      </Button>
    </Stack>
  );
}
