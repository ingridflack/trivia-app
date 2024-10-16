import { useCallback, useEffect, useRef, useState } from "react";

interface UseTimerProps {
  onTimeOut?: (timeLeft: number) => void;
  startTime?: number;
}

export default function useTimer({ onTimeOut, startTime = 30 }: UseTimerProps) {
  const [timeLeft, setTimeLeft] = useState<number>(startTime);
  const intervalRef = useRef<NodeJS.Timeout>();
  const elapsedTime = startTime - timeLeft;

  useEffect(() => {
    if (!intervalRef.current) return;

    if (timeLeft === 0) {
      clearInterval(intervalRef.current);
      onTimeOut?.(timeLeft);
    }
  }, [onTimeOut, timeLeft]);

  useEffect(() => {
    return () => clearTimerInterval();
  }, []);

  const startTimer = useCallback(() => {
    setTimerInterval();
  }, []);

  const pauseTimer = useCallback(() => {
    clearTimerInterval();
  }, []);

  const setTimerInterval = () => {
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
  };

  const clearTimerInterval = () => {
    clearInterval(intervalRef.current);
  };

  const resetTimer = () => {
    clearTimerInterval();
    setTimerInterval();
    setTimeLeft(startTime);
  };

  return {
    timeLeft,
    startTime,
    elapsedTime,
    setTimeLeft,
    pauseTimer,
    resetTimer,
    startTimer,
  };
}
