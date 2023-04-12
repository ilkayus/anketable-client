/* eslint-disable nonblock-statement-body-position */
export interface Props<T> {
  label: string;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  type?: 'text' | 'number';
  log?: boolean;
  placeholder?: string;
  invalid?: boolean;
  maxLength?: number;
}

const InputWithLabel = <T extends string | number>({
  label,
  value,
  setValue,
  type = 'text',
  log = false,
  placeholder = '',
  invalid = false,
  maxLength,
}: Props<T>) => {
  if (log) console.log(`${label}:${value}`);
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof value === 'string') setValue(event.target.value as T);
    if (typeof value === 'number') {
      setValue(parseInt(event.target.value, 10) as T);
    }
  };

  return (
    <div
      className={`${
        invalid ? 'border-red-600' : 'border-green-600'
      } border-2 box-border m-2 rounded-2xl grid grid-rows-2 h-28 `}
    >
      <h2
        className={`${
          invalid
            ? 'bg-red-100 dark:bg-red-900/30'
            : 'bg-green-100 dark:bg-green-900/30'
        } p-2 rounded-t-2xl text-center text-lg sm:text-xl pt-3`}
      >
        {label}
      </h2>
      <input
        className="focus:outline-none text-lg sm:text-xl text-center p-2 rounded-b-2xl text-gray-900"
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
      />
    </div>
  );
};

export default InputWithLabel;
