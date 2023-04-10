/* eslint-disable object-curly-newline */
import { TbLetterT, TbLetterR, TbLetterE, TbLetterN } from 'react-icons/tb';
import { useAppDispatch, useAppSelector } from '../../hooks/typedReduxHooks';
import { selectPollState, toggleLanguage } from '../../features/poll/pollSlice';

const ToggleLang = () => {
  const dispatch = useAppDispatch();
  const { l } = useAppSelector(selectPollState);
  const toggleMode = () => {
    dispatch(toggleLanguage());
  };

  return (
    <button
      type="button"
      className="icon"
      aria-label="Toggle between Dark and Light mode"
      onClick={toggleMode}
    >
      {l === 'en' ? (
        <>
          <TbLetterE className="w-4 h-6" />
          <TbLetterN className="w-4 h-6" />
        </>
      ) : (
        <>
          <TbLetterT className="w-4 h-6" />
          <TbLetterR className="w-4 h-6" />
        </>
      )}
    </button>
  );
};

export default ToggleLang;
