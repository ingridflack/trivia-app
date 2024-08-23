import { Avatar, Box, Text, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

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

  return (
    <Box
      w="100%"
      bg="gray.200"
      height="50px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingX="50px"
      fontFamily="Slackey"
    >
      <Text fontSize="26px" fontWeight="bold">
        Trivia
      </Text>

      <Box display="flex" alignItems="center" gap="16px">
        {userData ? (
          <>
            <Link to="/trivia/history"> History </Link>
            <Link to="/login" onClick={handleLogout}>
              Logout
            </Link>
            <Avatar
              src={userData?.avatar}
              width="50px"
              height="50px"
              borderColor="white"
              borderWidth={3}
              bg="purple.500"
              padding={2}
            />
          </>
        ) : (
          <>
            <Link to="/login"> Login </Link>
            <Link to="/sign-up"> Sign Up </Link>
          </>
        )}
      </Box>
    </Box>
  );
}
