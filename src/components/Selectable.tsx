interface Props {
  color: string;
  index: number;
  handleSetMovement: (color: string) => void;
}

const Selectable = ({ color, index, handleSetMovement }: Props) => {
  return (
    <div
      onClick={() => handleSetMovement(color)}
      className="ficha-seleccionable"
      style={{ background: color }}
    >
      {index}
    </div>
  );
};

export default Selectable;
