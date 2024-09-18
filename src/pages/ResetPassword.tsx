import { Box, Card, Container, Image, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import ResetPasswordForm from "../components/ResetPasswordForm";

export default function ResetPassword() {
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
              Reset your password
            </Text>
            <ResetPasswordForm />
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
