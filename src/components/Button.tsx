import { IconType } from "react-icons";

export default function Button({
  Icon,
  onClick,
  title,
  className,
}: {
  Icon?: IconType;
  onClick?: React.MouseEventHandler;
  title?: string;
  className?: string;
}) {
  return (
    <button
      className={`${className} ${
        className && className.includes("bg")
          ? ""
          : "bg-slate-100 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500"
      } rounded flex justify-start gap-2 items-center px-2 py-1 secondary-text text-xs transition duration-200`}
      onClick={onClick}
    >
      {Icon && <Icon />}
      <span>{title}</span>
    </button>
  );
}
