import {
  FormControl,
  FormErrorMessage,
  Grid,
  Radio,
  RadioGroup,
  Stack,
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
        fontSize="x-large"
        fontWeight="bold"
        maxW="400px"
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
              <Stack marginTop="30px">
                <Grid templateColumns="repeat(2, 1fr)" gap="20px">
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
              </Stack>
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
