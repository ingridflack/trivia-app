import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Select,
} from "@chakra-ui/react";
import { FieldErrors, UseFormRegister } from "react-hook-form";

import { UserSearchSelectOption } from "../../types/sharedTypes";
import {
  AMOUNT_OPTIONS,
  DIFFICULTY_OPTIONS,
  GAME_MODE_OPTIONS,
  TRIVIA_CATEGORIES,
} from "../../constants/trivia";
import AsyncSelect from "react-select/async";
import { MultiValue } from "react-select";
import { GameConfigValues } from "../../pages/Config";

export interface TriviaConfigProps {
  onLoadUsers: (inputValue: string) => Promise<UserSearchSelectOption[]>;
  onInviteUser: (value: MultiValue<UserSearchSelectOption>) => void;
  onGameModeChange: (gameMode: string) => void;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  errors: FieldErrors<GameConfigValues>;
  register: UseFormRegister<GameConfigValues>;
  isSubmitting: boolean;
  gameMode: string;
  invitedUsers: MultiValue<UserSearchSelectOption>;
}

export default function TriviaConfig({
  onLoadUsers,
  onInviteUser,
  onGameModeChange,
  onSubmit,
  errors,
  register,
  isSubmitting,
  gameMode,
  invitedUsers,
}: TriviaConfigProps) {
  return (
    <form
      role="form"
      onSubmit={onSubmit}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Grid
        templateColumns={{ base: "1fr", md: "repeat(2, 1fr)" }}
        gap="0 20px"
        width="100%"
      >
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
            {Object.entries(TRIVIA_CATEGORIES).map(([id, { title }]) => (
              <option key={id} value={id}>
                {title}
              </option>
            ))}
          </Select>
          <FormErrorMessage>
            {errors.category && errors.category.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={!!errors.difficulty} minW="186px">
          <FormLabel
            htmlFor="difficulty"
            marginTop={{ base: "16px", md: 0 }}
            fontSize="small"
            marginBottom="4px"
          >
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
            onChange={(e) => onGameModeChange(e.target.value)}
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
                loadOptions={onLoadUsers}
                placeholder="Select user"
                options={[
                  { value: "user1", label: "User 1" },
                  { value: "user2", label: "User 2" },
                  { value: "user3", label: "User 3" },
                ]}
                onChange={onInviteUser}
              />
            </FormControl>
          </Flex>

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
