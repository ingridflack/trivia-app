import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../services/authService";
import { useState } from "react";

interface SendEmailFormValues {
  email: string;
}

export default function SendEmailForm() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SendEmailFormValues>();
  const toast = useToast();
  const [successufullySent, setSuccessufullySent] = useState(false);

  const onSubmit: SubmitHandler<SendEmailFormValues> = async (values) => {
    try {
      await AuthService.requestResetPasswordLink(values.email);

      toast({
        title: "Email sent.",
        description: "Check your inbox.",
        status: "success",
        duration: 2000,
        isClosable: true,
        position: "top-right",
      });

      setSuccessufullySent(true);
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
        display: "flex",
        flexDirection: "column",
      }}
    >
      {successufullySent ? (
        <Text color="gray.600">
          Email sent successfully. Please check your inbox.
        </Text>
      ) : (
        <>
          <FormControl isInvalid={!!errors.email} maxWidth="392px">
            <FormLabel
              htmlFor="email"
              marginBottom="4px"
              fontSize="small"
              color="gray.500"
            >
              Email address
            </FormLabel>
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
            maxWidth="400px"
            marginTop="16px"
            isLoading={isSubmitting}
            type="submit"
          >
            Send
          </Button>
        </>
      )}
    </form>
  );
}
