import { enqueueSnackbar } from "notistack";
import useGameStore from "../store/gameStore";
import { isEnterKeyPressed, isValidKey } from "../utils/handlers";
import { useCallback, useEffect, useRef } from "react";

const MainGame = () => {
  const {
    availableColors,
    timeElapsed,
    setNewTurn,
    setTimeElapsed,
    activeColumn,
    movement,
    itemColors,
  } = useGameStore();
  const gameTimer = useRef<NodeJS.Timer>(undefined);

  const setGameTimer = useCallback(() => {
    let timer = 0;
    if (!gameTimer.current) {
      gameTimer.current = setInterval(() => {
        timer += 1;
        setTimeElapsed(timer);
      }, 1000);
    }
  }, [setTimeElapsed]);

  const handleSetMovement = useCallback(
    (color: string) => {
      if (timeElapsed === 0) {
        setGameTimer();
      }

      if (movement / activeColumn > 4) {
        return;
      }

      const newTurn = {
        selectedColor: color,
        itemColors: {
          ...itemColors,
          [activeColumn]: {
            ...itemColors[activeColumn],
            [movement]: color,
          },
        },
        movement: movement + 1,
      };

      setNewTurn(newTurn);
    },
    [activeColumn, itemColors, movement, setGameTimer, setNewTurn, timeElapsed]
  );

  const handleValidate = () => {};

  const setKeyListeners = useCallback(
    (e: KeyboardEvent) => {
      if (["Enter", "1", "2", "3", "4", "5", "6", "7", "8"].includes(e.key)) {
        if (isValidKey(e.key, availableColors.length)) {
          if (/[1-8]/.test(e.key)) {
            handleSetMovement(availableColors[Number(e.key) - 1]);
          }
          if (isEnterKeyPressed(e.key)) {
            handleValidate();
          }
        }
        return e.key;
      }
    },
    [availableColors, handleSetMovement]
  );

  useEffect(() => {
    document.addEventListener("keydown", setKeyListeners);

    enqueueSnackbar("Cuando estés listo, puedes comenzar");
    return () => {
      document.removeEventListener("keydown", setKeyListeners);
    };
  }, [availableColors, setKeyListeners]);

  return <div />;
};

export default MainGame;
