import { useEffect, useState } from "react";
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
} from "@chakra-ui/react";

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
    setCurrentQuestionIndex((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<AnswerFormValues> = async (values) => {
    if (!trivia || !triviaId) return;

    try {
      const { data } = await TriviaService.answerQuestion({
        questionId: trivia.questions[currentQuestionIndex]?._id,
        answer: values.answer,
        answerTime: 10,
        triviaId: triviaId,
      });

      if (data.data.isCorrect) {
        alert("Correct answer!");
      }

      if (data.data.triviaStatus === "completed") {
        alert("Trivia completed!");

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
      <form onSubmit={handleSubmit(onSubmit)}>
        <Text fontSize="xx-large" marginBottom="30px">
          Trivia App Logo
        </Text>

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
