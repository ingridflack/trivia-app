import { Radio, RadioGroup, Stack, Text } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { Control, Controller } from "react-hook-form";
import { Question } from "../types/sharedTypes";
import { AnswerFormValues } from "../pages/Trivia";

interface QuestionItemProps {
  item: Question;
  control: Control<AnswerFormValues>;
}

export default function QuestionItem({ item, control }: QuestionItemProps) {
  return (
    <>
      <Text
        fontSize="large"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(item.question) }}
      />

      <Controller
        key={item._id}
        control={control}
        name="answer"
        rules={{ required: "Please select an answer" }}
        render={({ field }) => (
          <RadioGroup {...field}>
            <Stack direction="row">
              {item.answers.map((option) => (
                <Radio key={option} colorScheme="purple" value={option}>
                  {option}
                </Radio>
              ))}
            </Stack>
          </RadioGroup>
        )}
      />
    </>
  );
}
