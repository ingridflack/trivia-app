import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as TriviaService from "../services/triviaService";
import QuestionItem from "../components/QuestionItem";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Image,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Timer from "../components/Timer";
import useTimer from "../hooks/useTimer";
import { ANSWER_TIME_LIMIT } from "../constants/trivia";
import Header from "../components/Header";
import { badgeColor } from "../helpers/trivia";
import { Footer } from "../components/Footer";

export interface AnswerFormValues {
  answer: string;
  questionId: string;
}

export default function Trivia() {
  const [question, setQuestion] = useState<TriviaService.TriviaQuestion>();
  const { triviaId } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnswerFormValues>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(1);
  const navigate = useNavigate();
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleTimeOut = useCallback(async () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }, []);

  const { timeLeft, resetTimer, startTime, elapsedTime } = useTimer({
    startTime: ANSWER_TIME_LIMIT,
    onTimeOut: handleTimeOut,
  });

  useEffect(() => {
    if (!triviaId) return;

    const fetchTrivia = async (triviaId: string) => {
      try {
        const { data } = await TriviaService.getTriviaQuestion(triviaId);

        setQuestion(data.question);
      } catch {
        console.log("error");
      }
    };

    fetchTrivia(triviaId);
  }, [triviaId]);

  const handleNextQuestion = (nextQuestion: TriviaService.TriviaQuestion) => {
    reset();
    resetTimer();
    setQuestion(nextQuestion);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<AnswerFormValues> = async (values) => {
    if (!question || !triviaId) return;

    try {
      const { data } = await TriviaService.answerQuestion({
        questionId: question._id,
        answer: values.answer,
        answerTime: elapsedTime,
        triviaId: triviaId,
      });

      if (data.data.timeOut) {
        toast({
          title: "Time's up!",
          description: "Sorry! You ran out of time.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else if (data.data.isCorrect) {
        toast({
          title: "Correct!",
          description: "Congratulations! You answered correctly.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      } else {
        toast({
          title: "Incorrect!",
          description: "Sorry! You answered incorrectly.",
          status: "error",
          duration: 2000,
          isClosable: true,
          position: "top-right",
        });
      }

      if (data.data.completed) {
        toast({
          title: "Trivia completed!",
          description: "Congratulations! You answered all questions.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        navigate("/trivia/history");
      } else {
        handleNextQuestion(data.data.question);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Header />

      <Container
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        minH="calc(var(--chakra-vh) - 50px)" // 100vh - 50px (height of the header)
      >
        <Box width="100%" position="relative">
          <Text
            fontSize="large"
            color="gray.500"
            fontWeight="600"
            marginBottom="10px"
          >
            Question {currentQuestionIndex}/10
          </Text>
          <Card
            display="flex"
            flexDirection={["column", "column", "row"]}
            gap="48px"
            alignItems=""
            maxW="992px"
            padding={{ base: "20px", md: "35px 45px" }}
            shadow="xl"
            minHeight="345px"
          >
            <Box
              justifyContent="center"
              display="flex"
              alignItems="center"
              flexDirection="column"
            >
              <Timer value={timeLeft} maxValue={startTime} />
              <Badge
                colorScheme={badgeColor(question?.difficulty)}
                marginTop="20px"
                variant="outline"
              >
                {question?.difficulty}
              </Badge>
            </Box>

            <Stack
              direction="column"
              as="form"
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
            >
              <QuestionItem
                question={question}
                control={control}
                errors={errors}
              />

              <Button
                colorScheme="purple"
                size="md"
                width="100%"
                maxWidth="270px"
                marginTop="16px"
                isLoading={isSubmitting}
                type="submit"
              >
                Answer
              </Button>
            </Stack>
          </Card>

          <Image
            src="/src/assets/trivia-question.svg"
            alt="Question image"
            position="absolute"
            right="-180px"
            bottom="-50px"
            width="229px"
            height="322px"
            pointerEvents="none"
            display={{ base: "none", md: "none", lg: "block" }}
          />
        </Box>
      </Container>
      <Footer />
    </>
  );
}
