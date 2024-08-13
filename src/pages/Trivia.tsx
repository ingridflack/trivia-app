import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as TriviaService from "../services/triviaService";
import { Question, Trivia as TriviaType } from "../types/sharedTypes";
import QuestionItem from "../components/QuestionItem";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button, FormControl, FormErrorMessage } from "@chakra-ui/react";

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
    formState: { errors, isSubmitting },
  } = useForm<AnswerFormValues>();
  const [currentQuestion, setCurrentQuestion] = useState(0);

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
    setCurrentQuestion((prev) => prev + 1);
  };

  const onSubmit: SubmitHandler<AnswerFormValues> = async (values) => {
    console.log(values);

    // Send answer to backend
    // Check if answer is correct
    // Add notification if it is correct
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h1>Trivia</h1>

      <FormControl isInvalid={!!errors.answer}>
        {trivia?.questions.map(
          (item: Question, index) =>
            index === currentQuestion && (
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
        onClick={handleNextQuestion}
      >
        Next
      </Button>
    </form>
  );
}
