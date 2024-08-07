import { Button, Container } from "@chakra-ui/react";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Container centerContent>
      <h1>Login</h1>
      <p>Login page</p>
      <LoginForm />
      <Button colorScheme='purple' size='lg' width='100%' marginTop='16px'>Login</Button>
    </Container>
  );
}
