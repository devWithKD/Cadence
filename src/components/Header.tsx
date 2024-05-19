import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { KanbanContext } from "../store/kanban-context";
import ThemeToggleButton from "./ThemeToggleButton";
import { IoArrowBack } from "react-icons/io5";
import IconButton from "./IconButton";
import { MdModeEdit } from "react-icons/md";
import { Board } from "../interfaces";
import { updateBoard } from "../utils/firebase/boards";
import UserOptions from "./UserOptions";
import { useAuth } from "../store/auth-context";
import { useNavigate } from "react-router-dom";

export default function Header({
  isBoard = true,
  title,
}: {
  isBoard: boolean;
  title?: string;
}) {
  const kanbanCtx = useContext(KanbanContext);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [board, setBoard] = useState<Board | null>(() =>
    kanbanCtx.currentBoard != null ? kanbanCtx.currentBoard : null
  );
  const titleInputRef = useRef<HTMLInputElement>(null);
  const clickableRef = useRef<HTMLDivElement>(null);
  const { mode } = useAuth();
  const navigate = useNavigate();

  const backToBoards = useCallback(() => {
    if (mode == "demo") {
      navigate("/auth");
      return;
    }
    kanbanCtx.setBoard(null);
  }, [kanbanCtx, mode, navigate]);

  useEffect(() => {
    if (editMode) {
      if (titleInputRef.current != null) {
        titleInputRef.current.style.width =
          (titleInputRef.current.value.length + 1) * 18 + "px";
      }
      titleInputRef.current?.focus();
    }
  }, [editMode, board]);

  useEffect(() => {
    const handleOutsideClick = async (e: MouseEvent) => {
      if (
        clickableRef.current &&
        !clickableRef.current!.contains(e.target as Node) &&
        board != null
      ) {
        setEditMode(false);
        try {
          await updateBoard(board);
        } catch (error) {
          console.error(error);
        }
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [board]);

  useEffect(() => {
    if (kanbanCtx.currentBoard != null) {
      setBoard(kanbanCtx.currentBoard);
    }
  }, [kanbanCtx.currentBoard]);

  return (
    <header className="w-full px-4 py-3 flex justify-between items-center select-none">
      <div className="flex gap-4 justify-normal items-center">
        {isBoard && (
          <button className="secondary-text" onClick={backToBoards}>
            <IoArrowBack size={24} />
          </button>
        )}
        <div className="flex gap-4 items-baseline" ref={clickableRef}>
          {!isBoard || mode == "demo" ? (
            <h1 className="text-3xl font-semibold primary-text">{title}</h1>
          ) : editMode ? (
            <input
              className="text-3xl font-semibold primary-text custom-input bg-transparent"
              value={board?.title}
              onChange={(e) => {
                setBoard((state) => {
                  const updatedBoard = { ...(state as Board) };
                  updatedBoard.title = e.target.value;
                  return updatedBoard;
                });
              }}
              ref={titleInputRef}
            />
          ) : (
            <h1 className="text-3xl font-semibold primary-text">
              {board?.title}
            </h1>
          )}
          {isBoard && (
            <div className="flex gap-1 secondary-text">
              <span>{kanbanCtx.cards.length}</span> <span>Cards</span>
            </div>
          )}
        </div>
        {isBoard && mode=="full" && (
          <IconButton
            Icon={MdModeEdit}
            size={20}
            className="rounded-full secondary-text p-1.5 opacity-20 hover:opacity-100"
            onClick={() => {
              setEditMode(true);
              titleInputRef.current?.focus();
            }}
          />
        )}
      </div>
      <div className="flex gap-2 items-center">
        <ThemeToggleButton />
        {mode == "full" && <UserOptions />}
      </div>
    </header>
  );
}
