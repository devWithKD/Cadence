import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import IconButton from "./IconButton";

export default function TitleWithAction({
  Icon,
  action,
  children,
}: {
  Icon: IconType;
  action: () => void;
  children: ReactNode|ReactNode[];
}) {
  const [showAction, setShowAction] = useState(false);
  return (
    <div
      className="flex gap-4 max-w-fit items-center"
      onMouseEnter={() => {
        setShowAction(true);
      }}
      onMouseLeave={() => {
        setShowAction(false);
      }}
    >
      {children}
      <IconButton
        Icon={Icon}
        size={14}
        className={`rounded-full p-2 hover:bg-slate-400 primary-text transition-all delay-200 ${
          showAction ? "opacity-100" : "opacity-0"
        }`}
        onClick={action}
      />
    </div>
  );
}
