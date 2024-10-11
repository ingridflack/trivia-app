import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as TriviaService from "../../services/triviaService";
import QuestionItem from "../../components/QuestionItem";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Badge,
  Box,
  Button,
  Card,
  Container,
  Image,
  Skeleton,
  SkeletonCircle,
  Stack,
  Text,
  useToast,
} from "@chakra-ui/react";
import Timer from "../../components/Timer";
import useTimer from "../../hooks/useTimer";
import { ANSWER_TIME_LIMIT } from "../../constants/trivia";
import Header from "../../components/Header";
import { badgeColor } from "../../helpers/trivia";
import { Footer } from "../../components/Footer";

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
  const [isLoading, setIsLoading] = useState(true);

  const handleTimeOut = useCallback(async () => {
    formRef.current?.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }, []);

  const {
    timeLeft,
    resetTimer,
    startTime,
    elapsedTime,
    startTimer,
    pauseTimer,
  } = useTimer({
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
      } finally {
        setIsLoading(false);
      }
    };

    fetchTrivia(triviaId);
  }, [triviaId]);

  useEffect(() => {
    if (!isLoading) {
      startTimer();
    }
  }, [isLoading, startTimer]);

  const handleNextQuestion = (nextQuestion: TriviaService.TriviaQuestion) => {
    reset();
    resetTimer();
    setQuestion(nextQuestion);
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<AnswerFormValues> = async (values) => {
    if (!question || !triviaId) return;

    try {
      pauseTimer();

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
        as="main"
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
              width="80px"
            >
              {isLoading ? (
                <Stack width="74px" alignItems="center">
                  <SkeletonCircle size="63px" marginTop="5px" />
                  <Skeleton marginTop="25px" height="18px" width="50px" />
                </Stack>
              ) : (
                <>
                  <Timer value={timeLeft} maxValue={startTime} />
                  <Badge
                    colorScheme={badgeColor(question?.difficulty)}
                    marginTop="20px"
                    variant="outline"
                  >
                    {question?.difficulty}
                  </Badge>
                </>
              )}
            </Box>

            <Stack
              direction="column"
              as="form"
              ref={formRef}
              onSubmit={handleSubmit(onSubmit)}
              width="100%"
            >
              {isLoading ? (
                <Stack height="100%">
                  <Skeleton as="p" height="30px" width="90%" />
                  <Stack
                    gridTemplateColumns="repeat(2, 1fr)"
                    display="grid"
                    gap="20px"
                    marginTop="30px"
                    flex="1"
                    gridTemplateRows="20px 20px"
                  >
                    <Skeleton height="20px" width="40%" />
                    <Skeleton height="20px" width="60%" />
                    <Skeleton height="20px" width="55%" />
                    <Skeleton height="20px" width="50%" />
                  </Stack>
                  <Skeleton height="40px" width="270px" />
                </Stack>
              ) : (
                <>
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
                </>
              )}
            </Stack>
          </Card>

          <Image
            src="/assets/trivia-question.svg"
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
