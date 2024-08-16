import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as AuthService from "../services/authService";

interface LoginFormValues {
  email: string;
  password: string;
}

export default function LoginForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const { data } = await AuthService.login(values);
      localStorage.setItem("token", data.token);
      localStorage.setItem("userData", JSON.stringify(data.user));

      toast({
        title: "Logged in",
        description: "You have been logged in.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/trivia/config");
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

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <FormControl isInvalid={!!errors.email} maxWidth="400px">
        <FormLabel htmlFor="email" fontSize="small" marginBottom="4px">
          Email address
        </FormLabel>
        <Input
          type="email"
          placeholder="Email"
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

      <FormControl isInvalid={!!errors.password} maxWidth="400px">
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
        maxWidth="400px"
        marginTop="16px"
        isLoading={isSubmitting}
        type="submit"
      >
        Login
      </Button>
    </form>
  );
}
