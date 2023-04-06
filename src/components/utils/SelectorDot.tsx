/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
interface Props {
  value: number;
  selected: number;
  setSelected: React.Dispatch<React.SetStateAction<number>>;
}

const SelectorDot = ({ value, selected, setSelected }: Props) => (
  <div
    onClick={() => {
      setSelected(value);
    }}
    className={`h-[1.25rem] w-[1.25rem] rounded-full border-[3px] border-darkprimary-800 dark:border-darkprimary-400 hover:opacity-75 cursor-pointer ${
      selected === value ? 'bg-darkprimary-800 dark:bg-darkprimary-400' : ''
    }
  }`}
  />
);

export default SelectorDot;
