import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import Menu from "../components/Menu";

export default function Home() {
  return (
    <>
      <Menu />
      <Box width="100%" backgroundColor="#AE79F8">
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Container maxWidth="992px" paddingY="80px" position="relative">
            <Text
              fontSize="6xl"
              lineHeight="1.2"
              fontWeight="bold"
              color="white"
              maxWidth="550"
            >
              Challenge yourself in a trivia match!
            </Text>

            <Button
              backgroundColor="green.400"
              color="white"
              width="180px"
              _hover="green.400"
              marginTop="38px"
            >
              Start a trivia
            </Button>
            <Image
              src="src/assets/home.svg"
              alt="Home image"
              position="absolute"
              right="-160px"
              bottom="-60px"
              width="674px"
              height="418px"
              pointerEvents="none"
            />
          </Container>
        </Box>
      </Box>
    </>
  );
}
