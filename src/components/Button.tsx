import { IconType } from "react-icons";

export default function Button({
  Icon,
  onClick,
  size,
  title,
  className,
}: {
  Icon?: IconType;
  onClick?: React.MouseEventHandler;
  size?: number;
  title?: string;
  className?: string;
}) {
  return (
    <button
      className={`${className} ${
        className && className.includes("bg")
          ? ""
          : "bg-slate-100 dark:bg-slate-600 hover:bg-slate-300 dark:hover:bg-slate-500"
      } rounded flex justify-start gap-2 items-center px-2 py-1 transition duration-200 ${
        className && className.includes("text") ? "" : "text-xs secondary-text"
      }`}
      onClick={onClick}
    >
      {Icon && <Icon size={size || 16} />}
      <span className={`w-full ${Icon && "-translate-x-2"}`}>{title}</span>
    </button>
  );
}
