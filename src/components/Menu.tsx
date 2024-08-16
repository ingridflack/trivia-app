import {
  Avatar,
  Box,
  IconButton,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
  Menu as ChakraMenu,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as UserService from "../services/userService";

interface UserData {
  username: string;
  avatar?: string;
}

export default function Menu() {
  const navigate = useNavigate();
  const toast = useToast();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) return;

    setUserData(JSON.parse(userData));

    UserService.getUser().then((response) => {
      console.log(response);
    });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);

    toast({
      title: "Logged out",
      description: "You have been logged out.",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top-right",
    });

    navigate("/login");
  };

  const handleTriviaHistory = () => {
    navigate("/trivia/history");
  };

  return (
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

        <ChakraMenu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon color="white" />}
            variant="outline"
          />
          <MenuList>
            <MenuItem onClick={handleTriviaHistory}>Trivia History</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </MenuList>
        </ChakraMenu>
      </Box>
    </Box>
  );
}
