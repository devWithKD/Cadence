import { useCallback, useContext } from "react";
import { KanbanContext } from "../store/kanban-context";
import ThemeToggleButton from "./ThemeToggleButton";
import { IoArrowBack } from "react-icons/io5";

export default function Header({
  isBoard = true,
  title,
}: {
  isBoard: boolean;
  title?: string;
}) {
  const kanbanCtx = useContext(KanbanContext);

  const backToBoards = useCallback(()=>{
    kanbanCtx.setBoard(null);
  },[kanbanCtx])

  return (
    <header className="w-full px-4 py-3 flex justify-between items-center select-none">
      <div className="flex gap-4 justify-normal items-center" >
        {isBoard && (
          <button className="secondary-text" onClick={backToBoards}>
            <IoArrowBack size={24} />
          </button>
        )}
        <div className="flex gap-4 items-baseline">
          <h1 className="text-3xl font-semibold primary-text">{title}</h1>
          {isBoard && (
            <div className="flex gap-1 secondary-text">
              <span>{kanbanCtx.cards.length}</span> <span>Cards</span>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-1 items-center">
        <ThemeToggleButton />
      </div>
    </header>
  );
}
