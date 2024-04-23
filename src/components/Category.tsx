import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { KanbanContext } from "../store/kanban-context";
import { v4 as uuid } from "uuid";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import IconButton from "./IconButton";
import { Tooltip } from "react-tooltip";
import { ToolTipContext } from "../store/tooltip-context";
import { CardType } from "../interfaces";
import CardCreationForm from "./CardCreationForm";
import Card from "./Card";

const emptyCard: CardType = {
  id: "",
  description: "",
  hasDue: false,
  hasStart: false,
  hasCheckList: false,
  parent: "",
  title: "",
};

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
      color: "slate",
    });
  }
  const cards = kanbanCtx.cards.filter((card) => card.parent === id);

  const [cardCreationMode, setCardCreationMode] = useState(false);
  const [newCard, setNewCard] = useState({ ...emptyCard });

  const addCardInputRef = useRef<HTMLInputElement>(null);

  function handleCreateCardBtn() {
    setCardCreationMode(true);
  }

  function handleExitCardCreate() {
    setCardCreationMode(false);
  }

  const createCard = useCallback(() => {
    kanbanCtx.addCard({ ...newCard, id: uuid(), parent: id as string });
    setNewCard({ ...emptyCard });
  }, [id, kanbanCtx, newCard]);

  useEffect(() => {
    if (cardCreationMode) addCardInputRef.current?.focus();
    else {
      setNewCard({ ...emptyCard });
    }
  }, [cardCreationMode]);

  return (
    <div
      className={`min-w-80 w-80 min-h-8 h-fit rounded-2xl shadow-lg shadow-slate-300 dark:shadow-slate-700 ${isButton ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer transition duration-200" : `bg-slate-100 dark:bg-slate-600 ${color}`}  flex flex-col gap-2 p-2`}
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
              <IconButton
                Icon={IoAdd}
                className="add-card-anchor rounded-full"
                onClick={handleCreateCardBtn}
              />
              <IconButton Icon={PiDotsThreeVerticalBold} className="rounded-full" />
              {tooltipCtx.active && (
                <Tooltip anchorSelect=".add-card-anchor" place="right">
                  Add Card
                </Tooltip>
              )}
            </div>
          </>
        )}
      </div>
      {cards.length > 0 &&
        cards.map((card) => <Card key={card.id} id={card.id} />)}
      {cardCreationMode && (
        <CardCreationForm
          value={newCard.title}
          onChange={(e) => {
            setNewCard((card) => ({ ...card, title: e.target.value }));
          }}
          createCard={createCard}
          exitCardCreation={handleExitCardCreate}
          ref={addCardInputRef}
        />
      )}
    </div>
  );
}
