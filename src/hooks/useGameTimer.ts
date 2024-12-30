import { useCallback, useRef } from "react";
import useGameStore from "../store/gameStore";

const useGameTimer = () => {
  const gameTimer = useRef<NodeJS.Timer>(undefined);
  const { setTimeElapsed } = useGameStore();

  const setGameTimer = useCallback(() => {
    let timer = 0;
    if (!gameTimer.current) {
      gameTimer.current = setInterval(() => {
        timer += 1;
        setTimeElapsed(timer);
      }, 1000);
    }
  }, [setTimeElapsed]);

  return { setGameTimer, gameTimer };
};

export default useGameTimer;
