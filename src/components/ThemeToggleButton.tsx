import { useContext } from "react";
import { ThemeContext } from "../store/theme-context";
import { BsMoon, BsSun } from "react-icons/bs";

export default function ThemeToggleButton() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div>
      <button
        className="rounded-lg shadow bg-slate-200 dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 p-2 transition"
        onClick={toggleTheme}
      >
        {theme === "dark" ? (
          <BsSun className="text-slate-100" />
        ) : (
          <BsMoon className="text-slate-900" />
        )}
      </button>
    </div>
  );
}
