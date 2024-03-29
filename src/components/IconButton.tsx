import { IconType } from "react-icons";

export default function IconButton({
  Icon,
  buttonType = "medium",
  className,
}: {
  Icon: IconType;
  buttonType?: "small" | "medium" | "large";
  className?: string 
}) {




  return (
    <div
      className={`p-1 rounded-full transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-500 relative cursor-pointer ${className}`}
    >
      <Icon
        size={
          buttonType == "medium"
            ? 16
            : buttonType == "small"
              ? 8
              : buttonType == "large"
                ? 32
                : 16
        }
      />
    </div>
  );
}
