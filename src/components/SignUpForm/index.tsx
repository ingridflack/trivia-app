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
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

import { AVATAR_OPTIONS } from "../../constants/user";
import { checkPasswordConfirmation } from "../../helpers/form";
import { SignUpValues } from "../../pages/SignUp";

export interface SignUpFormProps {
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<SignUpValues>;
  register: UseFormRegister<SignUpValues>;
  isSubmitting: boolean;
  control: Control<SignUpValues, unknown>;
}

export default function SignUpForm({
  onSubmit,
  errors,
  register,
  isSubmitting,
  control,
}: SignUpFormProps) {
  return (
    <Stack as="form" onSubmit={onSubmit} gap="16px" role="form">
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

      <Stack direction={{ base: "column", md: "row" }} gap="16px">
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

      <Stack direction={{ base: "column", md: "row" }} gap="16px">
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
              validate: { isEqual: checkPasswordConfirmation },
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
