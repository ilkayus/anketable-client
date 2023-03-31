import { useNavigate } from 'react-router-dom';
import { WaitingRoomState } from '../../types/polls.types';
import type { ButtonColors } from './constants';

export interface Props {
  label?: string;
  children?: JSX.Element[] | string;
  link?: string;
  color?: ButtonColors;
  style?: string;
  handleClick?: () => void;
  disabled?: boolean;
  state?: WaitingRoomState;
}

const LinkButton = ({
  label,
  children,
  link,
  color = 'red',
  style,
  handleClick,
  disabled = false,
  state,
}: Props) => {
  const navigate = useNavigate();
  const onClick = handleClick
    ? handleClick
    : () => navigate(`/${link}`, { state: state });
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
