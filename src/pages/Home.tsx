import { useEffect, useState } from "react";
import * as UserService from "../services/userService";
import {
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import TriviaConfig from "../components/TriviaConfig";

interface UserData {
  username: string;
  avatar?: string;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) return;

    setUserData(JSON.parse(userData));

    UserService.getUser().then((response) => {
      console.log(response);
    });
  }, []);

  return (
    <div>
      <Box
        w="100%"
        bg="purple.500"
        padding="10px"
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="large" color="white">
          Trivia App Logo
        </Text>

        <Button fontSize="large">Play Trivia</Button>

        <Box display="flex" alignItems="center" gap="16px">
          <Avatar
            src={userData?.avatar}
            width="50px"
            height="50px"
            borderColor="white"
            borderWidth={3}
            bg="purple.500"
            padding={2}
          />

          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon color="white" />}
              variant="outline"
            />
            <MenuList>
              <MenuItem>Trivia History</MenuItem>
              <MenuItem>Settings</MenuItem>
              <MenuItem>Logout</MenuItem>
            </MenuList>
          </Menu>
        </Box>
      </Box>

      <Container
        centerContent
        height="100%"
        alignItems="center"
        justifyContent="center"
      >
        <TriviaConfig />
      </Container>
    </div>
  );
}
