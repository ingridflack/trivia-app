import { Avatar, Box, Container, Stack, Text } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();

  const { userData, clearUserData } = useAuth();

  const handleLogout = () => {
    clearUserData();

    navigate("/login");
  };

  return (
    <Box as="header" bg="white" paddingY="5px" paddingX="50px">
      <Container>
        <Stack
          align="center"
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <Link to="/">
            <Text
              fontSize="26px"
              fontWeight="bold"
              fontFamily="Rowdies, sans-serif"
            >
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

                <Text display={{ base: "none", md: "block" }}>
                  {" "}
                  {userData?.username}
                </Text>
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
