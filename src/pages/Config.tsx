import { Container } from "@chakra-ui/react";
import TriviaConfig from "../components/TriviaConfig";
import Menu from "../components/Menu";

export default function Config() {
  return (
    <div>
      <Menu />

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
