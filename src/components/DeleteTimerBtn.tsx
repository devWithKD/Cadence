import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "./Button";
import { removeBgWords } from "../utils/categories";

export interface DeleteTimerBtnRef {
  clearDeleteTimer: () => void;
}

const DeleteTimerBtn = forwardRef(function DeleteTimerBtn(
  {
    onDelete,
    timeOut,
    message,
    className,
  }: {
    onDelete: () => void;
    timeOut: number;
    message?: string;
    className?: string;
  },
  ref
) {
  const [showOps, setShowOps] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(timeOut);
  const intervalRef = useRef<NodeJS.Timeout>();

  const modClassName = removeBgWords(className);

  useImperativeHandle(ref, () => {
    return {
      clearDeleteTimer: () => cancelDelete(),
    };
  });

  const cancelDelete = useCallback(() => {
    clearInterval(intervalRef.current);
    setRemaining(timeOut);
    setShowOps(false);
  }, [timeOut]);

  useEffect(() => {
    if (remaining <= 0) {
      cancelDelete();
      onDelete();
    }
  }, [cancelDelete, onDelete, remaining, timeOut]);

  return (
    <>
      {showOps ? (
        <>
          {message && <p className="primary-text text-xs">{message}</p>}
          <Button
            title="Cancel"
            onClick={cancelDelete}
            className={`bg-green-400 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 text-slate-600 dark:text-slate-100 ${modClassName}`}
          />
          <Button
            title={`Delete (${remaining}s)`}
            onClick={() => {
              cancelDelete();
              onDelete();
            }}
            className={`bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-slate-100 ${modClassName}`}
          />
        </>
      ) : (
        <Button
          title="Delete"
          onClick={() => {
            setShowOps(true);
            intervalRef.current = setInterval(() => {
              setRemaining((remainingTime) => remainingTime - 1);
            }, 1000);
          }}
          className={className}
        />
      )}
    </>
  );
});

export default DeleteTimerBtn;
