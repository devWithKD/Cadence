import { ReactNode } from "react";
import { IconType } from "react-icons";

export default function FormElement({
  children,
  hasIcon,
  Icon,
  iconSize,
  className,
}: {
  hasIcon?: boolean;
  children: ReactNode;
  Icon?: IconType;
  iconSize?: number;
  className?: string;
}) {
  return (
    <div className="flex gap-2 items-start px-2">
      {(Icon || hasIcon) && (
        <div
          className={`w-8 h-6 min-w-8 flex items-center justify-center secondary-text ${className}`}
        >
          {Icon && <Icon size={iconSize ? iconSize : 16} />}
        </div>
      )}
      <div className="min-h-6 w-full flex flex-col lg:flex-row items-center">{children}</div>
    </div>
  );
}
