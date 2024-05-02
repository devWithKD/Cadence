import { ReactNode, forwardRef, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = forwardRef(function Modal(
  {
    className,
    children,
    onOutsideClick,
  }: {
    className?: string;
    children?: ReactNode | Array<ReactNode>;
    onOutsideClick?: () => void;
  },
  ref: React.ForwardedRef<HTMLDialogElement>
) {
  const clickableAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (evt: MouseEvent) => {
      if (clickableAreaRef) {
        if (!clickableAreaRef.current?.contains(evt.target as Node)) {
          if (onOutsideClick != null) onOutsideClick();
          // console.debug("Handle Outside Click Called");
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  },[]);

  return createPortal(
    <dialog ref={ref} className={className}>
      <div ref={clickableAreaRef} className="w-full">
        {children}
      </div>
    </dialog>,
    document.getElementById("modal")!
  );
});
export default Modal;
