import { Box, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <Box as="footer" bg="#AE79F8" color="white" py={12} width="100%">
      <Stack spacing={2} align="center">
        <Text>© 2024 Trivia App</Text>
        <Text>Developed by Ingrid Flack</Text>
        <Stack direction="row" spacing={4}>
          <Link to="https://www.linkedin.com/in/ingrid-flack/">LinkedIn</Link>
          <Link to="https://github.com/ingridflack">GitHub</Link>
        </Stack>
      </Stack>
    </Box>
  );
};
