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
} from "@chakra-ui/react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  difficultyOptions,
  gameModeOptions,
  typeOptions,
} from "../constants/gameConfigFields";
import { useEffect, useState } from "react";
import * as CategoriesService from "../services/triviaCategories";
import { Category } from "../types/sharedTypes";

interface GameConfigValues {
  category: string;
  difficulty: string;
  amount: number;
  type?: string;
  gameMode: string;
}

export default function GameConfig() {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameConfigValues>({
    defaultValues: {
      difficulty: "easy",
    },
  });
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await CategoriesService.getCategories();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<GameConfigValues> = async (values) => {
    console.log(values);
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
          placeholder="Select category"
          id="category"
          {...register("category", {
            required: "Category is required.",
          })}
        >
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
                {difficultyOptions.map((option) => (
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
        <NumberInput max={50} min={1} size="sm" maxW={20}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>

        <FormErrorMessage>
          {errors.amount && errors.amount.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.type}>
        <FormLabel
          marginTop="16px"
          htmlFor="type"
          fontSize="small"
          marginBottom="4px"
        >
          Type
        </FormLabel>
        <RadioGroup onChange={() => console.log("oi")} value="oi">
          <Stack direction="row">
            {typeOptions.map((option) => (
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
        <FormErrorMessage>
          {errors.type && errors.type.message}
        </FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={!!errors.gameMode}>
        <FormLabel
          marginTop="16px"
          htmlFor="type"
          fontSize="small"
          marginBottom="4px"
        >
          Game mode
        </FormLabel>
        <RadioGroup onChange={() => console.log("oi")} value="oi">
          <Stack direction="row">
            {gameModeOptions.map((option) => (
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
