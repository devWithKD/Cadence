import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import Button from "./Button";

export interface DeleteTimerBtnRef {
  clearDeleteTimer: () => void;
}

const DeleteTimerBtn = forwardRef(function DeleteTimerBtn(
  {
    onDelete,
    timeOut,
  }: {
    onDelete: () => void;
    timeOut: number;
  },
  ref
) {
  const [showOps, setShowOps] = useState<boolean>(false);
  const [remaining, setRemaining] = useState<number>(timeOut);
  const intervalRef = useRef<NodeJS.Timeout>();

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
          <Button
            title="Cancel"
            onClick={cancelDelete}
            className="bg-green-400 hover:bg-green-500 dark:bg-green-800 dark:hover:bg-green-700 text-slate-600 dark:text-slate-100"
          />
          <Button
            title={`Delete (${remaining}s)`}
            onClick={() => {
              cancelDelete();
              onDelete();
            }}
            className="bg-red-600 hover:bg-red-700 dark:bg-red-800 dark:hover:bg-red-700 text-slate-100"
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
        />
      )}
    </>
  );
});

export default DeleteTimerBtn;
