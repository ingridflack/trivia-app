import {
  FormControl,
  FormErrorMessage,
  Grid,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { Control, Controller, FieldErrors } from "react-hook-form";
import { AnswerFormValues } from "../pages/Trivia";
import { TriviaQuestion } from "../services/triviaService";

interface QuestionItemProps {
  question?: TriviaQuestion;
  control: Control<AnswerFormValues>;
  errors: FieldErrors<AnswerFormValues>;
}

export default function QuestionItem({
  question,
  errors,
  control,
}: QuestionItemProps) {
  if (!question) return null;

  return (
    <>
      <Text
        fontSize={{ base: "xl", md: "x-large" }}
        fontWeight="bold"
        lineHeight="1.2"
        width="100%"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(question.question),
        }}
      />

      <FormControl isInvalid={!!errors.answer} flex="1">
        <Controller
          control={control}
          name="answer"
          render={({ field }) => (
            <RadioGroup {...field}>
              <Grid
                templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
                gap="20px"
                marginTop="30px"
              >
                {question.answers.map((option) => (
                  <Radio key={option} colorScheme="purple" value={option}>
                    <Text
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(option),
                      }}
                    />
                  </Radio>
                ))}
              </Grid>
            </RadioGroup>
          )}
        />
        <FormErrorMessage>
          {errors.answer && errors.answer.message}
        </FormErrorMessage>
      </FormControl>
    </>
  );
}
