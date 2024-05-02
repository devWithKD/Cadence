import { memo, useContext } from "react";
import { KanbanContext } from "../store/kanban-context";
import { CardWizardModalContext } from "../store/card-wizard-context";

const Card = memo(function Card({ id }: { id: string }) {
  const kanbanCtx = useContext(KanbanContext);
  const cardDetail = kanbanCtx.cards.filter((card) => card.id == id)[0];

  const wizardCtx = useContext(CardWizardModalContext);

  function handleEditCard() {
    wizardCtx.modalRef?.current?.showModal(cardDetail.id);
  }

  return (
    <div
      className="group/card box-border last:mb-2 secondary-text rounded-lg bg-slate-200 dark:bg-slate-700 border border-slate-300 dark:border-slate-700 shadow shadow-slate-400 dark:shadow-slate-700 text-sm px-2 py-3 mx-2 select-none cursor-pointer hover:border-2 hover:border-sky-600 dark:hover:border-blue-400 transition duration-300 flex flex-col relative"
      onClick={handleEditCard}
    >
      <span>{cardDetail.title}</span>
    </div>
  );
});

export default Card;
