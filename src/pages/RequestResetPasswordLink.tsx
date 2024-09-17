import { Box, Card, Container, Image, Text } from "@chakra-ui/react";
import SendEmailForm from "../components/SendEmailForm";
import Header from "../components/Header";

export default function RequestResetPasswordLink() {
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
            <Text fontSize="xx-large" marginBottom="30px" color="gray.700">
              Password recovery
            </Text>
            <SendEmailForm />
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
