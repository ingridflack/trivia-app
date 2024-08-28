import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface TimerProps {
  value: number;
  maxValue: number;
}

export default function Timer({ value, maxValue }: TimerProps) {
  return (
    <CircularProgress
      value={value}
      color="gray.400"
      size="74px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      min={0}
      max={maxValue}
      thickness="4px"
    >
      <CircularProgressLabel color="gray.400">{value}</CircularProgressLabel>
    </CircularProgress>
  );
}
