import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
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
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <FormControl isInvalid={!!errors.password}>
        <FormLabel
          marginTop="16px"
          htmlFor="password"
          fontSize="small"
          marginBottom="4px"
        >
          Password
        </FormLabel>
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
        <FormLabel
          marginTop="16px"
          htmlFor="passwordConfirmation"
          fontSize="small"
          marginBottom="4px"
        >
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
        maxWidth="400px"
        marginTop="16px"
        isLoading={isSubmitting}
        type="submit"
      >
        Reset
      </Button>
    </form>
  );
}
