import {
  forwardRef,
  // useContext,
  useCallback,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
// import { Tooltip } from "react-tooltip";
// import { ToolTipContext } from "../store/tooltip-context";
import { GrClose } from "react-icons/gr";
import IconButton from "./IconButton";
import Button from "./Button";

const CardCreationForm = forwardRef(function CardCreationForm(
  {
    value,
    onChange,
    exitCardCreation,
    createCard,
  }: {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    exitCardCreation: () => void;
    createCard: () => void;
  },
  ref
) {
  // const tooltipCtx = useContext(ToolTipContext);
  const containerRef = useRef<HTMLDivElement>(null);
  const addCardInputRef = useRef<HTMLInputElement>(null);
  useImperativeHandle(ref, () => {
    return {
      focus: () => {
        addCardInputRef.current?.focus();
      },
    };
  });

  const handleClick = useCallback(
    (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e!.target as Node)
      ) {
        if (addCardInputRef.current && addCardInputRef.current.value != "") {
          createCard();
        }
        exitCardCreation();
      }
    },
    [createCard, exitCardCreation]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return (
    <div className="flex flex-col gap-2 px-2 last:mb-2" ref={containerRef}>
      <input
        className="px-2 py-1 rounded-lg focus-visible:outline-none border border-s-slate-300 dark:border-slate-600 text-sm primary-text bg-slate-100 dark:bg-slate-700"
        placeholder="Enter title for this card..."
        value={value}
        ref={addCardInputRef}
        onChange={onChange}
      />
      <div className="flex items-center gap-3">
        <Button
          className= "px-2 py-2 rounded-lg secondary-text text-sm bg-slate-300 hover:bg-slate-400 hover:text-slate-50 dark:bg-slate-500 dark:hover:bg-slate-400 dark:hover:text-slate-900"
          onClick={createCard}
          title="Add Card"
        />
        <IconButton
          Icon={GrClose}
          className="cancel-add-card secondary-text rounded"
          onClick={exitCardCreation}
        />
        {/* {tooltipCtx.active && (
          <Tooltip anchorSelect=".cancel-add-card" place="right">
            Cancel
          </Tooltip>
        )} */}
      </div>
    </div>
  );
});

export default CardCreationForm;
