import { Box, Button, Card, Image, Text } from "@chakra-ui/react";

interface CategoryCardProps {
  title: string;
  icon: string;
  color: string;
  onCardClick?: () => void;
}

export const CategoryCard = ({
  title,
  icon,
  color,
  onCardClick,
}: CategoryCardProps) => {
  return (
    <Card
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
      onClick={onCardClick}
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
