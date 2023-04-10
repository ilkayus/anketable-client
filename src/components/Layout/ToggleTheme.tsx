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
      className="icon"
      aria-label="Toggle between Dark and Light mode"
      onClick={toggleMode}
    >
      <VscColorMode className="w-6 h-6" />
    </button>
  );
};

export default ToggleTheme;
