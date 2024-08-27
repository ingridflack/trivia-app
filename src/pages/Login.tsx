import { Box, Card, Container, Image, Link, Text } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";
import Header from "../components/Header";

export default function Login() {
  return (
    <>
      <Header />

      <Container
        backgroundColor="gray.200"
        display="flex"
        alignItems="center"
        justifyContent="center"
        maxWidth="none"
        minH="calc(var(--chakra-vh) - 50px)" // 100vh - 50px (height of the header)
      >
        <Card
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent="space-around"
          maxW="992px"
          width="100%"
          padding="70px"
          shadow="xl"
        >
          <Box maxW="392px" width="100%">
            <Text fontSize="xx-large" marginBottom="30px" color="gray.700">
              Sign in
            </Text>
            <LoginForm />

            <Box marginTop="20px" display="flex" justifyContent="space-between">
              <Link fontSize="small" color="gray.500" href="/sign-up">
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
