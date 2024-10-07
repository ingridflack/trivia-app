import { Box, Card, Container, Image, Text, useToast } from "@chakra-ui/react";
import Header from "../../components/Header";
import ResetPasswordForm from "../../components/ResetPasswordForm";
import { useNavigate, useParams } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../../services/authService";
import { Footer } from "../../components/Footer";

export interface ResetPasswordFormValues {
  password: string;
  passwordConfirmation: string;
}

export default function ResetPassword() {
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
  return (
    <>
      <Header />

      <Container
        as="main"
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
          padding={{ base: "40px 20px", md: "80px 0" }}
          shadow="xl"
        >
          <Box maxW="392px" width="100%">
            <Text fontSize="xx-large" marginBottom="32px" color="gray.700">
              Reset your password
            </Text>
            <ResetPasswordForm
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
              isSubmitting={isSubmitting}
            />
          </Box>

          <Image
            src="/assets/recovery.svg"
            alt="Login image"
            width="325px"
            height="324px"
            pointerEvents="none"
            display={{ base: "none", md: "none", lg: "block" }}
          />
        </Card>
      </Container>
      <Footer />
    </>
  );
}
