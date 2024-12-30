import useGameStore from "../store/gameStore";
import "../styles/ficha.scss";

interface Props {
  isColumnActive: boolean;
  itemIndex: number;
  column: number;
}

const Ficha = ({ isColumnActive, itemIndex, column }: Props) => {
  const { movement, itemColors } = useGameStore();

  const active = itemIndex <= movement && isColumnActive;

  return (
    <div
      // onClick={handleClick}
      className={`ficha ficha-${itemIndex} column-${column}${
        active ? " active" : ""
      }`}
      style={{ background: itemColors[column][itemIndex] }}
    />
  );
};

export default Ficha;
