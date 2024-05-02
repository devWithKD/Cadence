import { createContext, useReducer, ReactNode, useEffect } from "react";
import { ThemeAction, ThemeState } from "../interfaces";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

function themeReducer(state: ThemeState, action: ThemeAction) {
  if (action.type === "TOGGLE_THEME") {
    const themeState = { ...state };
    themeState.theme = themeState.theme === "dark" ? "light" : "dark";
    return themeState;
  }
  return state;
}

export default function ThemeContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [themeState, themeDispatch] = useReducer(themeReducer, {
    theme: "light",
  });

  function handleThemeToggle() {
    themeDispatch({ type: "TOGGLE_THEME" });
  }

  const ctxValue = {
    theme: themeState.theme,
    toggleTheme: handleThemeToggle,
  };

  useEffect(() => {
    if (themeState.theme === "dark")
      document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [themeState]);
  return (
    <ThemeContext.Provider value={ctxValue}>{children}</ThemeContext.Provider>
  );
}
