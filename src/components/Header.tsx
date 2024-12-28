import React from "react";
import useGameStore from "../store/gameStore";
import "../styles/header.scss";
const Header = () => {
  const { timeElapsed } = useGameStore();
  const [blink, setBlink] = React.useState("");

  React.useEffect(() => {
    if (timeElapsed === 1) {
      setBlink("blink");
    }
  }, [blink, timeElapsed]);

  return (
    <div className="header">
      <h2>MasterMind Game</h2>
      {timeElapsed !== 0 && (
        <h4>
          Transcurrido: <span className={blink}>{timeElapsed}</span> segundos
        </h4>
      )}
    </div>
  );
};

export default Header;
