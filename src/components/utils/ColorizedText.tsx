type Props = {
  text: string;
};

const ColorizedText = ({ text }: Props) => {
  const textArray = text.split('');
  return (
    <div>
      {textArray.map((val, index) => {
        return val.charCodeAt(0) >= 48 && val.charCodeAt(0) <= 57 ? (
          <span key={index} className="text-orange-600">
            {val}
          </span>
        ) : (
          <span key={index} className="text-indigo-600">
            {val}
          </span>
        );
      })}
    </div>
  );
};

export default ColorizedText;
