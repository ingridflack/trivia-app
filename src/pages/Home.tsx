import { Box, Button, Container, Heading, Image, Text } from "@chakra-ui/react";
import Header from "../components/Header";
import { Link } from "react-router-dom";
import { PendingTriviaList } from "../components/PendingTriviaList";
import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import { PendingTrivia } from "../types/sharedTypes";
import { Footer } from "../components/Footer";
import useAuth from "../hooks/useAuth";
import { CATEGORY_CARDS_DATA } from "../constants/trivia";
import { CategoryCard } from "../components/CategoryCard";

export default function Home() {
  const [pendingTrivia, setPendingTrivia] = useState<PendingTrivia[]>([]);
  const { userData } = useAuth();

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
      <Box width="100%" backgroundColor="purple.500" overflow="hidden">
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

      {userData && pendingTrivia.length && (
        <Container padding={{ base: "20px 0", md: "80px 0 120px" }}>
          <Box as="header" marginBottom="40px">
            <Heading fontSize="3xl">Pending trivias</Heading>
          </Box>
          <PendingTriviaList pendingTriviaList={pendingTrivia} />
        </Container>
      )}

      <Box
        as="section"
        padding={{ base: "20px 0", md: "80px 0 120px" }}
        backgroundColor="gray.100"
        boxShadow="0px 30px 100px 0 rgba(39, 39, 39, 0.2);"
      >
        <Box as="header" textAlign="center" marginBottom="60px">
          <Heading fontSize={{ base: "3xl", md: "5xl" }} marginBottom="20px">
            Prove your smarts
          </Heading>
          <Text fontSize={{ base: "md", md: "xl" }}>
            Complete a quiz and show your friends you're in the know.
          </Text>
        </Box>

        <Container
          display="grid"
          gridTemplateColumns={{ base: "repeat(1fr)", md: "repeat(5, 1fr)" }}
          gap="16px"
          padding={{ base: "40px 20px", md: "0 0" }}
        >
          {CATEGORY_CARDS_DATA.map((category) => (
            <CategoryCard
              title={category.title}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </Container>
      </Box>
      <Footer />
    </>
  );
}
