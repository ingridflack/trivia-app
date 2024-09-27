import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import { TriviaHistory as TriviaHistoryInterface } from "../types/sharedTypes";
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
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Header from "../components/Header";
import DOMPurify from "dompurify";
import { badgeColor } from "../helpers/trivia";
import { CheckIcon, CloseIcon } from "@chakra-ui/icons";
import { TRIVIA_CATEGORIES } from "../constants/trivia";
import { Footer } from "../components/Footer";

export default function TriviaHistory() {
  const [triviaHistory, setTriviaHistory] = useState<TriviaHistoryInterface[]>(
    []
  );

  useEffect(() => {
    const fetchTriviaHistory = async () => {
      const { data } = await TriviaService.getTriviaHistory();

      setTriviaHistory(data.triviaHistory);
    };

    fetchTriviaHistory();
  }, []);

  return (
    <>
      <Header />

      <Container padding={{ base: "20px 0", md: "80px 0 120px" }}>
        <Box as="header" marginBottom="40px">
          <Heading fontSize="3xl">Game History</Heading>
        </Box>

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
                        Score: {historyItem.trivia.score || 0} /{" "}
                        {historyItem.items.length}
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
                    templateColumns="repeat(2, 1fr)"
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
                          borderRight:
                            "1px solid var(--chakra-colors-gray-100)",
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
      </Container>

      <Footer />
    </>
  );
}
