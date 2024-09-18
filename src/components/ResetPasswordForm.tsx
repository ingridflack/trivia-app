import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../services/authService";

import { useNavigate, useParams } from "react-router-dom";

interface ResetPasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPasswordForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordFormValues>();
  const toast = useToast();
  const navigate = useNavigate();
  const { token } = useParams();

  const onSubmit: SubmitHandler<ResetPasswordFormValues> = async (values) => {
    if (!token) return;

    try {
      await AuthService.resetPassword(token, values);

      toast({
        title: "Email sent.",
        description: "Check your inbox.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: "Unable to login.",
        status: "error",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

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
      onSubmit={handleSubmit(onSubmit)}
      gap="16px"
      maxWidth="400px"
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
