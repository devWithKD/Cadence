"use strict";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import { KanbanState, CategoryType, CardType, Board } from "../interfaces";
import { categories } from "../utils/categories";
import { cards } from "../utils/cards";
import { useAuth } from "./auth-context";

interface KanbanData {
  cards: CardType[];
  categories: CategoryType[];
}
interface Action {
  type: string;
  payload: CategoryType | CardType | string | KanbanData | Board | null;
}

interface KanbanContextInterface {
  // Current Board
  currentBoard: Board | null;
  // Main State
  cards: Array<CardType>;
  categories: Array<CategoryType>;
  // CardType Methods
  addCard: (card: CardType) => void;
  updateCard: (card: CardType) => void;
  removeCard: (cardID: string) => void;
  // CategoryType Methods
  addCategory: (category: CategoryType) => void;
  updateCategory: (category: CategoryType) => void;
  removeCategory: (catID: string) => void;
  // Set Board ID
  setBoard: (board: Board | null) => void;
}

export const KanbanContext = createContext<KanbanContextInterface>({
  // Current Board
  currentBoard: null,
  // Main State
  cards: [],
  categories: [],
  // CardType Methods
  addCard: () => {},
  updateCard: () => {},
  removeCard: () => {},
  // CategoryType Methods
  addCategory: () => {},
  updateCategory: () => {},
  removeCategory: () => {},
  // Set Board ID
  setBoard: () => {},
});

function kanbanReducer(state: KanbanState, action: Action) {
  let cardsState: Array<CardType> = [...state.cards];
  let categoryState: Array<CategoryType> = [...state.categories];
  let boardState: Board | null = state.currentBoard;

  switch (action.type) {
    case "ADD_CARD":
      cardsState.push(action.payload as CardType);
      break;

    case "ADD_CATEGORY":
      categoryState.push(action.payload as CategoryType);
      break;

    case "UPDATE_CARD":
      cardsState = cardsState.map((card) => {
        if (card.id === (action.payload as CardType).id) {
          return action.payload as CardType;
        }
        return card;
      });
      break;

    case "UPDATE_CATEGORY":
      categoryState = categoryState.map((cat) => {
        if (cat.id === (action.payload as CategoryType).id) {
          return action.payload as CategoryType;
        }
        return cat;
      });
      break;

    case "REMOVE_CARD":
      cardsState = cardsState.filter((card) => card.id != action.payload);
      break;

    case "REMOVE_CATEGORY":
      categoryState = categoryState.filter((cat) => cat.id != action.payload);
      break;

    case "SET_DATA":
      if (
        action.payload &&
        typeof action.payload == "object" &&
        "cards" in action.payload &&
        "categories" in action.payload
      ) {
        cardsState = action.payload.cards;
        categoryState = action.payload.categories;
      }
      break;

    case "SET_BOARD":
      boardState = action.payload as Board | null;
      break;

    default:
      break;
  }

  return {
    cards: cardsState,
    categories: categoryState,
    currentBoard: boardState,
  };
}

export default function KanbanContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [kanbanState, kanbanDispatch] = useReducer(kanbanReducer, {
    currentBoard: null,
    cards: [],
    categories: [],
  });

  const { mode } = useAuth();

  const addCardHandler = useCallback((card: CardType) => {
    kanbanDispatch({
      type: "ADD_CARD",
      payload: card,
    });
  }, []);

  const addCategoryHandler = useCallback((category: CategoryType) => {
    kanbanDispatch({ type: "ADD_CATEGORY", payload: category });
  }, []);

  const updateCardHandler = useCallback((card: CardType) => {
    kanbanDispatch({ type: "UPDATE_CARD", payload: card });
  }, []);

  const updateCategoryHandler = useCallback((category: CategoryType) => {
    kanbanDispatch({ type: "UPDATE_CATEGORY", payload: category });
  }, []);

  const removeCardHandler = useCallback((cardID: string) => {
    kanbanDispatch({ type: "REMOVE_CARD", payload: cardID });
  }, []);

  const removeCategoryHandler = useCallback((catID: string) => {
    kanbanDispatch({ type: "REMOVE_CATEGORY", payload: catID });
  }, []);

  const setBoard = useCallback((board: Board | null) => {
    kanbanDispatch({ type: "SET_BOARD", payload: board });
  }, []);

  const ctxValue = {
    // Current Board
    currentBoard: kanbanState.currentBoard,
    // Main State
    cards: kanbanState.cards,
    categories: kanbanState.categories,
    // CardType Methods
    addCard: addCardHandler,
    updateCard: updateCardHandler,
    removeCard: removeCardHandler,
    // CategoryType Methods
    addCategory: addCategoryHandler,
    updateCategory: updateCategoryHandler,
    removeCategory: removeCategoryHandler,
    // Set Board ID
    setBoard,
  };

  useEffect(() => {
    if (mode == "demo") {
      kanbanDispatch({ type: "SET_DATA", payload: { cards, categories } });
    }
  }, [mode]);

  return (
    <KanbanContext.Provider value={ctxValue}>{children}</KanbanContext.Provider>
  );
}
