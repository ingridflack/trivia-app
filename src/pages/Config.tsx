import { Box, Card, Container, Image, Text } from "@chakra-ui/react";
import TriviaConfig from "../components/TriviaConfig";
import Header from "../components/Header";

export default function Config() {
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
          paddingY="50px"
          paddingX="70px"
          shadow="xl"
        >
          <Image
            src="/src/assets/setup.svg"
            alt="Login image"
            width="388px"
            height="307px"
            pointerEvents="none"
          />
          <Box maxW="392px" width="100%">
            <Text fontSize="xx-large" marginBottom="20px" color="gray.700">
              Trivia setup
            </Text>
            <TriviaConfig />
          </Box>
        </Card>
      </Container>
    </>
  );
}
