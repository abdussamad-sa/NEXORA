export const ThemeToggle = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const className = 'dark';
    if (dark) {
      document.documentElement.classList.add(className);
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove(className);
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  return (
    <button
      onClick={() => setDark(!dark)}
      className="p-2 rounded-full hover:bg-gray-700 transition-colors"
      aria-label="Toggle dark mode"
    >
      {dark ? <Sun className="text-yellow-400 w-5 h-5" /> : <Moon className="text-gray-200 w-5 h-5" />}
    </button>
  );
};

export default ThemeToggle;
