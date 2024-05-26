import { IoMdAdd } from "react-icons/io";
import { useAuth } from "../store/auth-context";
import { useCallback, useEffect, useState } from "react";
import { addBoard, getUserBoards } from "../utils/firebase/boards";
import { Board } from "../interfaces";
import { v4 as uuid } from "uuid";
import BoardThumbnail from "./BoardThumbnail";
import { AiOutlineLoading } from "react-icons/ai";

export default function BoardSelector() {
  const { currentUser } = useAuth();

  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeLimit, setActiveLimit] = useState<boolean>(
    () => !(boards.length < 5)
  );

  useEffect(() => {
    const getBoards = async () => {
      if (currentUser != null) {
        const userBoards = await getUserBoards(currentUser.uid);
        setBoards(userBoards);
        setLoading(false);
      }
    };
    getBoards();
  }, [currentUser]);

  const addUserBoard = useCallback(async () => {
    if (!currentUser) return;
    const newBoard: Board = {
      owner: currentUser.uid,
      title: "Untitled",
      uid: uuid(),
    };
    setBoards((state) => {
      const allBoards = [...state];
      allBoards.push(newBoard);
      return allBoards;
    });
    try {
      addBoard(newBoard);
    } catch (err) {
      console.log(err);
      alert(err);
    }
  }, [currentUser]);

  const deleteBoard = useCallback((uid: string) => {
    setBoards((state) => {
      return state.filter((bd) => bd.uid !== uid);
    });
  }, []);

  useEffect(() => {
    if (!(boards.length < 5)) setActiveLimit(true);
    else setActiveLimit(false);
  }, [boards]);

  return (
    <div className="w-full flex flex-col p-4 gap-6">
      <div className="flex gap-4 items-center">
        <h2 className="text-xl font-medium secondary-text">Your Boards</h2>
        <p className="tertiary-text font-medium">{boards.length}/5</p>
        {activeLimit && <p className="text-red-700 text-xs">Boards limit reached</p>}
      </div>
      <div className="flex gap-4">
        {!loading &&
          boards.map((board) => (
            <BoardThumbnail
              key={board.uid}
              userBoard={board}
              onDelete={deleteBoard}
            />
          ))}
        {loading && (
          <div className="flex flex-col gap-2 items-center">
            <div className="w-40 h-32 rounded-lg  bg-slate-200 drop-shadow dark:bg-slate-600 flex secondary-text justify-center items-center cursor-pointer">
              <AiOutlineLoading size={56} className="animate-spin" />
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 items-center">
          <button
            className="w-40 h-32 rounded-lg bg-slate-200 drop-shadow dark:bg-slate-600 flex secondary-text justify-center items-center cursor-pointer disabled:text-slate-200 disabled:bg-slate-300 disabled:dark:bg-slate-700 disabled:dark:text-slate-800 disabled:cursor-default"
            onClick={(e) => {
              e.stopPropagation();
              addUserBoard();
            }}
            disabled={activeLimit}
          >
            <IoMdAdd size={56} />
          </button>
          <p
            className={`primary-text font-semibold ${
              activeLimit && "text-slate-400"
            }`}
          >
            Add Board
          </p>
        </div>
      </div>
    </div>
  );
}
