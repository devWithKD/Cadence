import { memo, useEffect, useRef, useState } from "react";
import { MileStone } from "../interfaces";
import IconButton from "./IconButton";
import { MdModeEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

const Milestone = memo(function Milestone({
  mileStone,
  onChange,
  onDelete,
  onSave,
}: {
  onDelete: (uid: string) => void;
  onSave: (updatedMS: MileStone) => void;
  mileStone: MileStone;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const [showOps, setShowOps] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);

  const titleRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (editMode) {
      if (titleRef.current != null) {
        titleRef.current.style.width = (titleRef.current.value.length + 1) * 8 + "px";
      }
      titleRef.current?.focus();
    }
  }, [editMode]);
  return (
    <div
      className="flex gap-4"
      onMouseEnter={() => setShowOps(true)}
      onMouseLeave={() => setShowOps(false)}
    >
      <div className="flex gap-2 items-center">
        <input
          type="checkbox"
          id={mileStone.uid}
          checked={mileStone.status}
          onChange={onChange}
        />
        {editMode ? (
          <input
            type="text"
            className="custom-input font-semibold bg-transparent border-b border-slate-400"
            defaultValue={mileStone.title}
            ref={titleRef}
            onInput={(e) => {
              e.currentTarget.style.width =
                (e.currentTarget.value.length + 1) * 8 + "px";
            }}
          />
        ) : (
          <label
            className={`primary-text font-semibold ${
              mileStone.status ? "line-through" : ""
            }`}
            htmlFor={mileStone.uid}
          >
            {mileStone.title}
          </label>
        )}
      </div>
      {
        <div
          className={`flex items-center justify-center gap-1 transition delay-200 ${
            showOps ? "opacity-100" : "opacity-0"
          }`}
        >
          {editMode ? (
            <IconButton
              Icon={FaSave}
              size={16}
              className="rounded-full hover:bg-slate-400 px-1.5 primary-text"
              onClick={() => {
                setEditMode(false);
                if (titleRef.current != null)
                  onSave({ ...mileStone, title: titleRef.current?.value });
              }}
            />
          ) : (
            <IconButton
              Icon={MdModeEdit}
              className="rounded-full hover:bg-slate-400 px-1.5 primary-text"
              size={16}
              onClick={() => {
                setEditMode(true);
              }}
            />
          )}
          <IconButton
            Icon={FaTrash}
            className="rounded-full hover:bg-slate-400 p-1.5 primary-text"
            size={16}
            onClick={() => onDelete(mileStone.uid)}
          />{" "}
        </div>
      }
    </div>
  );
});

export default Milestone;
