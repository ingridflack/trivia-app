import {
  Avatar,
  AvatarGroup,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Stack,
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
    <Stack as="form" onSubmit={handleSubmit(onSubmit)} gap="16px">
      <FormControl isInvalid={!!errors.email}>
        <FormLabel htmlFor="email">Email address</FormLabel>
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

      <Stack direction="row" gap="16px">
        <FormControl isInvalid={!!errors.name}>
          <FormLabel htmlFor="name">Name</FormLabel>
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
          <FormLabel htmlFor="username">Username</FormLabel>
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
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>
      </Stack>

      <Stack direction="row" gap="16px">
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
      </Stack>

      <FormControl isInvalid={!!errors.avatar}>
        <FormLabel htmlFor="avatar">Avatar</FormLabel>
        <AvatarGroup spacing="4px">
          {AVATAR_OPTIONS.map((imageSrc) => (
            <Controller
              key={imageSrc}
              control={control}
              name="avatar"
              render={({ field: { onChange, value, ref } }) => (
                <Avatar
                  src={imageSrc}
                  width="50px"
                  height="50px"
                  borderColor="white"
                  borderWidth={3}
                  bg="purple.500"
                  padding={2}
                  cursor="pointer"
                  onClick={() => onChange(imageSrc)}
                  ref={ref}
                  opacity={value === imageSrc ? 1 : 0.5}
                  transition={"opacity 0.3s"}
                  _hover={{
                    opacity: 1,
                  }}
                />
              )}
            />
          ))}
        </AvatarGroup>
        <FormErrorMessage>
          {errors.avatar && errors.avatar.message}
        </FormErrorMessage>
      </FormControl>

      <Button
        colorScheme="purple"
        size="lg"
        width="100%"
        isLoading={isSubmitting}
        type="submit"
      >
        Sign Up
      </Button>
    </Stack>
  );
}
