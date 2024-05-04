import { useContext, useEffect, useState } from "react";
import { KanbanContext } from "../store/kanban-context";
import Category from "./Category";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { TouchBackend } from "react-dnd-touch-backend";

export default function Board() {
  const kanbanCtx = useContext(KanbanContext);

  const checkForTouch = () => {
    const isTouchSupported = "ontouchstart" in window;
    if (isTouchSupported) {
      return TouchBackend;
    } else return HTML5Backend;
  };

  const [backend, setBackend] = useState(checkForTouch);

  useEffect(() => {
    setBackend(checkForTouch);
  }, []);

  return (
    <DndProvider backend={backend}>
      <div className="h-full flex flex-nowrap overflow-auto py-4 scroll-smooth scroll-px-6 gap-4 scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
        {kanbanCtx.categories.length > 0
          ? kanbanCtx.categories.map((category) => (
              <Category
                id={category.id}
                isButton={false}
                title={category.title}
                color={category.color}
                key={category.id}
              />
            ))
          : ""}
        <Category isButton={true} />
      </div>
    </DndProvider>
  );
}
