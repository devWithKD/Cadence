import { useContext } from "react";
import { IoAdd } from "react-icons/io5";
import { KanbanContext } from "../store/kanban-context";
import { v4 as uuid } from "uuid";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import IconButton from "./IconButton";
import { Tooltip } from "react-tooltip";
import { ToolTipContext } from "../store/tooltip-context";

export default function Category({
  id,
  isButton,
  title,
  color,
}: {
  id?: string;
  isButton: boolean;
  title?: string;
  color?: string;
}) {
  const kanbanCtx = useContext(KanbanContext);
  const tooltipCtx = useContext(ToolTipContext);
  function createCategory() {
    kanbanCtx.addCategory({
      id: uuid(),
      title: "Untitled",
      color: "category-slate",
    });
  }
  const cards = kanbanCtx.cards.filter((card) => card.parent === id);
  console.log(cards, id)

  return (
    <div
      className={`min-w-80 w-80 min-h-8 h-fit rounded-2xl shadow-lg shadow-slate-300 dark:shadow-slate-700 ${isButton ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer" : `bg-slate-100 dark:bg-slate-600 ${color}`} transition duration-200 flex flex-col gap-2 p-2`}
      onClick={() => {
        if (isButton) {
          createCategory();
        }
      }}
    >
      <div
        className={`flex items-center justify-between ${!isButton ? "primary-text font-medium" : "tertiary-text font-medium"} px-2`}
      >
        {isButton ? (
          <div className="flex items-center gap-1">
            <IoAdd size={20} /> <span className="text-base">Add Category</span>{" "}
          </div>
        ) : (
          <>
            <span className="select-none font-medium">{title}</span>
            <div className="flex gap-1 items-center">
              <IconButton Icon={IoAdd} className="add-card-anchor" />
              <IconButton Icon={PiDotsThreeVerticalBold} />
              {tooltipCtx.active && (
                <Tooltip anchorSelect=".add-card-anchor" place="right">
                  Add Card
                </Tooltip>
              )}
            </div>
          </>
        )}
      </div>
      {cards.length > 0 && cards.map((card) => <div>{card.title}</div>)}
    </div>
  );
}
