import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Box
      boxShadow="0px 30px 100px 0 rgba(39, 39, 39, 0.2);"
      as="footer"
      bg="white"
      py={12}
      width="100%"
    >
      <Container>
        <Stack
          direction={{ base: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ base: "flex-start", md: "center" }}
          spacing={4}
        >
          <Link to="/">
            <Text
              color="purple.700"
              fontSize="26px"
              fontWeight="bold"
              fontFamily="Rowdies, sans-serif"
            >
              Trivia
            </Text>
          </Link>

          <Box>
            <Heading display="block" as="strong" marginBottom="4px" size="xs">
              Site map
            </Heading>
            <Stack fontSize="sm" direction="row" spacing={4}>
              <Link to="/">Home</Link>
              <Link to="/login">Sign in</Link>
              <Link to="/sign-up">Sign up</Link>
            </Stack>
          </Box>

          <Box>
            <Heading display="block" as="strong" marginBottom="4px" size="xs">
              Social
            </Heading>
            <Stack fontSize="sm" direction="row" spacing={4}>
              <Link to="https://www.linkedin.com/in/ingrid-flack/">
                LinkedIn
              </Link>
              <Link to="https://github.com/ingridflack">GitHub</Link>
            </Stack>
          </Box>
        </Stack>

        <Stack
          borderTop="1px solid var(--chakra-colors-gray-200)"
          marginTop="32px"
          paddingTop="32px"
          fontSize="xs"
          justifyContent="space-between"
          direction="row"
        >
          <Text>© 2024 Trivia App</Text>
          <Text>Developed by Ingrid Flack</Text>
        </Stack>
      </Container>
    </Box>
  );
};
