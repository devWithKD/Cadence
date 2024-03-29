import { createContext, ReactNode, useState } from "react";

export const ToolTipContext = createContext({
  active: true,
  toggleMode: () => {},
});

export default function ToolTipContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [active, setActive] = useState(true);

  const toggleModeHandler = () => {
    setActive((mode) => !mode);
  };

  const ctxVal = {
    active: active,
    toggleMode: toggleModeHandler,
  };
  return (
    <ToolTipContext.Provider value={ctxVal}>{children}</ToolTipContext.Provider>
  );
}
