import KanbanContextProvider from "../store/kanban-context";
import ThemeContextProvider from "../store/theme-context";
import ToolTipContextProvider from "../store/tooltip-context";
import Board from "../components/Board";
import Header from "../components/Header";

export default function KanbanContainer() {
  return (
    <ThemeContextProvider>
      <KanbanContextProvider>
        <ToolTipContextProvider>
          <div className="w-screen h-screen relative flex flex-col primary-bg">
            <Header />
            <main className="mx-4 my-3 grow flex-1">
              <Board />
            </main>
          </div>
        </ToolTipContextProvider>
      </KanbanContextProvider>
    </ThemeContextProvider>
  );
}
