import { Box, Container, Link, Text } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Container
      centerContent
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <Text fontSize="xx-large" marginBottom="30px">
        Trivia App Logo
      </Text>
      <LoginForm />

      <Box
        marginTop="4px"
        display="flex"
        alignItems="center"
        justifyContent="center"
        width="100%"
      >
        <Text fontSize="small">Don't have an account?</Text>
        <Link
          fontSize="small"
          fontWeight="bold"
          marginLeft="4px"
          href="/sign-up"
        >
          Sign Up
        </Link>
      </Box>
    </Container>
  );
}
