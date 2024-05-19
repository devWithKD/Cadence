import {
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

export interface ModalRef {
  showModal: () => void;
  closeModal: () => void;
}
interface ModalInterface {
  className?: string;
  children: ReactNode[] | ReactNode;
}

const Modal = forwardRef<ModalRef, ModalInterface>(
  ({ className, children }, ref) => {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const clickableRef = useRef<HTMLDivElement>(null);
    useImperativeHandle(ref, () => {
      return {
        showModal: () => dialogRef.current?.showModal(),
        closeModal: () => dialogRef.current?.close(),
      };
    });
    useEffect(() => {
      const handleOutsideClick = (e: MouseEvent) => {
        if (
          clickableRef.current != null &&
          !clickableRef.current.contains(e.target as Node)
        ) {
          dialogRef.current?.close();
        }
      };
      document.addEventListener("mousedown", handleOutsideClick);
      return () =>
        document.removeEventListener("mousedown", handleOutsideClick);
    }, []);
    return (
      <dialog className="fixed bg-transparent" ref={dialogRef}>
        <div className={className} ref={clickableRef}>
          {children}
        </div>
      </dialog>
    );
  }
);

export default Modal;
