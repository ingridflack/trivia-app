import { Box, Card, Container, Text, useToast } from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../services/authService";

export interface SignUpValues {
  email: string;
  password: string;
  name: string;
  username: string;
  avatar?: string;
  passwordConfirmation: string;
}

export default function SignUp() {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors, isSubmitting },
  } = useForm<SignUpValues>();
  const navigate = useNavigate();
  const toast = useToast();

  const onSubmit: SubmitHandler<SignUpValues> = async (values) => {
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
    <>
      <Header />

      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        paddingY="32px"
        minH="calc(var(--chakra-vh) - 50px)" // 100vh - 50px (height of the header)
      >
        <Card
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent="space-around"
          width="100%"
          padding="32px"
          shadow="xl"
          maxW="635px"
        >
          <Box width="100%">
            <Text fontSize="xx-large" marginBottom="32px" color="gray.700">
              Sign up
            </Text>
            <SignUpForm
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
              isSubmitting={isSubmitting}
              control={control}
            />
          </Box>
        </Card>
      </Container>
    </>
  );
}
