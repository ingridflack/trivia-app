import { Box, Card, Container, Text } from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";
import Header from "../components/Header";

export default function SignUp() {
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
            <SignUpForm />
          </Box>
        </Card>
      </Container>
    </>
  );
}
