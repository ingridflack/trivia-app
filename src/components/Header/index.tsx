import { Avatar, Box, Container, Stack, Text, Tooltip } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export default function Header() {
  const navigate = useNavigate();

  const { userData, clearUserData } = useAuth();

  const handleLogout = () => {
    clearUserData();
    navigate("/");
  };

  return (
    <Box as="header" bg="white" paddingX={{ base: "20px", md: "5px 50px" }}>
      <Container padding="5px">
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
                <Stack flexDirection="row" align="center" gap="4px">
                  <Avatar
                    src={userData?.avatar}
                    width="30px"
                    height="30px"
                    borderColor="white"
                    borderWidth={3}
                    bg="purple.500"
                    padding="5px"
                  />

                  <Text display={{ base: "none", md: "block" }} fontSize="14px">
                    {" "}
                    {userData?.username}
                  </Text>
                </Stack>
                <Link to="/login" onClick={handleLogout}>
                  <Tooltip label="Logout" textTransform="capitalize">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="#000000"
                      height="14px"
                      width="14px"
                      version="1.1"
                      id="Capa_1"
                      viewBox="0 0 384.971 384.971"
                    >
                      <g>
                        <g id="Sign_Out">
                          <path d="M180.455,360.91H24.061V24.061h156.394c6.641,0,12.03-5.39,12.03-12.03s-5.39-12.03-12.03-12.03H12.03    C5.39,0.001,0,5.39,0,12.031V372.94c0,6.641,5.39,12.03,12.03,12.03h168.424c6.641,0,12.03-5.39,12.03-12.03    C192.485,366.299,187.095,360.91,180.455,360.91z" />
                          <path d="M381.481,184.088l-83.009-84.2c-4.704-4.752-12.319-4.74-17.011,0c-4.704,4.74-4.704,12.439,0,17.179l62.558,63.46H96.279    c-6.641,0-12.03,5.438-12.03,12.151c0,6.713,5.39,12.151,12.03,12.151h247.74l-62.558,63.46c-4.704,4.752-4.704,12.439,0,17.179    c4.704,4.752,12.319,4.752,17.011,0l82.997-84.2C386.113,196.588,386.161,188.756,381.481,184.088z" />
                        </g>
                      </g>
                    </svg>
                  </Tooltip>
                </Link>
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
