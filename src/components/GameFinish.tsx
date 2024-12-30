import { Ref, RefObject, useCallback, useEffect, useState } from "react";
import Confetti from "react-dom-confetti";
import useGameStore from "../store/gameStore";
import usePlayerStore from "../store/playerStore";
import "../styles/game-finish.scss";
import Records from "./Records";

const confettiConfig = {
  angle: 90,
  spread: 45,
  startVelocity: 45,
  elementCount: 100,
  dragFriction: 0.1,
  duration: 6000,
  stagger: 0,
  width: "10px",
  height: "10px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
};

interface Props {
  ref: RefObject<NodeJS.Timer | undefined>;
}

const GameFinish = ({ ref }: Props) => {
  const [showConfetti, setShowConfetti] = useState(false);
  const { playerName } = usePlayerStore();
  const { activeColumn, gameWin, gameLost, timeElapsed, score, resetGame } =
    useGameStore();
  const { setLevel } = usePlayerStore();

  const handleResetGame = useCallback(() => {
    resetGame();
    setLevel(0);
    clearInterval(ref.current);
  }, [ref, resetGame, setLevel]);

  useEffect(() => {
    if (gameWin) setShowConfetti(true);
  }, [gameWin]);

  const winMessage = `Has conseguido ${score} puntos, en ${timeElapsed} segundos y ${activeColumn} columnas!`;
  const lostMessage = `Creo que deberías practicar un poco más...`;

  return (
    <section>
      <div className="game-finish">
        <Confetti active={showConfetti} config={confettiConfig} />

        {gameWin && <h1>¡Has Ganado {playerName}!</h1>}
        {gameLost && <h1>{playerName}, has perdido...</h1>}

        <p>{gameWin && winMessage}</p>
        <p>{gameLost && lostMessage}</p>

        <button className="finish-button" onClick={handleResetGame}>
          Jugar otra vez
        </button>

        <Records />
      </div>
    </section>
  );
};

export default GameFinish;
