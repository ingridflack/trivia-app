import { Box, Card, Container, Image, Text, useToast } from "@chakra-ui/react";
import TriviaConfig from "../../components/TriviaConfig";
import Header from "../../components/Header";
import { Footer } from "../../components/Footer";
import * as UserService from "../../services/userService";
import * as TriviaService from "../../services/triviaService";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MultiValue } from "react-select";
import { UserSearchSelectOption } from "../../types/sharedTypes";
import useAuth from "../../hooks/useAuth";

export interface GameConfigValues {
  category: string;
  difficulty: string;
  amount: number;
  gameMode: string;
  type: string;
}

export default function Config() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<GameConfigValues>({
    defaultValues: {
      difficulty: "any",
      type: "any",
      amount: 5,
    },
  });

  const [gameMode, setGameMode] = useState("single");
  const navigate = useNavigate();
  const toast = useToast();
  const [invitedUsers, setInvitedUsers] = useState<
    MultiValue<UserSearchSelectOption>
  >([]);
  const { userData } = useAuth();

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
    const currentUserId = userData ? userData.id : "";

    const { data } = await UserService.search({ username });
    return data
      .filter((user) => user._id !== currentUserId)
      .map((user) => ({ value: user._id, label: user.username }));
  };

  return (
    <>
      <Header />

      <Container
        as="main"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Card
          display="flex"
          flexDirection={["column", "column", "row"]}
          justifyContent="space-around"
          width="100%"
          paddingY="50px"
          paddingX="70px"
          padding={{ base: "20px", md: "50px 70px" }}
          shadow="xl"
        >
          <Image
            src="/assets/setup.svg"
            alt="Login image"
            width="388px"
            height="307px"
            pointerEvents="none"
            display={{ base: "none", md: "none", lg: "block" }}
          />
          <Box maxW="392px" width="100%">
            <Text fontSize="xx-large" marginBottom="20px" color="gray.700">
              Trivia setup
            </Text>
            <TriviaConfig
              onLoadUsers={handleLoadUsers}
              onInviteUser={handleInviteUser}
              onGameModeChange={handleGameModeChange}
              onSubmit={handleSubmit(onSubmit)}
              errors={errors}
              register={register}
              isSubmitting={isSubmitting}
              gameMode={gameMode}
              invitedUsers={invitedUsers}
            />
          </Box>
        </Card>
      </Container>
      <Footer />
    </>
  );
}
