import { Avatar, Box, Container, Stack, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

interface UserData {
  username: string;
  avatar?: string;
}

export default function Header() {
  const navigate = useNavigate();

  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");

    if (!userData) return;

    setUserData(JSON.parse(userData));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userData");
    setUserData(null);

    navigate("/login");
  };

  return (
    <Box
      w="100%"
      bg="white"
      height="50px"
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      paddingX="50px"
      fontFamily="Slackey"
    >
      <Container maxWidth="992px">
        <Stack direction="row" justifyContent="space-between" spacing={4}>
          <Link to="/">
            <Text fontSize="26px" fontWeight="bold">
              Trivia
            </Text>
          </Link>

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
                <Link to="/login"> Sign in </Link>
                <Link to="/sign-up"> Sign Up </Link>
              </>
            )}
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
