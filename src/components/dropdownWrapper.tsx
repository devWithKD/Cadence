import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react";
import { CategoryType } from "../interfaces";
import IconButton from "./IconButton";
import { GrClose } from "react-icons/gr";
import Button from "./Button";

export default function dropdownWrapper<T>(
  BaseComponent: React.ComponentType<T>,
  action: "move" | "copy",
  onAction: (catID: string) => void,
  categories: CategoryType[]
) {
  return (
    hocProps: T &
      JSX.IntrinsicAttributes & {
        className?: string;
        position?: "auto" | "manual";
      }
  ) => {
    const [showOps, setShowOps] = useState<boolean>(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const originRef = useRef<HTMLDivElement>(null);
    const categoryRef = useRef<string>(categories[0].uid);

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
      categoryRef.current = e.target.value;
    }, []);

    const handleAction = useCallback(() => {
      onAction(categoryRef.current);
    }, []);

    const close = useCallback(() => {
      setShowOps(false);
    }, []);

    useEffect(() => {
      const handleOutClick = (evt: MouseEvent) => {
        if (dropdownRef.current != null && originRef.current != null) {
          if (
            !dropdownRef.current.contains(evt.target as Node) &&
            !originRef.current?.contains(evt.target as Node)
          ) {
            close();
            // onAction(categoryRef.current);
          }
        }
      };
      document.addEventListener("mousedown", handleOutClick);
      return () => {
        document.removeEventListener("mousedown", handleOutClick);
      };
    }, [close]);

    return (
      <div
        className={`relative ${hocProps.className}`}
        onClick={() => {
          if (!showOps) setShowOps(true);
        }}
        ref={originRef}
      >
        <BaseComponent {...hocProps} />
        {showOps && (
          <div
            className={`absolute ${
              hocProps.position == "auto"
                ? "bottom-0 lg:top-6 lg:bottom-auto"
                : "top-6"
            } left-auto right-auto bg-slate-50 dark:bg-slate-800 rounded-lg z-50 drop-shadow-2xl shadow-slate-400 dark:shadow-slate-800 min-w-48 border border-slate-400 me-4 mb-4`}
            ref={dropdownRef}
          >
            <div className="relative w-full py-6 px-5 flex flex-col justify-center items-center">
              <div className="absolute right-2 top-4">
                <IconButton
                  Icon={GrClose}
                  className="rounded-full"
                  onClick={close}
                />
              </div>
              <h1 className="primary-text font-semibold pb-4">
                {action == "copy" ? "Copy Card" : "Move Card"}
              </h1>
              <div className="min-w-fit flex flex-col gap-2 w-full">
                <p className="text-sm secondary-text text-nowrap">
                  Select Destination
                </p>
                <select
                  defaultValue={categoryRef.current}
                  onChange={onChangeHandler}
                  className="outline-none primary-text text-sm bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 hover:dark:bg-slate-600 p-2 rounded min-w-fit w-40"
                >
                  {categories.map((cat) => {
                    return (
                      <option key={cat.uid} value={cat.uid}>
                        {cat.title}
                      </option>
                    );
                  })}
                </select>
                <Button
                  title={action == "copy" ? "Copy" : "Move"}
                  className="w-fit font-semibold text-slate-100 bg-sky-500 hover:bg-sky-600"
                  onClick={handleAction}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };
}
