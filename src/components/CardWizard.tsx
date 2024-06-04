import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { KanbanContext } from "../store/kanban-context";
import { CardType, CategoryType, MileStone } from "../interfaces";
import IconButton from "./IconButton";
import { GrClose, GrTextAlignFull } from "react-icons/gr";
import Button from "./Button";
import FormElement from "./FormElement";
import { MdTitle } from "react-icons/md";
import Textarea from "./Textarea";
import { getDateAsString, getDateFromString } from "../utils/date-utils";
import MileStoneList from "./MileStoneList";
import DeleteTimerBtn, { DeleteTimerBtnRef } from "./DeleteTimerBtn";
import TitleWithAction from "./TitleWithAction";
import { FaTrash } from "react-icons/fa6";
import dropdownWrapper from "./dropdownWrapper";
import { v4 as uuid } from "uuid";
import { createPortal } from "react-dom";

const CategoryTitle = ({ catTitle }: { catTitle: string }) => {
  return <span className="cursor-pointer underline">{catTitle}</span>;
};

export interface wizardRefInterface {
  showModal: (cardID: string) => void;
}

const CardWizard = memo(function CardWizard({
  cardData,
  parent,
  onClose,
}: {
  cardData: CardType;
  parent: CategoryType;
  onClose: (updatedCard?: CardType) => void;
}) {
  const deleteTimerRef = useRef<DeleteTimerBtnRef>();

  const [wizardData, setWizardData] = useState<{
    data: CardType;
    parent: CategoryType;
  }>({ data: cardData, parent: parent });

  const movedRef = useRef(false);

  const kanbanCtx = useContext(KanbanContext);

  const categories = kanbanCtx.categories;

  const clickableAreaRef = useRef<HTMLDivElement>(null);

  const copyCard = useCallback(
    (catID: string) => {
      const newCard: CardType = {
        ...(wizardData.data as CardType),
        parent: catID,
        uid: uuid(),
      };
      kanbanCtx.addCard(newCard);
    },
    [kanbanCtx, wizardData.data]
  );

  const moveCard = useCallback(
    (catID: string) => {
      setWizardData((prvData) => {
        const card = { ...(prvData.data as CardType) };
        card.parent = catID;
        const parentCat = categories.filter((cat) => cat.uid == catID)[0];
        return { ...prvData, data: card, parent: parentCat };
      });
      movedRef.current = true;
    },
    [categories]
  );

  const deleteAction = useCallback(
    (action: "due-date" | "start-date" | "milestone-list") => {
      setWizardData((prvState) => {
        const card = { ...(prvState.data as CardType) };
        switch (action) {
          case "due-date":
            card.hasDue = false;
            card.dueDate = null;
            break;

          case "start-date":
            card.hasStart = false;
            card.startDate = null;
            break;

          case "milestone-list":
            card.hasCheckList = false;
            card.checkList = null;
            break;

          default:
            break;
        }
        return { ...prvState, data: card };
      });
    },
    []
  );

  const addStartDate = useCallback(() => {
    setWizardData((prvData) => {
      const card = { ...(prvData.data as CardType) };
      card.hasStart = true;
      card.startDate = new Date();
      return { ...prvData, data: card };
    });
  }, []);

  const addMilestoneList = useCallback(() => {
    setWizardData((prvData) => {
      const card = { ...(prvData.data as CardType) };
      if (!card.hasCheckList) {
        card.hasCheckList = true;
        card.checkList = [];
        return {
          ...prvData,
          data: card,
        };
      } else return prvData;
    });
  }, []);

  const addDueDate = useCallback(() => {
    setWizardData((prvData) => {
      const card = { ...(prvData.data as CardType) };
      card.hasDue = true;
      card.dueDate = new Date();
      return { ...prvData, data: card };
    });
  }, []);

  const handleOnClose = useCallback(() => {
    onClose(wizardData.data);
    deleteTimerRef.current?.clearDeleteTimer();
  }, [onClose, wizardData.data]);

  const handleClickOutSide = useCallback(
    (evt: MouseEvent) => {
      if (!clickableAreaRef.current?.contains(evt.target as Node)) {
        onClose(wizardData.data);
        deleteTimerRef.current?.clearDeleteTimer();
      }
    },
    [onClose, wizardData.data]
  );

  const MoveCardTitle = dropdownWrapper(
    CategoryTitle,
    "move",
    moveCard,
    categories
  );

  const CopyBtn = dropdownWrapper(Button, "copy", copyCard, categories);

  const MoveBtn = dropdownWrapper(Button, "move", moveCard, categories);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
    };
  }, [handleClickOutSide]);

  return createPortal(
    <div className="fixed z-50 w-screen h-screen top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center backdrop-blur-sm backdrop-brightness-75" draggable={false}>
      <div
        className="w-full max-h-screen lg:w-4/6 2xl:w-1/2 lg:aspect-[4/2] rounded-lg shadow-2xl shadow-slate-400 dark:shadow-slate-800 bg-slate-200 dark:bg-gradient-to-tr dark:from-slate-900 dark:to-slate-700 backdrop:backdrop-blur-sm dark:outline-slate-600 dark:outline outline-1 overflow-x-hidden relative py-6 px-4 lg:px-6"
        ref={clickableAreaRef}
        draggable={false}
      >
        <div className="absolute top-4 right-4">
          <IconButton
            Icon={GrClose}
            onClick={handleOnClose}
            className="tertiary-text outline outline-slate-400 outline-1 rounded-full "
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 my-4">
          <div className="flex flex-col mt-2 lg:mt-0 gap-4 w-full lg:w-3/4">
            <div className="flex flex-col">
              <FormElement Icon={MdTitle} iconSize={23} className="h-7">
                <input
                  className="w-full outline-none bg-transparent text-xl font-bold primary-text leading-6 resize-none h-fit"
                  value={wizardData.data?.title}
                  placeholder="Title..."
                  onChange={(e) => {
                    setWizardData((prvData) => {
                      if (prvData.data) {
                        const cardData = { ...prvData.data };
                        cardData.title = e.target.value;
                        return { ...prvData, data: cardData };
                      } else {
                        return prvData;
                      }
                    });
                  }}
                />
              </FormElement>
              <div className="ps-12 text-sm secondary-text">
                in list{" "}
                <MoveCardTitle
                  catTitle={wizardData.parent?.title as string}
                  className="inline-block"
                />
              </div>
            </div>
            <FormElement Icon={GrTextAlignFull} iconSize={18}>
              <div className="flex flex-col w-full gap-2">
                <h1 className="font-bold secondary-text">Description</h1>
                <Textarea
                  value={wizardData.data?.description}
                  onValChange={(val) => {
                    setWizardData((prvData) => {
                      if (prvData.data) {
                        const cardData = { ...prvData.data };
                        cardData.description = val;
                        return { ...prvData, data: cardData };
                      } else return prvData;
                    });
                  }}
                  placeholder="Add a more detailed description here..."
                  className="w-full p-2 outline-none rounded custom-input max-h-44 lg:max-h-none resize-none"
                />
              </div>
            </FormElement>
            {(wizardData.data.hasDue || wizardData.data.hasStart) && (
              <div className="flex flex-col lg:flex-row gap-4 my-2">
                {wizardData.data.hasStart && (
                  <div className="flex flex-col gap-2">
                    <TitleWithAction
                      Icon={FaTrash}
                      action={() => {
                        deleteAction("start-date");
                      }}
                    >
                      <p className="secondary-text font-bold ps-12">
                        Start Date
                      </p>
                    </TitleWithAction>
                    <FormElement hasIcon>
                      <input
                        type="date"
                        defaultValue={getDateAsString(
                          wizardData.data.startDate as Date
                        )}
                        onChange={(e) => {
                          setWizardData((prvData) => {
                            const card = {
                              ...(prvData.data as CardType),
                            };
                            card.startDate = new Date(
                              getDateFromString(e.target.value)
                            );
                            return { ...prvData, data: card };
                          });
                        }}
                        className="p-2 custom-input w-full lg:w-48"
                      />
                    </FormElement>
                  </div>
                )}
                {wizardData.data.hasDue && (
                  <div className="flex flex-col gap-2">
                    <TitleWithAction
                      Icon={FaTrash}
                      action={() => {
                        deleteAction("due-date");
                      }}
                    >
                      <p className="secondary-text font-bold ps-12">Due Date</p>
                    </TitleWithAction>
                    <FormElement hasIcon>
                      <input
                        type="date"
                        defaultValue={getDateAsString(
                          wizardData.data.dueDate as Date
                        )}
                        className="p-2 custom-input rounded outline-none w-full lg:w-48"
                        onChange={(e) => {
                          setWizardData((prvData) => {
                            const card = {
                              ...(prvData.data as CardType),
                            };
                            card.dueDate = new Date(
                              getDateFromString(e.target.value)
                            );
                            return { ...prvData, data: card };
                          });
                        }}
                      />
                    </FormElement>
                  </div>
                )}
              </div>
            )}
            {wizardData.data.hasCheckList && (
              <MileStoneList
                list={wizardData.data.checkList as Array<MileStone>}
                onChange={(updatedList) => {
                  setWizardData((prvData) => {
                    const card = { ...(prvData.data as CardType) };
                    const updatedCard: CardType = {
                      ...card,
                      checkList: updatedList,
                    };
                    return { ...prvData, data: updatedCard };
                  });
                }}
                onDelete={() => deleteAction("milestone-list")}
              />
            )}
          </div>
          <div className="flex flex-col px-4 lg:px-0 gap-2 w-full lg:w-1/4">
            <p className="secondary-text font-medium text-sm">Add to card</p>
            <div className="flex flex-row lg:flex-col gap-2">
              <Button title="Start Date" onClick={addStartDate} />
              <Button title="Due Date" onClick={addDueDate} />
              <Button title="Milestones" onClick={addMilestoneList} />
            </div>
            <p className="secondary-text font-medium text-sm">Actions</p>
            <div className="flex flex-row lg:flex-col gap-2">
              {/* <Button title="Move" /> */}
              <MoveBtn title="Move" className="lg:w-full" position="auto" />
              <CopyBtn title="Copy" className="lg:w-full" position="auto" />
              <DeleteTimerBtn
                timeOut={10}
                onDelete={() => {
                  kanbanCtx.removeCard(wizardData.data.uid);
                  onClose();
                }}
                ref={deleteTimerRef}
              />
            </div>
          </div>
        </div>
      </div>
    </div>, document.getElementById("modal")!
  );
});

export default CardWizard;
