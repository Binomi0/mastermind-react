import useGameStore from "../store/gameStore";
import usePlayerStore from "../store/playerStore";
import { ChangeEvent, useState } from "react";
import MainGame from "./MainGame";
import Records from "./Records";
import "../styles/dashboard.scss";

const Dashboard = () => {
  const [showRecords, setShowRecords] = useState(false);
  const { playerName, filled, level, setName, setLevel } = usePlayerStore();
  const { setNewGameLevel, startGame, gameStarted } = useGameStore();

  function changeName(formData: FormData) {
    const name = formData.get("playerName");
    if (name) setName(name.toString());
  }

  function handleSelectLevel(event: ChangeEvent<HTMLSelectElement>) {
    const newLevel = Number(event.target.value);
    if (!isNaN(newLevel)) {
      setLevel(newLevel);
      setNewGameLevel(newLevel);
      startGame();
    }
  }

  if (!gameStarted) {
    return (
      <div className="dashboard">
        <h1>MasterMind Game</h1>
        {filled && (
          <div>
            <h3>Bienvenido {playerName}</h3>
            {!level && (
              <select autoFocus className="select" onChange={handleSelectLevel}>
                <option value={undefined}>Elige un nivel para empezar</option>
                <option value={5}>5 - Fácil</option>
                <option value={6}>6 - Intermedio</option>
                <option value={7}>7 - Difícil</option>
                <option value={8}>8 - Olvídalo</option>
              </select>
            )}

            <hr />

            <button
              className="new-game-button"
              onClick={() => setShowRecords((s) => !s)}
            >
              {showRecords ? "Hide " : "Show "}Records
            </button>
            {showRecords && <Records />}
          </div>
        )}
        <div className="form">
          {!filled && (
            <form action={changeName}>
              <label>Introduce tu nombre</label>
              <input autoFocus name="playerName" required />
              <button className="new-game-button" type="submit">
                Enviar
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return <MainGame />;
};

export default Dashboard;
