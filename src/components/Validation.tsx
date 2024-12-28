import "../styles/validation.scss";

interface Props {
  validItems: number[];
  active: boolean;
}

const Validation = ({ validItems }: Props) => {
  return (
    <div className="validation-group">
      <div className="validation-column">
        {[0, 1].map((item) => (
          <div
            key={item}
            className={`validation-item item-${validItems[item]}`}
          />
        ))}
      </div>
      <div className="validation-column">
        {[2, 3].map((item) => (
          <div
            key={item}
            className={`validation-item item-${validItems[item]}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Validation;
