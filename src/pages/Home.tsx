import { Box, Button, Container, Image, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { PendingTriviaList } from "../components/PendingTriviaList";
import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import { PendingTrivia } from "../types/sharedTypes";
import { Footer } from "../components/Footer";

export default function Home() {
  const [pendingTrivia, setPendingTrivia] = useState<PendingTrivia[]>([]);

  useEffect(() => {
    const fetchPendingTrivia = async () => {
      try {
        const { data } = await TriviaService.getPendingTrivia();
        setPendingTrivia(data.pendingTrivia);
      } catch (error) {
        console.log(error);
      }
    };

    fetchPendingTrivia();
  }, []);

  return (
    <>
      <Header />
      <Box width="100%" backgroundColor="#AE79F8" overflow="hidden">
        <Container paddingY="80px" position="relative">
          <Text
            fontSize={{ base: "3xl", md: "6xl" }}
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
            as={Link}
            to="/trivia/config"
          >
            Start a trivia
          </Button>
          <Image
            src="/src/assets/home.svg"
            alt="Home image"
            position="absolute"
            right="-160px"
            bottom="-60px"
            width="674px"
            height="418px"
            pointerEvents="none"
            display={{ base: "none", md: "none", lg: "block" }}
          />
        </Container>
      </Box>

      {pendingTrivia.length ? (
        <PendingTriviaList pendingTriviaList={pendingTrivia} />
      ) : (
        <Container paddingY="32px">
          <Text fontSize="2xl" fontWeight="bold" marginBottom="8px">
            Pending Trivia
          </Text>
          <Text>No pending trivia.</Text>
        </Container>
      )}

      <Footer />
    </>
  );
}
