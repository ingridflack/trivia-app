import { useEffect, useState } from "react";
import * as TriviaService from "../../services/triviaService";
import { TriviaHistory as ITriviaHistory } from "../../types/sharedTypes";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Badge,
  Box,
  Container,
  Grid,
  Heading,
  Skeleton,
  Stack,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Header from "../../components/Header";
import DOMPurify from "dompurify";
import { badgeColor } from "../../helpers/trivia";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { TRIVIA_CATEGORIES } from "../../constants/trivia";
import { Footer } from "../../components/Footer";
import { Link } from "react-router-dom";

interface TriviaHistoryContentProps {
  triviaHistory: ITriviaHistory[];
  isLoading: boolean;
}

function TriviaHistoryContent({
  triviaHistory,
  isLoading,
}: TriviaHistoryContentProps) {
  if (isLoading) {
    return (
      <Stack>
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
        <Skeleton height="40px" width="100%" />
      </Stack>
    );
  }

  if (!triviaHistory.length) {
    return (
      <Text>
        Your trivia history is empty.{" "}
        <Text
          as={Link}
          to="/trivia/config"
          textDecoration="underline"
          fontWeight="700"
        >
          Click here
        </Text>{" "}
        to start a game!
      </Text>
    );
  }

  return (
    <Accordion allowMultiple>
      {triviaHistory
        .filter((item) => item.completed)
        .map((historyItem) => (
          <AccordionItem
            key={historyItem.trivia._id}
            backgroundColor="white"
            marginBottom="10px"
          >
            <AccordionButton>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                color="gray.500"
                display="flex"
                justifyContent="space-between"
                flexDirection={{ base: "column", md: "row" }}
                gap={{ base: "10px", md: "0" }}
              >
                <Box display="flex" alignItems="center" gap="16px">
                  <Tooltip
                    label={historyItem.trivia.status}
                    textTransform="capitalize"
                  >
                    <Box
                      backgroundColor={
                        historyItem.trivia.status === "completed"
                          ? "green.500"
                          : "orange.500"
                      }
                      borderRadius="full"
                      width="10px"
                      height="10px"
                    />
                  </Tooltip>
                  <Text>
                    {TRIVIA_CATEGORIES[Number(historyItem.trivia.category)]
                      ?.title || "General Knowledge "}
                  </Text>
                </Box>

                <Box display="flex" alignItems="center" gap="30px">
                  <Text fontSize="sm">
                    Score: {historyItem.score || 0} / {historyItem.items.length}
                  </Text>
                  <Badge
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    colorScheme={badgeColor(historyItem.trivia.difficulty)}
                  >
                    {historyItem.trivia.difficulty}
                  </Badge>
                  <Text fontSize="sm">
                    {new Date(
                      historyItem.trivia.createdAt
                    ).toLocaleDateString()}
                  </Text>
                  <AccordionIcon />
                </Box>
              </Box>
            </AccordionButton>
            <AccordionPanel padding={0}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                borderTop="1px solid var(--chakra-colors-gray-100)"
              >
                {historyItem.items.map((item) => (
                  <Box
                    display="flex"
                    alignItems="flex-start"
                    justifyContent="space-between"
                    gap={4}
                    padding="20px"
                    borderBottom="1px solid var(--chakra-colors-gray-100)"
                    key={item._id}
                    _odd={{
                      borderRight: "1px solid var(--chakra-colors-gray-100)",
                    }}
                  >
                    <Text
                      color="gray.500"
                      display="flex"
                      fontSize="medium"
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(item.question.question),
                      }}
                    />

                    <Text
                      fontSize="sm"
                      color={item.isCorrect ? "green.500" : "red.500"}
                    >
                      {item.isCorrect ? <CheckIcon /> : <CloseIcon />}
                    </Text>
                  </Box>
                ))}
              </Grid>
            </AccordionPanel>
          </AccordionItem>
        ))}
    </Accordion>
  );
}

export default function TriviaHistory() {
  const [triviaHistory, setTriviaHistory] = useState<ITriviaHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTriviaHistory = async () => {
      try {
        const { data } = await TriviaService.getTriviaHistory();
        setTriviaHistory(data.triviaHistory);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTriviaHistory();
  }, []);

  return (
    <>
      <Header />

      <Container as="main" padding={{ base: "40px 20px", md: "80px 0 120px" }}>
        <Box as="header" marginBottom="40px">
          <Heading fontSize="3xl">Trivia History</Heading>
        </Box>

        <TriviaHistoryContent
          triviaHistory={triviaHistory}
          isLoading={isLoading}
        />
      </Container>

      <Footer />
    </>
  );
}
