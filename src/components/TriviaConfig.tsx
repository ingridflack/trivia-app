import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Radio,
  RadioGroup,
  Select,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import { Category } from "../types/sharedTypes";
import { useNavigate } from "react-router-dom";
import { DIFFICULTY_OPTIONS, GAME_MODE_OPTIONS } from "../constants/trivia";

interface GameConfigValues {
  category: string;
  difficulty: string;
  amount: number;
  gameMode: string;
  type: string;
}

export default function TriviaConfig() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameConfigValues>({
    defaultValues: {
      category: "any",
      difficulty: "any",
      type: "any",
      amount: 5,
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await TriviaService.getCategories();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<GameConfigValues> = async (values) => {
    try {
      const params = {
        category: values.category,
        difficulty: values.difficulty,
        amount: values.amount,
        type: values.type,
      };

      const { data } = await TriviaService.createTrivia(params);

      navigate(`/trivia/${data.triviaId}`);
    } catch {
      console.log("error");

      toast({
        title: "Oops!",
        description: "Something went wrong. Try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top-right",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <FormControl isInvalid={!!errors.category}>
        <FormLabel
          marginTop="16px"
          htmlFor="category"
          fontSize="small"
          marginBottom="4px"
        >
          Category
        </FormLabel>
        <Select
          id="category"
          {...register("category", {
            required: "Category is required.",
          })}
        >
          <option value="any">Any category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
        <FormErrorMessage>
          {errors.category && errors.category.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.difficulty}>
        <FormLabel
          marginTop="16px"
          htmlFor="difficulty"
          fontSize="small"
          marginBottom="4px"
        >
          Difficulty
        </FormLabel>
        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction="row">
                {DIFFICULTY_OPTIONS.map((option) => (
                  <Radio
                    key={option.value}
                    colorScheme="purple"
                    value={option.value}
                  >
                    {option.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
        />

        <FormErrorMessage>
          {errors.difficulty && errors.difficulty.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.amount}>
        <FormLabel
          marginTop="16px"
          htmlFor="amount"
          fontSize="small"
          marginBottom="4px"
        >
          Amount
        </FormLabel>

        <Controller
          name="amount"
          render={({ field }) => (
            <NumberInput {...field} max={10} min={5} size="sm" maxW={20}>
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          )}
          control={control}
        />

        <FormErrorMessage>
          {errors.amount && errors.amount.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.gameMode}>
        <FormLabel
          marginTop="16px"
          htmlFor="gameMode"
          fontSize="small"
          marginBottom="4px"
        >
          Game mode
        </FormLabel>
        <Controller
          name="gameMode"
          control={control}
          render={({ field }) => (
            <RadioGroup {...field}>
              <Stack direction="row">
                {GAME_MODE_OPTIONS.map((option) => (
                  <Radio
                    key={option.value}
                    colorScheme="purple"
                    value={option.value}
                  >
                    {option.label}
                  </Radio>
                ))}
              </Stack>
            </RadioGroup>
          )}
        />

        <FormErrorMessage>
          {errors.gameMode && errors.gameMode.message}
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
        Start Game
      </Button>
    </form>
  );
}
