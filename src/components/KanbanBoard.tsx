import KanbanContextProvider from "../store/kanban-context";
import ModalContextProvider from "../store/card-wizard-context";
import ThemeContextProvider from "../store/theme-context";
import ToolTipContextProvider from "../store/tooltip-context";
import Container from "./Container";
import Header from "./Header";

export default function KanbanContainer() {
  return (
    <ThemeContextProvider>
      <KanbanContextProvider>
        <ToolTipContextProvider>
          <div className="w-screen h-screen relative flex flex-col bg-gradient-to-tr from-slate-50 to-slate-300 dark:from-slate-900 dark:to-slate-700 font-poppins transition-colors duration-300">
            <Header />
            <main className="mx-4 my-3 grow flex-1">
              <ModalContextProvider>
                <Container />
              </ModalContextProvider>
            </main>
          </div>
        </ToolTipContextProvider>
      </KanbanContextProvider>
    </ThemeContextProvider>
  );
}
