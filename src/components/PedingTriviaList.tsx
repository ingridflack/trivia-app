import {
  Avatar,
  AvatarGroup,
  Badge,
  Button,
  Card,
  Container,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PendingTrivia } from "../types/sharedTypes";
import { badgeColor } from "../helpers/trivia";
import { CATEGORY_LABELS } from "../constants/trivia";

interface PendingTriviaListProps {
  pendingTriviaList: PendingTrivia[];
}

export const PendingTriviaList = ({
  pendingTriviaList,
}: PendingTriviaListProps) => {
  return (
    <Container paddingY="32px">
      <Text fontSize="2xl" fontWeight="bold" marginBottom="8px">
        Pending Trivia
      </Text>

      <Stack display="grid" gridTemplateColumns="repeat(4, 1fr)">
        {pendingTriviaList.map(({ trivia }) => (
          <Card key={trivia._id} padding="16px" role="group">
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
            >
              <Text color="gray.500">
                {CATEGORY_LABELS[trivia.category] || "General Knowledge"}
              </Text>
              <Badge colorScheme={badgeColor(trivia.difficulty)}>
                {trivia.difficulty}
              </Badge>
            </Stack>

            <AvatarGroup
              size="sm"
              display="flex"
              marginTop="12px"
              justifyContent="end"
            >
              {trivia.users.map((user) => (
                <Avatar
                  key={user._id}
                  name={user.username}
                  src={user.avatar ? user.avatar : ""}
                  width="40px"
                  height="40px"
                  borderColor="white"
                  borderWidth={3}
                  bg="purple.500"
                  padding={2}
                  color={"white"}
                />
              ))}
            </AvatarGroup>

            <Stack
              alignItems="center"
              justifyContent="center"
              position="absolute"
              w="100%"
              h="100%"
              left="0"
              top="0"
              opacity="0"
              backgroundColor="rgba(0, 0, 0, 0.3)"
              _groupHover={{ opacity: 1 }}
              transition={"opacity 0.3s"}
              borderRadius="6px"
            >
              <Button as="a" href={`/trivia/${trivia._id}`}>
                Play!
              </Button>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
};
