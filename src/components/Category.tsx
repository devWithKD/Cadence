import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { IoAdd } from "react-icons/io5";
import { KanbanContext } from "../store/kanban-context";
import { v4 as uuid } from "uuid";
import IconButton from "./IconButton";
// import { Tooltip } from "react-tooltip";
// import { ToolTipContext } from "../store/tooltip-context";
import { CardType, ItemTypes } from "../interfaces";
import CardCreationForm from "./CardCreationForm";
import Card from "./Card";
import { useDrop } from "react-dnd";
import CategoryOpsBtn from "./CategoryOptionBtn";
import useDebounce from "../hooks/useDebounce";

const emptyCard: CardType = {
  id: "",
  description: "",
  hasDue: false,
  hasStart: false,
  hasCheckList: false,
  parent: "",
  title: "",
};

const Category = memo(function Category({
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
  // const tooltipCtx = useContext(ToolTipContext);
  function createCategory() {
    kanbanCtx.addCategory({
      id: uuid(),
      title: "Untitled",
      color: "slate",
    });
  }
  const cards = kanbanCtx.cards.filter((card) => card.parent === id);
  const category = kanbanCtx.categories.filter((cat) => cat.id == id)[0];

  const titleInputRef = useRef<HTMLInputElement>(null);

  const [cardCreationMode, setCardCreationMode] = useState(false);
  const [newCard, setNewCard] = useState({ ...emptyCard });
  const [editMode, setEditMOde] = useState(false);
  const [catTitle, setCatTitle] = useState(title as string);

  const debouncedTitle = useDebounce(catTitle);

  const addCardInputRef = useRef<HTMLInputElement>(null);

  const handleCreateCardBtn = useCallback(function handleCreateCardBtn() {
    setCardCreationMode(true);
  }, []);

  const handleExitCardCreate = useCallback(function handleExitCardCreate() {
    setCardCreationMode(false);
  }, []);

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

  const isDropOver = useCallback(
    (item: CardType) => {
      if (id) {
        const updatedCard = { ...item, parent: id as string };
        kanbanCtx.updateCard(updatedCard);
      }
    },
    [id, kanbanCtx]
  );

  const changeColor = useCallback(
    (col: string) => {
      const updatedCat = { ...category, color: col };
      kanbanCtx.updateCategory(updatedCat);
    },
    [kanbanCtx]
  );

  const deleteCategory = useCallback(() => {
    kanbanCtx.removrCategory(id as string);
  }, [kanbanCtx, id]);

  const enterEditMode = useCallback(() => {
    setEditMOde(true);
  }, []);

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.CARD,
    drop: (item) => isDropOver(item as CardType),
    collect: (monitor) => ({ isOver: !!monitor.isOver({ shallow: true }) }),
  }));

  useEffect(() => {
    const updatedCat = { ...category, title: debouncedTitle };
    kanbanCtx.updateCategory(updatedCat);
  }, [debouncedTitle]);

  useEffect(() => {
    if (editMode && titleInputRef.current != null) {
      console.log("input");
      titleInputRef.current.focus();
    }
  }, [editMode]);

  return (
    <div
      className={`min-w-80 w-80 min-h-8 h-fit rounded-2xl shadow-lg shadow-slate-300 dark:shadow-slate-700 ${
        isButton
          ? "bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 cursor-pointer transition duration-200"
          : `bg-slate-100 dark:bg-slate-600 ${color}`
      }  flex flex-col gap-2 p-2 transition-all duration-300 ${
        isOver ? "scale-105 brightness-105 dark:brightness-110" : ""
      }`}
      onClick={() => {
        if (isButton) {
          createCategory();
        }
      }}
      ref={drop}
    >
      <div
        className={`flex items-center justify-between max-w-full ${
          !isButton ? "primary-text font-medium" : "tertiary-text font-medium"
        } px-2`}
      >
        {isButton ? (
          <div className="flex items-center gap-1">
            <IconButton Icon={IoAdd} size={20} />{" "}
            <span className="text-base">Add Category</span>
          </div>
        ) : (
          <>
            {editMode ? (
              <input
                type="text"
                value={catTitle}
                onChange={(e) => {
                  setCatTitle(e.target.value);
                }}
                onBlur={() => {
                  setEditMOde(false);
                }}
                size={catTitle.length + 1}
                className="custom-input bg-transparent w-full"
                ref={titleInputRef}
              />
            ) : (
              <span className="select-none font-medium flex-1">{title}</span>
            )}
            <div className="flex gap-1 items-center">
              <IconButton
                Icon={IoAdd}
                className="add-card-anchor rounded-full"
                onClick={handleCreateCardBtn}
              />
              <CategoryOpsBtn
                onDelete={deleteCategory}
                onRename={enterEditMode}
                onChangeColor={changeColor}
                color={category.color}
              />
              {/* <div className="w-fit flex justify-center items-center relative">
                <IconButton
                  Icon={PiDotsThreeVerticalBold}
                  className="rounded-full"
                />
              </div> */}
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
});

export default Category;
