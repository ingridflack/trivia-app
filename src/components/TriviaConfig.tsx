import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Input,
  Select,
  useClipboard,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import { Category } from "../types/sharedTypes";
import { useNavigate } from "react-router-dom";
import {
  AMOUNT_OPTIONS,
  DIFFICULTY_OPTIONS,
  GAME_MODE_OPTIONS,
} from "../constants/trivia";

interface GameConfigValues {
  category: string;
  difficulty: string;
  amount: number;
  gameMode: string;
  type: string;
}

const TRIVIA_INVITE_URL = `http://localhost:5173/trivia`;

export default function TriviaConfig() {
  const {
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
  const [gameMode, setGameMode] = useState("single");
  const [triviaId, setTriviaId] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const { onCopy, value, hasCopied } = useClipboard(
    `${TRIVIA_INVITE_URL}/${triviaId}/invite/accept`
  );

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

      setTriviaId(data.triviaId);

      if (gameMode === "single") {
        navigate(`/trivia/${data.triviaId}`);
      }
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

  const handleGameModeChange = (value: string) => {
    setGameMode(value);
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
      <Grid templateColumns="repeat(2, 1fr)" gap="0 20px">
        <FormControl isInvalid={!!errors.category}>
          <FormLabel htmlFor="category" fontSize="small" marginBottom="4px">
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
          <FormLabel htmlFor="difficulty" fontSize="small" marginBottom="4px">
            Difficulty
          </FormLabel>

          <Select
            id="difficulty"
            {...register("difficulty", {
              required: "Difficulty is required.",
            })}
          >
            {DIFFICULTY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

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
            Number of questions
          </FormLabel>

          <Select
            id="amount"
            {...register("amount", {
              required: "Amount is required.",
            })}
          >
            {AMOUNT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.value}
              </option>
            ))}
          </Select>

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

          <Select
            id="gameMode"
            {...register("gameMode", {
              required: "Game mode is required.",
            })}
            onChange={(e) => handleGameModeChange(e.target.value)}
          >
            {GAME_MODE_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <FormErrorMessage>
            {errors.gameMode && errors.gameMode.message}
          </FormErrorMessage>
        </FormControl>
      </Grid>

      {gameMode === "single" ? (
        <Button
          colorScheme="purple"
          size="lg"
          width="100%"
          marginTop="16px"
          isLoading={isSubmitting}
          type="submit"
        >
          Start trivia
        </Button>
      ) : (
        <>
          {!triviaId ? (
            <Button
              colorScheme="purple"
              size="lg"
              width="100%"
              marginTop="16px"
              isLoading={isSubmitting}
              type="submit"
            >
              Generate online game
            </Button>
          ) : (
            <>
              <Flex mt={2} width="100%">
                <Input
                  placeholder={`${TRIVIA_INVITE_URL}/${triviaId}/invite/accept`}
                  value={value}
                  readOnly
                  mr={2}
                />
                <Button onClick={onCopy}>
                  {hasCopied ? "Copied!" : "Copy"}
                </Button>
              </Flex>

              <Button
                colorScheme="purple"
                size="lg"
                width="100%"
                marginTop="16px"
                isLoading={isSubmitting}
                type="submit"
                as={"a"}
                href={`/trivia/${triviaId}`}
              >
                Start game
              </Button>
            </>
          )}
        </>
      )}
    </form>
  );
}
