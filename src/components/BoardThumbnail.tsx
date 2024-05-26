import { MdModeEdit } from "react-icons/md";
import { Board } from "../interfaces";
import IconButton from "./IconButton";
import { FaTrash } from "react-icons/fa6";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { deleteBoard, updateBoard } from "../utils/firebase/boards";
// import { useNavigate } from "react-router-dom";
import { KanbanContext } from "../store/kanban-context";

export default function BoardThumbnail({
  userBoard,
  onDelete,
}: {
  userBoard: Board;
  onDelete: (uid: string) => void;
}) {
  const [opsVisibility, setOpsVisibility] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [board, setBoard] = useState<Board>(userBoard);
  const { setBoard: setCurrentBoard } = useContext(KanbanContext);

  const clickableAreaRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (
        clickableAreaRef.current != null &&
        !clickableAreaRef.current.contains(evt.target as Node)
      ) {
        setEditMode(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  });

  useEffect(() => {
    if (editMode) inputRef.current?.focus();
    else {
      updateBoard(board);
    }
  }, [editMode]);

  const deleteUserBoard = useCallback(async () => {
    await deleteBoard(board);
    onDelete(board.uid);
  }, [board, onDelete]);

  const navigateToBoard = useCallback(() => {
    setCurrentBoard(board);
    // navigate("/board");
  }, [board, setCurrentBoard]);

  return (
    <div>
      <div
        className="flex flex-col gap-2 items-center"
        onMouseEnter={() => {
          setOpsVisibility(true);
        }}
        onMouseLeave={() => {
          setOpsVisibility(false);
        }}
      >
        <div
          className="w-40 h-32 rounded-lg bg-slate-100 drop-shadow dark:bg-slate-500 flex secondary-text justify-center items-center cursor-pointer"
          onClick={() => navigateToBoard()}
        >
          <div className="text-3xl font-bold">
            {board.title.substring(0, 2)}
          </div>
        </div>
        <div className="w-full ps-2 flex justify-between">
          <div ref={clickableAreaRef}>
            {editMode ? (
              <input
                type="text"
                value={board.title}
                onChange={(e) => {
                  setBoard((state) => {
                    return { ...state, title: e.target.value };
                  });
                }}
                className="custom-input primary-text font-semibold bg-transparent max-w-24"
                ref={inputRef}
              />
            ) : (
              <p
                className={`primary-text font-semibold ${
                  opsVisibility && "max-w-24 "
                }text-ellipsis text-nowrap overflow-hidden`}
              >
                {board.title}
              </p>
            )}
          </div>
          {opsVisibility && (
            <div className="flex gap-2 secondary-text">
              <IconButton
                className="rounded-full"
                Icon={MdModeEdit}
                onClick={() => {
                  setEditMode(true);
                }}
              />
              <IconButton
                className="rounded-full"
                Icon={FaTrash}
                onClick={deleteUserBoard}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
