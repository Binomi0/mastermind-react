import Ficha from "./Ficha";
import useGameStore from "../store/gameStore";

interface Props {
  isColumnActive: boolean;
  column: number;
}

const Column = ({ isColumnActive, column }: Props) => {
  const { itemColors } = useGameStore();
  return (
    <div className="column-group">
      <div className={`column-item${isColumnActive ? " column-active" : ""}`}>
        {Object.keys(itemColors[column]).map((row) => (
          <Ficha
            isColumnActive={isColumnActive}
            key={row}
            column={Number(column)}
            itemIndex={Number(row)}
          />
        ))}
      </div>
      {isColumnActive && (
        <span role="img" aria-label="arrow-up">
          ⬆️
        </span>
      )}
    </div>
  );
};

export default Column;
