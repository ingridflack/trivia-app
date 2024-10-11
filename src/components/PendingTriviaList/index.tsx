import {
  Avatar,
  AvatarGroup,
  Badge,
  Box,
  Button,
  Card,
  Image,
  Stack,
  Text,
} from "@chakra-ui/react";
import { PendingTrivia } from "../../types/sharedTypes";
import { badgeColor } from "../../helpers/trivia";
import { TRIVIA_CATEGORIES } from "../../constants/trivia";
import { Link } from "react-router-dom";

interface PendingTriviaListProps {
  pendingTriviaList: PendingTrivia[];
}

export const PendingTriviaList = ({
  pendingTriviaList,
}: PendingTriviaListProps) => {
  return (
    <Stack
      display="grid"
      gap="16px"
      gridTemplateColumns={{ base: "repeat(1fr)", md: "repeat(4, 1fr)" }}
    >
      {pendingTriviaList.map(({ trivia }) => {
        const triviaItem = TRIVIA_CATEGORIES[Number(trivia.category)];

        return (
          <Card key={trivia._id}>
            <Badge
              colorScheme={badgeColor(trivia.difficulty)}
              position="absolute"
              top="4px"
              right="4px"
              size="xs"
              fontSize="10px"
            >
              {trivia.difficulty}
            </Badge>
            <Stack
              direction="row"
              gap="10px"
              padding="20px"
              alignItems="center"
              flex="1"
            >
              <Box
                width="50px"
                height="50px"
                borderRadius="full"
                backgroundColor={triviaItem?.color}
                flexShrink={0}
              >
                <Image src={triviaItem?.icon} alt={triviaItem?.title} />
              </Box>

              <Box>
                <Text fontSize="md" fontWeight="bold">
                  {triviaItem?.title}
                </Text>
              </Box>
            </Stack>
            <Button
              as={Link}
              to={`/trivia/${trivia._id}`}
              backgroundColor={triviaItem?.color}
              borderRadius="0 0 6px 6px"
              size="lg"
              color="black.600"
              fontWeight="700"
              transition="filter 300ms ease"
              _hover={{
                backgroundColor: triviaItem?.color,
                filter: "brightness(90%)",
              }}
            >
              Join
              <AvatarGroup size="xs" marginLeft="10px" max={3}>
                {trivia.users.map((user) => (
                  <Avatar
                    key={user._id}
                    name={user.username}
                    src={user.avatar ? user.avatar : ""}
                    bg="purple.500"
                    padding={1}
                  />
                ))}
              </AvatarGroup>
            </Button>
          </Card>
        );
      })}
    </Stack>
  );
};
