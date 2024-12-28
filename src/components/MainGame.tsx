import { useCallback, useEffect, useRef } from "react";
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

const MainGame = () => {
  const {
    gameWin,
    gameLost,
    availableColors,
    timeElapsed,
    setNewTurn,
    setTimeElapsed,
    activeColumn,
    movement,
    itemColors,
    handleValidate,
  } = useGameStore();
  const { playerName } = usePlayerStore();
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

  const handleValidateTurn = useCallback(() => {
    handleValidate((_score) => {
      clearInterval(gameTimer.current);

      if (_score) {
        console.log("Has conseguido", _score, " puntos.");

        const records = localStorage.getItem("records");

        if (!records) {
          localStorage.setItem(
            "records",
            JSON.stringify([
              { score: _score, time: timeElapsed, player: playerName },
            ])
          );
        } else {
          const recordsJSON = JSON.parse(records);
          recordsJSON.push({
            score: _score,
            time: timeElapsed,
            player: playerName,
          });
          localStorage.setItem("records", JSON.stringify(recordsJSON));
        }
      }
    });
  }, [handleValidate, playerName, timeElapsed]);

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
      }
    },
    [availableColors, handleSetMovement, handleValidateTurn]
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

  console.log({ gameWin, gameLost }, gameWin || gameLost);

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
      {/* {hasError && <h1>Mierda un ojet!</h1>} */}
    </div>
  );
};

export default MainGame;
