import { Container } from "@chakra-ui/react";
import Menu from "../components/Menu";

export default function Welcome() {
  return (
    <div>
      <Menu />

      <Container
        centerContent
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <h1>Welcome to Trivia!</h1>
      </Container>
    </div>
  );
}
