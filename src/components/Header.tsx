import { useContext } from "react";
import { ThemeContext } from "../store/theme-context";
import { BsSun, BsMoon } from "react-icons/bs";
import { KanbanContext } from "../store/kanban-context";

export default function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const kanbanCtx = useContext(KanbanContext);
  return (
    <header className="w-full px-4 py-3 flex justify-between items-center select-none">
      <div className="flex gap-4 items-baseline">
        <h1 className="text-3xl font-semibold primary-text">Kanban Board</h1>
        <div className="flex gap-1 secondary-text">
          <span>{kanbanCtx.cards.length}</span> <span>Cards</span>
        </div>
      </div>
      <div className="flex gap-1 items-center">
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
    </header>
  );
}
