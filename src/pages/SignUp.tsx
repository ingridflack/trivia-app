import { Container, Text } from "@chakra-ui/react";
import SignUpForm from "../components/SignUpForm";

export default function SignUp() {
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

      <SignUpForm />
    </Container>
  );
}
