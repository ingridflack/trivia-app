import { Box, Card, Container, Image, Text, useToast } from "@chakra-ui/react";
import SendEmailForm from "../../components/SendEmailForm/SendEmailForm";
import Header from "../../components/Header";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../../services/authService";
import { Footer } from "../../components/Footer";

export interface SendEmailFormValues {
  email: string;
}

export default function RequestResetPasswordLink() {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<SendEmailFormValues>();
  const toast = useToast();
  const [successfullySent, setSuccessfullySent] = useState(false);

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

      setSuccessfullySent(true);
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
        paddingY="32px"
      >
        <Card
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent="space-around"
          width="100%"
          padding={{ base: "20px", md: "32px" }}
          shadow="xl"
          maxW="635px"
        >
          <Box maxW="392px" width="100%">
            <Text fontSize="xx-large" marginBottom="32px" color="gray.700">
              Password recovery
            </Text>
            <SendEmailForm
              onSubmit={handleSubmit(onSubmit)}
              successfullySent={successfullySent}
              errors={errors}
              isSubmitting={isSubmitting}
              register={register}
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
