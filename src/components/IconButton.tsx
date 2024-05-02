import { memo } from "react";
import { IconType } from "react-icons";

const IconButton = memo(
function IconButton({
  Icon,
  buttonType,
  className,
  onClick,
  size
}: {
  Icon: IconType;
  buttonType?: "small" | "medium" | "large";
  size?: number; 
  className?: string;
  onClick?: (event: React.MouseEvent) => void;
}) {
  return (
    <button
      className={`p-1 transition duration-200 hover:bg-slate-200 dark:hover:bg-slate-500 relative cursor-pointer ${className}`}
      onClick={onClick}
    >
      <Icon
        size={
          buttonType == "medium"
            ? 16
            : buttonType == "small"
              ? 8
              : buttonType == "large"
                ? 24
                : size ? size : 16
        }
      />
    </button>
  );
})

export default IconButton;
