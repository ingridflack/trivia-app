import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Select,
  useToast,
} from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import * as TriviaService from "../services/triviaService";
import * as UserService from "../services/userService";
import { Category, UserSearchSelectOption } from "../types/sharedTypes";
import { useNavigate } from "react-router-dom";
import {
  AMOUNT_OPTIONS,
  DIFFICULTY_OPTIONS,
  GAME_MODE_OPTIONS,
} from "../constants/trivia";
import AsyncSelect from "react-select/async";
import { MultiValue } from "react-select";

interface GameConfigValues {
  category: string;
  difficulty: string;
  amount: number;
  gameMode: string;
  type: string;
}

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
  const navigate = useNavigate();
  const toast = useToast();
  const [invitedUsers, setInvitedUsers] = useState<
    MultiValue<UserSearchSelectOption>
  >([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const { data } = await TriviaService.getCategories();
      setCategories(data.categories);
    };

    fetchCategories();
  }, []);

  const onSubmit: SubmitHandler<GameConfigValues> = async (values) => {
    try {
      const invitedUsersIds =
        gameMode === "multi"
          ? invitedUsers.map((option) => option.value)
          : undefined;

      const body = {
        ...values,
        invitedUsers: invitedUsersIds,
      };

      const { data } = await TriviaService.createTrivia(body);

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

  const handleGameModeChange = (value: string) => {
    setGameMode(value);
  };

  const handleInviteUser = (value: MultiValue<UserSearchSelectOption>) => {
    setInvitedUsers(value);
  };

  const handleLoadUsers = async (username: string) => {
    const userData = localStorage.getItem("userData");
    const currentUserId = userData ? JSON.parse(userData).id : "";

    const { data } = await UserService.search({ username });
    return data
      .filter((user) => user._id !== currentUserId)
      .map((user) => ({ value: user._id, label: user.username }));
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
        <FormControl isInvalid={!!errors.category} minW="186px">
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

        <FormControl isInvalid={!!errors.difficulty} minW="186px">
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

        <FormControl isInvalid={!!errors.amount} minW="186px">
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

        <FormControl isInvalid={!!errors.gameMode} minW="186px">
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
          <Flex mt={2} width="100%">
            <FormControl>
              <AsyncSelect
                isMulti
                cacheOptions
                loadOptions={handleLoadUsers}
                placeholder="Select user"
                options={[
                  { value: "user1", label: "User 1" },
                  { value: "user2", label: "User 2" },
                  { value: "user3", label: "User 3" },
                ]}
                onChange={handleInviteUser}
              />
            </FormControl>
          </Flex>

          {console.log({ invitedUsers, gameMode })}

          <Button
            colorScheme="purple"
            size="lg"
            width="100%"
            marginTop="16px"
            isLoading={isSubmitting}
            type="submit"
            isDisabled={invitedUsers.length === 0 && gameMode === "multi"}
          >
            Start game
          </Button>
        </>
      )}
    </form>
  );
}
