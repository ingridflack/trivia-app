import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as TriviaService from "../services/triviaService";
import { Question, Trivia as TriviaType } from "../types/sharedTypes";
import QuestionItem from "../components/QuestionItem";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Text,
  useToast,
} from "@chakra-ui/react";
import Timer from "../components/Timer";
import useTimer from "../hooks/useTimer";
import { ANSWER_TIME_LIMIT } from "../constants/trivia";

export interface AnswerFormValues {
  answer: string;
  questionId: string;
}

export default function Trivia() {
  const [trivia, setTrivia] = useState<TriviaType>();
  const { triviaId } = useParams();
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AnswerFormValues>();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const navigate = useNavigate();
  const toast = useToast();
  const formRef = useRef<HTMLFormElement>(null);

  const handleTimeOut = useCallback(async (timeLeft: number) => {
    console.log({ timeLeft });

    console.log(formRef.current);

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
        const { data } = await TriviaService.getTriviaById(triviaId);

        setTrivia(data.trivia);
      } catch {
        console.log("error");
      }
    };

    fetchTrivia(triviaId);
  }, [triviaId]);

  const handleNextQuestion = () => {
    reset();
    resetTimer();
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<AnswerFormValues> = async (values) => {
    if (!trivia || !triviaId) return;

    try {
      const { data } = await TriviaService.answerQuestion({
        questionId: trivia.questions[currentQuestionIndex]?._id,
        answer: values.answer,
        answerTime: elapsedTime,
        triviaId: triviaId,
      });

      if (data.timeOut) {
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

      if (data.data.triviaStatus === "completed") {
        toast({
          title: "Trivia completed!",
          description: "Congratulations! You answered all questions.",
          status: "success",
          duration: 3000,
          isClosable: true,
          position: "top-right",
        });

        navigate("/trivia/config");
      }

      handleNextQuestion();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container
      centerContent
      height="100%"
      alignItems="center"
      justifyContent="center"
    >
      <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xx-large" marginBottom="30px">
          Trivia App Logo
        </Text>

        <Timer value={timeLeft} maxValue={startTime} />

        <FormControl isInvalid={!!errors.answer}>
          {trivia?.questions.map(
            (item: Question, index) =>
              index === currentQuestionIndex && (
                <QuestionItem key={item._id} item={item} control={control} />
              )
          )}
          <FormErrorMessage>
            {errors.answer && errors.answer.message}
          </FormErrorMessage>
        </FormControl>

        <Button
          colorScheme="purple"
          size="lg"
          width="100%"
          marginTop="16px"
          isLoading={isSubmitting}
          type="submit"
        >
          Next
        </Button>
      </form>
    </Container>
  );
}
