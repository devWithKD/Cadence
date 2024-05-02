import { memo, useCallback, useContext, useState } from "react";
import { KanbanContext } from "../store/kanban-context";
import CardWizard from "./CardWizard";
import { CardType } from "../interfaces";
import dash from "lodash";
const Card = memo(function Card({ id }: { id: string }) {
  const kanbanCtx = useContext(KanbanContext);
  const cardDetail = kanbanCtx.cards.filter((card) => card.id == id)[0];
  const parent = kanbanCtx.categories.filter(
    (cat) => cat.id === cardDetail.parent
  )[0];
  const [editMode, setEditMode] = useState<boolean>(false);

  const enterEditMode = useCallback(() => {
    setEditMode(true);
    console.log("open");
  }, []);

  const closeEditMode = useCallback((updatedCard?:CardType) => {
    console.log("close");
    if(updatedCard && !dash.isEqual(updatedCard,cardDetail)){
      kanbanCtx.updateCard(updatedCard);
    }
    setEditMode(false);
  }, []);

  return (
    <div className="group/card box-border ast:mb-2 secondary-text rounded-lg bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow shadow-slate-400 dark:shadow-slate-700 text-sm  mx-2 select-none cursor-pointer hover:border-2 hover:border-sky-600 dark:hover:border-blue-400 transition duration-300 flex flex-col relative">
      <div className="w-full h-full px-2 py-3" onClick={enterEditMode}>
        <span>{cardDetail.title}</span>
      </div>
      {editMode && (
        <CardWizard
          cardData={cardDetail}
          parent={parent}
          onClose={closeEditMode}
        />
      )}
    </div>
  );
});

export default Card;