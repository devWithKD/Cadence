import { useContext } from "react"
import { ThemeContext } from "../store/theme-context"
import { BsSun, BsMoon } from "react-icons/bs";

export default function Header () {
  const {theme,toggleTheme} = useContext(ThemeContext);
  return (
      <header className="w-full px-4 py-2 flex justify-between items-center">
        <div className="flex gap-4 items-baseline">
          <h1 className="text-xl font-semibold primary-text">Status Board</h1>
          <div className="flex gap-1 text-xs secondary-text">
            <span>21</span> <span>Notes</span>
          </div>
        </div>
        <div className="flex gap-1 items-center">
          <button className="rounded-lg shadow  bg-slate-200 dark:bg-slate-600 hover:bg-slate-50 dark:hover:bg-slate-500 p-2 transition" onClick={toggleTheme}>
            {theme === "dark" ? <BsSun className="text-slate-100"/> : <BsMoon className="text-slate-900" />}
          </button>
        </div>
      </header>
)
}
