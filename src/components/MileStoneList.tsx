import { memo, useCallback, useEffect, useRef, useState } from "react";
import { MileStone } from "../interfaces";
import dash from "lodash";
import IconButton from "./IconButton";
import { IoAdd } from "react-icons/io5";
import { TbCheckbox } from "react-icons/tb";
import { v4 as uuid } from "uuid";
import Milestone from "./Milestone";
import TitleWithAction from "./TitleWithAction";
import { FaTrash } from "react-icons/fa6";

const MileStoneList = memo(function MileStoneList({
  list,
  onChange,
  onDelete,
}: {
  list: Array<MileStone>;
  onChange: (updatedList: Array<MileStone>) => void;
  onDelete: () => void;
}) {
  const [mileStoneList, setMileStoneList] = useState(list);
  const recivedList = useRef<Array<MileStone>>(list);
  const inputRef = useRef<HTMLInputElement>(null);

  const addMileStone = useCallback(() => {
    if (inputRef.current != null && inputRef.current?.value != "") {
      setMileStoneList((list) => {
        if (inputRef.current != null) {
          const newMileStone: MileStone = {
            id: uuid(),
            status: false,
            title: inputRef.current.value,
          };
          return [...list, newMileStone];
        } else return list;
      });
      inputRef.current.value = "";
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (!dash.isEqual(list, recivedList.current)) {
        setMileStoneList(list);
        recivedList.current = list;
      }
    }, 100);
  }, [list]);

  useEffect(() => {
    if (!dash.isEqual(recivedList.current, mileStoneList)) {
      onChange(mileStoneList);
    }
  }, [mileStoneList, onChange]);

  return (
    <div className="flex gap-2 items-start px-2">
      <div className="w-8 min-w-8 h-6 flex items-center justify-center secondary-text">
        <TbCheckbox size={20} />
      </div>
      <div className="flex flex-col gap-3">
        <TitleWithAction Icon={FaTrash} action={onDelete}>
          <h1 className="secondary-text font-bold">MileStones</h1>
        </TitleWithAction>
        {mileStoneList.map((mileStone) => (
          <Milestone
            mileStone={mileStone}
            onChange={(e) => {
              setMileStoneList((prvList) => {
                const updatedList = prvList.map((ms) => {
                  if (ms.id == mileStone.id) {
                    ms.status = e.target.checked;
                    return ms;
                  }
                  return ms;
                });
                return updatedList;
              });
            }}
            key={mileStone.id}
            onDelete={(id) => {
              setMileStoneList((list) => {
                return list.filter((ms) => ms.id != id);
              });
            }}
            onSave={(mileStone) => {
              setMileStoneList((list) =>
                list.map((ms) => {
                  if (ms.id === mileStone.id) return mileStone;
                  else return ms;
                })
              );
            }}
          />
        ))}
        <div className="flex gap-4 lg:ps-4">
          <input
            type="text"
            placeholder="Add Milestone"
            className="bg-transparent px-2 border-b border-slate-400 custom-input"
            ref={inputRef}
          />
          <IconButton
            Icon={IoAdd}
            className="bg-slate-400 hover:bg-slate-300 rounded primary-text dark:text-slate-700"
            size={20}
            onClick={addMileStone}
          />
        </div>
      </div>
    </div>
  );
});

export default MileStoneList;
