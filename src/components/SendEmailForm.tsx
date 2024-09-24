import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  Text,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { SendEmailFormValues } from "../pages/RequestResetPasswordLink";

interface SendEmailFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  successfullySent: boolean;
  isSubmitting: boolean;
  errors: FieldErrors<SendEmailFormValues>;
  register: UseFormRegister<SendEmailFormValues>;
}

export default function SendEmailForm({
  onSubmit,
  successfullySent,
  isSubmitting,
  errors,
  register,
}: SendEmailFormProps) {
  if (successfullySent) {
    return (
      <Text color="gray.600">
        Email sent successfully. Please check your inbox.
      </Text>
    );
  }

  return (
    <Stack as="form" onSubmit={onSubmit} gap="16px" maxWidth="400px">
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

      <Button
        colorScheme="purple"
        size="lg"
        width="100%"
        isLoading={isSubmitting}
        type="submit"
      >
        Send
      </Button>
    </Stack>
  );
}
