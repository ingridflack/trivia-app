import { Box, Card, Container, Image, Text, useToast } from "@chakra-ui/react";
import SendEmailForm from "../components/SendEmailForm/SendEmailForm";
import Header from "../components/Header";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as AuthService from "../services/authService";

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
            src="/src/assets/recovery.svg"
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
