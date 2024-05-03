import { useEffect, useRef, useState } from "react";
import IconButton from "./IconButton";
import { PiDotsThreeVerticalBold } from "react-icons/pi";
import Button from "./Button";
import DeleteTimerBtn, { DeleteTimerBtnRef } from "./DeleteTimerBtn";
import ColorSelector from "./ColorSelector";

export default function CategoryOpsBtn({
  onRename,
  onDelete,
  onChangeColor,
  color,
}: {
  color: string;
  onRename: () => void;
  onDelete: () => void;
  onChangeColor: (col: string) => void;
}) {
  const [opsVisible, setOpsVisble] = useState<boolean>(false);
  const timerRef = useRef<DeleteTimerBtnRef>(null);
  const [changeColOp, setChangeColOp] = useState<boolean>(false);

  const showOps = () => {
    setOpsVisble(true);
  };
  const hideOps = () => {
    setOpsVisble(false);
    if (timerRef.current != null) timerRef.current?.clearDeleteTimer();
  };

  const clickableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutSideClick = (evt: MouseEvent) => {
      if (!clickableRef.current?.contains(evt.target as Node)) {
        hideOps();
      }
    };
    document.addEventListener("mousedown", handleOutSideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutSideClick);
    };
  }, []);

  return (
    <div
      className="w-fit flex justify-center items-center relative rounded-full"
      onClick={showOps}
    >
      <IconButton Icon={PiDotsThreeVerticalBold} className="rounded-full" />
      {opsVisible && (
        <div
          className="absolute top-7 -right-1.5 w-44 bg-slate-50 dark:bg-slate-700 rounded-lg drop-shadow-lg z-50"
          ref={clickableRef}
        >
          <ul className="flex flex-col p-3 gap-2 relative">
            <div className="absolute -top-4 right-[9px] w-0 h-0 border-transparent border-8 border-b-slate-50 dark:border-b-slate-700 outline-1 outline-slate-400 "></div>
            <li>
              <Button
                title="Rename"
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 w-full flex justify-center"
                onClick={(e) => {
                  e.stopPropagation();
                  hideOps();
                  onRename();
                }}
              />
            </li>
            <li className="flex flex-col gap-2">
              <Button
                title="Change Color"
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 w-full flex justify-center"
                onClick={() => {
                  setChangeColOp((state) => !state);
                }}
              />
              {changeColOp && <ColorSelector color={color} onChange={onChangeColor} />}
            </li>
            <li className="flex flex-col gap-2">
              <DeleteTimerBtn
                onDelete={onDelete}
                timeOut={10}
                message="All the cards in this category will also be deleted!"
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500 w-full flex justify-center"
                ref={timerRef}
              />
              {/* <Button
                title="Delete"
                className="bg-slate-200 hover:bg-slate-300 dark:bg-slate-600 dark:hover:bg-slate-500"
              /> */}
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
