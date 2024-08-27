import { Container } from "@chakra-ui/react";
import Header from "../components/Header";

export default function Welcome() {
  return (
    <div>
      <Header />

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
