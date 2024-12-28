import useGameStore from "../store/gameStore";
import Column from "./Column";
import "../styles/tablero-juego.scss";

const TableroJuego = () => {
  const { itemColors, activeColumn } = useGameStore();
  return (
    <div className="tablero-juego">
      {Object.keys(itemColors).map((columnIndex) => (
        <Column
          key={columnIndex}
          column={Number(columnIndex)}
          isColumnActive={activeColumn === Number(columnIndex)}
        />
      ))}
    </div>
  );
};

export default TableroJuego;
