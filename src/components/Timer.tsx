import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface TimerProps {
  value: number;
  maxValue: number;
}

export default function Timer({ value, maxValue }: TimerProps) {
  return (
    <CircularProgress
      value={value}
      color="green.400"
      size="120px"
      min={0}
      max={maxValue}
    >
      <CircularProgressLabel>{value}</CircularProgressLabel>
    </CircularProgress>
  );
}
