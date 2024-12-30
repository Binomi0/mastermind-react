import useGameStore from "../store/gameStore";
import Selectable from "./Selectable";
import "../styles/selectables.scss";

interface Props {
  handleSetMovement: (color: string) => void;
  handleValidateTurn: () => void;
}

const Selectables = ({ handleSetMovement, handleValidateTurn }: Props) => {
  const { turnFilled, availableColors } = useGameStore();

  return (
    <div className="seleccionable">
      <div className="fichas">
        {availableColors.map((color, index) => (
          <Selectable
            key={color}
            color={color}
            index={index + 1}
            handleSetMovement={handleSetMovement}
          />
        ))}
      </div>
      <button disabled={!turnFilled} onClick={handleValidateTurn}>
        Validar jugada
      </button>
    </div>
  );
};

export default Selectables;
