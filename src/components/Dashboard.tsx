import useGameStore from "../store/gameStore";
import usePlayerStore from "../store/playerStore";
import { ChangeEvent, useState } from "react";
import MainGame from "./MainGame";

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
    }
  }

  if (!gameStarted) {
    return (
      <div className="dashboard">
        <h1>MasterMind Game</h1>
        {filled && (
          <div>
            <h3>Bienvenido {playerName}</h3>
            {level ? (
              <button className="new-game-button" onClick={startGame}>
                Nueva Partida
              </button>
            ) : (
              <select onChange={handleSelectLevel}>
                <option value={undefined}>Elige un nivel</option>
                <option value={5}>5 - Fácil</option>
                <option value={6}>6 - Intermedio</option>
                <option value={7}>7 - Difícil</option>
                <option value={8}>8 - Olvídalo</option>
              </select>
            )}

            <hr />

            <button
              className="new-game-button"
              onClick={() => setShowRecords(true)}
            >
              Records
            </button>
            {/* {showRecords && <Records />} */}
          </div>
        )}
        <div className="form">
          {!filled && (
            <form action={changeName}>
              <label>Introduce tu nombre</label>
              <input name="playerName" required />
              <button type="submit">Enviar</button>
            </form>
          )}
        </div>
      </div>
    );
  }

  return <MainGame />;
};

export default Dashboard;
