import { useContext } from "react";
import { KanbanContext } from "../store/kanban-context";
import Category from "./Category";

export default function Container() {
  const kanbanCtx = useContext(KanbanContext);

  return (
      <div className="h-full flex flex-nowrap overflow-auto scroll-smooth scroll-px-6 gap-4 scrollbar-thin scrollbar-track-slate-200 dark:scrollbar-track-slate-700 scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-600">
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
  );
}
