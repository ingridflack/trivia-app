import { Container } from "@chakra-ui/react";
import TriviaConfig from "../components/TriviaConfig";
import Header from "../components/Header";

export default function Config() {
  return (
    <div>
      <Header />

      <Container
        centerContent
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <TriviaConfig />
      </Container>
    </div>
  );
}
