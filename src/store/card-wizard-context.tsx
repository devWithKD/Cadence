import { ReactNode, createContext, useCallback, useState } from "react";
import { wizardRefInterface } from "../components/CardWizard";

interface ModalContextInterface {
  modalRef?: React.RefObject<wizardRefInterface>;
  setModalRef: (refObj: React.RefObject<wizardRefInterface>) => void;
}

export const CardWizardModalContext = createContext<ModalContextInterface>({
  modalRef: undefined,
  setModalRef: () => {},
});

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode | Array<ReactNode>;
}) {
  const [modalRefObj, setModalRefObj] = useState<
    React.RefObject<wizardRefInterface> | undefined
  >(undefined);
  const setModalRef = useCallback(
    (refObj: React.RefObject<wizardRefInterface>) => {
      setModalRefObj(refObj);
    },
    []
  );

  const ctxValue = {
    modalRef: modalRefObj,
    setModalRef: setModalRef,
  };
  return (
    <CardWizardModalContext.Provider value={ctxValue}>{children}</CardWizardModalContext.Provider>
  );
}
