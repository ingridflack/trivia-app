import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import { TriviaHistory as TriviaHistoryInterface } from "../types/sharedTypes";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Container,
  List,
  ListItem,
  Tag,
  TagLabel,
  Text,
} from "@chakra-ui/react";
import Menu from "../components/Menu";
import DOMPurify from "dompurify";

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

      console.log(data.triviaHistory);

      setTriviaHistory(data.triviaHistory);
    };

    fetchTriviaHistory();
  }, []);

  console.log(triviaHistory);

  return (
    <div>
      <Menu />

      <Container
        centerContent
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <List w="100%">
          {triviaHistory.map((historyItem) => (
            <ListItem key={historyItem.trivia._id}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton>
                      <Box as="span" flex="1" textAlign="left">
                        {CATEGORY_LABELS[historyItem.trivia.category] ||
                          "Mixed"}{" "}
                        | {historyItem.trivia.difficulty} |{" "}
                        <strong>
                          <small>Points: </small>
                        </strong>
                        {historyItem.trivia.score || 0}
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4} pr={16}>
                    {historyItem.items.map((item) => (
                      <Box
                        display="flex"
                        justifyContent="space-between"
                        flexDirection="column"
                        mb={4}
                        gap={4}
                      >
                        <Text
                          fontSize="medium"
                          dangerouslySetInnerHTML={{
                            __html: DOMPurify.sanitize(item.question.question),
                          }}
                        />
                        <Box display="flex" alignItems="center" gap="4">
                          <Text fontSize="small">
                            <strong>Answer time: </strong>
                            {item.answerTime} seconds
                          </Text>

                          <Tag
                            size={"md"}
                            key={item._id}
                            borderRadius="full"
                            variant="solid"
                            colorScheme={item.isCorrect ? "green" : "red"}
                            w="fit-content"
                          >
                            <TagLabel>
                              {" "}
                              <Text fontSize="small" fontWeight="bold">
                                {item.isCorrect ? "Correct" : "Incorrect"}
                              </Text>
                            </TagLabel>
                          </Tag>
                        </Box>
                      </Box>
                    ))}
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </ListItem>
          ))}
        </List>
      </Container>
    </div>
  );
}
