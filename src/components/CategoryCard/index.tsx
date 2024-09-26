import { Box, Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  title: string;
  icon: string;
  color: string;
}

export const CategoryCard = ({ title, icon, color }: CategoryCardProps) => {
  return (
    <Card
      as={Link}
      to="/trivia/config"
      key={icon}
      position="relative"
      height="200px"
      padding="75px 30px 20px"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      transition="transform 300ms ease"
      _hover={{ transform: "scale(1.1)" }}
      marginTop="40px"
    >
      <Box
        width="100px"
        height="100px"
        borderRadius="full"
        backgroundColor={color}
        position="absolute"
        top="-20%"
        left="50%"
        transform="translateX(-50%)"
      >
        <Image src={icon} alt={title} />
      </Box>

      <Text fontSize="md" fontWeight="bold" textAlign="center">
        {title}
      </Text>

      <Button colorScheme="purple" width="100px">
        Play
      </Button>
    </Card>
  );
};
