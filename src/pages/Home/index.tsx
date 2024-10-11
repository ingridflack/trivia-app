import {
  Box,
  Button,
  Container,
  Heading,
  Image,
  Skeleton,
  Stack,
  Text,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { PendingTriviaList } from "../../components/PendingTriviaList";
import { useEffect, useState } from "react";
import * as TriviaService from "../../services/triviaService";
import { CreateTriviaBody, PendingTrivia } from "../../types/sharedTypes";
import { Footer } from "../../components/Footer";
import useAuth from "../../hooks/useAuth";
import { TRIVIA_CATEGORIES } from "../../constants/trivia";
import { CategoryCard } from "../../components/CategoryCard";

export default function Home() {
  const [pendingTrivia, setPendingTrivia] = useState<PendingTrivia[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { userData } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingTrivia = async () => {
      try {
        const { data } = await TriviaService.getPendingTrivia();
        setPendingTrivia(data.pendingTrivia);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPendingTrivia();
  }, []);

  const handleCategoryCardClick = async (params: CreateTriviaBody) => {
    try {
      if (!userData) {
        localStorage.setItem("triviaConfig", JSON.stringify(params));
        navigate("/login");
        return;
      }

      const { data } = await TriviaService.createTrivia(params);

      navigate(`/trivia/${data.triviaId}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <Box as="main">
        <Box width="100%" backgroundColor="purple.500" overflow="hidden">
          <Container
            padding={{ base: "40px 20px", md: "80px 0" }}
            position="relative"
          >
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
              src="/assets/home.svg"
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

        {userData && (
          <Container padding={{ base: "40px 20px", md: "80px 0 120px" }}>
            <Box as="header" marginBottom={{ base: "20px", md: "40px" }}>
              <Heading fontSize="3xl">Pending trivias</Heading>
            </Box>

            {isLoading ? (
              <Stack
                display="grid"
                gap="16px"
                gridTemplateColumns={{
                  base: "repeat(1fr)",
                  md: "repeat(4, 1fr)",
                }}
              >
                <Skeleton height="138px" width="100%" borderRadius="md" />
                <Skeleton height="138px" width="100%" borderRadius="md" />
                <Skeleton height="138px" width="100%" borderRadius="md" />
                <Skeleton height="138px" width="100%" borderRadius="md" />
              </Stack>
            ) : pendingTrivia.length ? (
              <PendingTriviaList pendingTriviaList={pendingTrivia} />
            ) : (
              <Text>No pending trivias</Text>
            )}
          </Container>
        )}

        <Box
          as="section"
          padding={{ base: "40px 20px", md: "80px 0 120px" }}
          backgroundColor="gray.100"
          boxShadow="0px 30px 100px 0 rgba(39, 39, 39, 0.2);"
        >
          <Box
            as="header"
            textAlign="center"
            marginBottom={{ base: "20px", md: "60px" }}
          >
            <Heading fontSize={{ base: "3xl", md: "5xl" }} marginBottom="20px">
              Show off your knowledge
            </Heading>
            <Text fontSize={{ base: "md", md: "xl" }}>
              Take a quiz and impress your friends with what you know!
            </Text>
          </Box>

          <Container
            display="grid"
            gridTemplateColumns={{ base: "repeat(1fr)", md: "repeat(5, 1fr)" }}
            gap="16px"
            padding={{ base: "0", md: "0 0" }}
          >
            {Object.values(TRIVIA_CATEGORIES).map((category) => (
              <CategoryCard
                key={category.title}
                title={category.title}
                icon={category.icon}
                color={category.color}
                onCardClick={() => handleCategoryCardClick(category.params)}
              />
            ))}
          </Container>
        </Box>
      </Box>

      <Footer />
    </>
  );
}
