import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../services/authService";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { AVATAR_OPTIONS } from "../constants/user";

interface LoginFormValues {
  email: string;
  password: string;
  name: string;
  username: string;
  avatar?: string;
  passwordConfirmation: string;
}

export default function SignUpForm() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      await AuthService.register({
        ...values,
      });

      toast({
        title: "Account created",
        description: "Account created successfully. Please log in.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });

      navigate("/login");
    } catch (error) {
      console.log(error);

      toast({
        title: "Oops!",
        description: "Something went wrong. Try again.",
        status: "error",
        duration: 5000,
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
      <FormControl isInvalid={!!errors.email}>
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

      <FormControl isInvalid={!!errors.name}>
        <FormLabel
          marginTop="16px"
          htmlFor="name"
          fontSize="small"
          marginBottom="4px"
        >
          Name
        </FormLabel>
        <Input
          type="text"
          placeholder="Name"
          id="name"
          {...register("name", {
            required: "Name is required.",
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.username}>
        <FormLabel
          marginTop="16px"
          htmlFor="username"
          fontSize="small"
          marginBottom="4px"
        >
          Username
        </FormLabel>
        <Input
          type="text"
          placeholder="Username"
          id="username"
          {...register("username", {
            required: "Username is required.",
            pattern: {
              value: /^\S*$/,
              message: "Username should not contain spaces",
            },
          })}
        />
        <FormErrorMessage>
          {errors.name && errors.name.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.avatar}>
        <FormLabel
          htmlFor="avatar"
          marginTop="16px"
          fontSize="small"
          marginBottom="4px"
        >
          Avatar
        </FormLabel>
        <AvatarGroup spacing="4px">
          {AVATAR_OPTIONS.map((imageSrc) => (
            <Controller
              key={imageSrc}
              control={control}
              name="avatar"
              render={({ field: { onChange, value, ref } }) => (
                <Avatar
                  src={imageSrc}
                  width="60px"
                  height="60px"
                  borderColor="white"
                  borderWidth={3}
                  bg="purple.500"
                  padding={2}
                  cursor="pointer"
                  onClick={() => onChange(imageSrc)}
                  ref={ref}
                  opacity={value === imageSrc ? 1 : 0.5}
                />
              )}
            />
          ))}
        </AvatarGroup>
        <FormErrorMessage>
          {errors.avatar && errors.avatar.message}
        </FormErrorMessage>
      </FormControl>

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
            validate: (value) => {
              return value === "password" ? true : "The passwords do not match";
            },
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
        marginTop="16px"
        isLoading={isSubmitting}
        type="submit"
      >
        Sign Up
      </Button>
    </form>
  );
}
