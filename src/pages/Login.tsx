import {
  Box,
  Card,
  Container,
  Image,
  Link,
  Text,
  useToast,
} from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../services/authService";
import useAuth from "../hooks/useAuth";

export interface LoginFormValues {
  email: string;
  password: string;
}

export default function Login() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();
  const navigate = useNavigate();
  const toast = useToast();
  const { saveUserData } = useAuth();

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    try {
      const { data } = await AuthService.login(values);

      saveUserData(data);

      navigate("/");
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
    <>
      <Header />

      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        minH="calc(var(--chakra-vh) - 50px)" // 100vh - 50px (height of the header)
      >
        <Card
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent="space-around"
          width="100%"
          padding="70px"
          shadow="xl"
        >
          <Box maxW="392px" width="100%">
            <Text fontSize="xx-large" marginBottom="32px" color="gray.700">
              Sign in
            </Text>
            <LoginForm
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              isSubmitting={isSubmitting}
              register={register}
            />

            <Box marginTop="20px" display="flex" justifyContent="space-between">
              <Link
                fontSize="small"
                color="gray.500"
                href="/trivia/recovery-email"
              >
                Forgot your password?
              </Link>

              <Link fontSize="small" color="gray.500" href="/sign-up">
                Create an account
              </Link>
            </Box>
          </Box>

          <Image
            src="src/assets/login.svg"
            alt="Login image"
            width="325px"
            height="324px"
            pointerEvents="none"
          />
        </Card>
      </Container>
    </>
  );
}
