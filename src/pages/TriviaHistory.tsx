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
  Card,
  Container,
  Divider,
  List,
  ListItem,
  Tag,
  TagLabel,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import Header from "../components/Header";
import DOMPurify from "dompurify";
import { badgeColor } from "../helpers/trivia";
import { CheckIcon, SmallCloseIcon } from "@chakra-ui/icons";

const CATEGORY_LABELS: { [key: string]: string } = {
  9: "General Knowledge",
  10: "Entertainment: Books",
  31: "Entertainment: Japanese Anime & Manga",
  19: "Science: Mathematics",
  14: "Entertainment: Television",
};

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

  console.log(triviaHistory);

  return (
    <>
      <Header />

      <Container>
        <Text color="gray.700" fontSize="3xl">
          Game History
        </Text>

        <List
          w="100%"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
        >
          {triviaHistory.map((historyItem) => (
            <Card
              display="flex"
              flexDirection={["column", "column", "row"]}
              alignItems=""
              maxW="992px"
              shadow="xl"
              w="100%"
              marginBottom="20px"
            >
              <ListItem key={historyItem.trivia._id} w="100%">
                <Accordion allowMultiple>
                  <AccordionItem>
                    <h2>
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
                                backgroundColor="green.500"
                                borderRadius="full"
                                width="10px"
                                height="10px"
                              />
                            </Tooltip>
                            <Text>
                              {CATEGORY_LABELS[historyItem.trivia.category] ||
                                "General Knowledge "}
                            </Text>
                          </Box>
                          <Box display="flex" gap="30px">
                            <Text>
                              Score: {historyItem.trivia.score || 0} /{" "}
                              {historyItem.items.length}
                            </Text>
                            <Badge
                              display="flex"
                              alignItems="center"
                              justifyContent="center"
                              colorScheme={badgeColor(
                                historyItem.trivia.difficulty
                              )}
                            >
                              {historyItem.trivia.difficulty}
                            </Badge>
                            <Text marginRight="8px">
                              {new Date(
                                historyItem.trivia.createdAt
                              ).toLocaleDateString()}
                            </Text>
                          </Box>
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                    </h2>
                    <AccordionPanel pb={4} pr={16}>
                      {historyItem.items.map((item) => (
                        <>
                          <Box
                            display="flex"
                            justifyContent="space-between"
                            gap={4}
                            margin="20px"
                          >
                            <Text
                              color="gray.400"
                              display="flex"
                              fontSize="medium"
                              dangerouslySetInnerHTML={{
                                __html: DOMPurify.sanitize(
                                  item.question.question
                                ),
                              }}
                            />
                            <Box display="flex" alignItems="center" gap="4">
                              <Text
                                fontSize="small"
                                color="gray.500"
                                width="146px"
                              >
                                Answer time: {item.answerTime}{" "}
                                {item.answerTime > 1 ? "seconds" : "second"}
                              </Text>

                              <Tag
                                size="md"
                                key={item._id}
                                borderRadius="full"
                                variant="solid"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                colorScheme={item.isCorrect ? "green" : "red"}
                              >
                                <TagLabel>
                                  <Text fontSize="small" fontWeight="bold">
                                    {item.isCorrect ? (
                                      <CheckIcon />
                                    ) : (
                                      <SmallCloseIcon />
                                    )}
                                  </Text>
                                </TagLabel>
                              </Tag>
                            </Box>
                          </Box>
                          <Divider orientation="horizontal" />
                        </>
                      ))}
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
              </ListItem>
            </Card>
          ))}
        </List>
      </Container>
    </>
  );
}
