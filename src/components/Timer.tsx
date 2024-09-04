import { CircularProgress, CircularProgressLabel } from "@chakra-ui/react";

interface TimerProps {
  value: number;
  maxValue: number;
}

export default function Timer({ value, maxValue }: TimerProps) {
  const color = value <= 5 ? "red.400" : "green.400";

  return (
    <CircularProgress
      value={value}
      color={color}
      size="74px"
      display="flex"
      alignItems="center"
      justifyContent="center"
      min={0}
      max={maxValue}
      thickness="4px"
    >
      <CircularProgressLabel color={color} fontWeight={700}>
        {value}
      </CircularProgressLabel>
    </CircularProgress>
  );
}
