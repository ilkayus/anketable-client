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
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center mr-1"
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
