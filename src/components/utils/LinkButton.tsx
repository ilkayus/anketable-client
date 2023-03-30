import { useNavigate } from 'react-router-dom';
import type { ButtonColors } from './constants';

export interface Props {
  label?: string;
  children?: JSX.Element[] | string;
  link?: string;
  color?: ButtonColors;
  style?: string;
  handleClick?: () => void;
  disabled?: boolean;
}

const LinkButton = ({
  label,
  children,
  link,
  color = 'red',
  style,
  handleClick,
  disabled = false,
}: Props) => {
  const navigate = useNavigate();
  const onClick = handleClick ? handleClick : () => navigate(`/${link}`);
  const defStyle = style ? style : `box my-2 btn-${color}`;
  return (
    <button
      className={defStyle}
      onClick={onClick}
      name={link}
      disabled={disabled}
    >
      {label}
      {children}
    </button>
  );
};

export default LinkButton;
