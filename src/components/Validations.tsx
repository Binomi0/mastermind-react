import useGameStore from "../store/gameStore";
import Validation from "./Validation";
import "../styles/validations.scss";

const Validations = () => {
  const { validation, activeColumn } = useGameStore();
  return (
    <div className="validations">
      {Object.keys(validation).map((column) => (
        <Validation
          key={column}
          validItems={validation[parseInt(column, 10)]}
          active={activeColumn === parseInt(column, 10)}
        />
      ))}
    </div>
  );
};

export default Validations;
