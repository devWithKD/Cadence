import { KanbanContext } from "../store/kanban-context";
import Board from "../components/Board";
import Header from "../components/Header";
import { useAuth } from "../store/auth-context";
import { useContext } from "react";
import BoardSelector from "../components/BoardSelector";

const KanbanContainer = () => {
  const { currentUser, mode } = useAuth();

  const { currentBoard } = useContext(KanbanContext);

  return (
    <>
      <div className="w-screen h-screen relative flex flex-col primary-bg">
        {currentUser == null && mode == "demo" ? (
          <>
            <Header title="Demo Kanban Board" isBoard={true} />
            <main className="mx-4 my-3 grow max-h-[calc(100vh-80px)]">
              <Board />
            </main>
          </>
        ) : currentBoard == null && mode == "full" ? (
          <>
            <Header title="Cadence" isBoard={false} />
            <main className="mx-4 my-3 grow max-h-[calc(100vh-80px)]">
              <BoardSelector />
            </main>
          </>
        ) : currentBoard != null && mode == "full" ? (
          <>
            <Header title={currentBoard.title} isBoard={true} />
            <main className="mx-4 my-3 grow max-h-[calc(100vh-80px)]">
              <Board />
            </main>
          </>
        ) : (
          <></>
        )}
      </div>
      {/* :<Navigate to={"/auth"} /> */}
    </>
  );
};

export default KanbanContainer;
