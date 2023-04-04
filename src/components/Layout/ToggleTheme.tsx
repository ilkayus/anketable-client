import { VscColorMode } from 'react-icons/vsc';

const ToggleTheme = () => {
  const toggleMode = () => {
    document.documentElement.classList.toggle('dark');
    localStorage.theme = document.documentElement.classList.contains('dark')
      ? 'dark'
      : 'light';
  };

  return (
    <button
      type="button"
      className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5 inline-flex items-center mr-1"
      aria-label="Toggle between Dark and Light mode"
      onClick={toggleMode}
    >
      <VscColorMode className="w-6 h-6" />
    </button>
  );
};

export default ToggleTheme;
