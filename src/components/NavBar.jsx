import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { darkMode, toggleTheme } = useTheme();
  
  return (
    <nav className="flex justify-between items-center p-4 mb-6 bg-white dark:bg-gray-800 shadow-sm transition-colors">
        <div>
            <h1 className="text-xl font-bold text-gray-800 dark:text-white">
                Workers Dashboard
            </h1><br />
            <p className="text-grey-400">Managing employees efficiently</p>
        </div>
      <button 
        onClick={toggleTheme}
        className="px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-600 transition-all"
      >
        {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </nav>
  );
};

export default Navbar;