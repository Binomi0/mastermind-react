import { useCallback, useEffect } from "react";
import { enqueueSnackbar } from "notistack";
import useGameStore from "../store/gameStore";
import { isEnterKeyPressed, isValidKey } from "../utils/handlers";
import GameFinish from "./GameFinish";
import Header from "./Header";
import Validations from "./Validations";
import TableroJuego from "./TableroJuego";
import Selectables from "./Selectables";
import usePlayerStore from "../store/playerStore";
import "../styles/main-game.scss";
import useGameTimer from "../hooks/useGameTimer";
import { GameRecord } from "../store/types";
import { sortRecords } from "../utils/helpers";

const MainGame = () => {
  const {
    gameWin,
    gameLost,
    availableColors,
    timeElapsed,
    setNewTurn,
    activeColumn,
    movement,
    itemColors,
    handleValidate,
    goBackMovement,
  } = useGameStore();
  const { playerName } = usePlayerStore();
  const { setGameTimer, gameTimer } = useGameTimer();

  const handleSetMovement = useCallback(
    (color: string) => {
      if (timeElapsed === 0) setGameTimer();
      if (movement / activeColumn > 4) return;

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

  const handleValidateTurn = useCallback(() => {
    handleValidate((_score) => {
      clearInterval(gameTimer.current);

      if (_score) {
        const records = localStorage.getItem("records");

        if (!records) {
          localStorage.setItem(
            "records",
            JSON.stringify([
              { score: _score, time: timeElapsed, player: playerName },
            ])
          );
        } else {
          const recordsJSON: GameRecord[] = JSON.parse(records);
          recordsJSON.push({
            score: _score,
            time: timeElapsed,
            player: playerName,
          });
          localStorage.setItem(
            "records",
            JSON.stringify(recordsJSON.sort(sortRecords))
          );
        }
      }
    });
  }, [gameTimer, handleValidate, playerName, timeElapsed]);

  const setKeyListeners = useCallback(
    (e: KeyboardEvent) => {
      if (["Enter", "1", "2", "3", "4", "5", "6", "7", "8"].includes(e.key)) {
        if (isValidKey(e.key, availableColors.length)) {
          if (/[1-8]/.test(e.key)) {
            handleSetMovement(availableColors[Number(e.key) - 1]);
          }
          if (isEnterKeyPressed(e.key)) {
            handleValidateTurn();
          }
        }
        return e.key;
      } else if (e.key === "Backspace") {
        goBackMovement();
      }
    },
    [availableColors, goBackMovement, handleSetMovement, handleValidateTurn]
  );

  useEffect(() => {
    document.addEventListener("keydown", setKeyListeners);

    return () => {
      document.removeEventListener("keydown", setKeyListeners);
    };
  }, [availableColors, setKeyListeners]);

  useEffect(() => {
    enqueueSnackbar("Cuando estés listo, puedes comenzar");
  }, []);

  return (
    <div className="tablero">
      {gameWin || gameLost ? (
        <GameFinish ref={gameTimer} />
      ) : (
        <>
          <Header />
          <div className="game-container">
            <Validations />
            <TableroJuego />
          </div>
          <Selectables
            handleSetMovement={handleSetMovement}
            handleValidateTurn={handleValidateTurn}
          />
          <p>
            Puedes usar los números (1,2,3...) para seleccionar un color y
            (Enter) para validar la jugada.
          </p>
        </>
      )}
    </div>
  );
};

export default MainGame;
