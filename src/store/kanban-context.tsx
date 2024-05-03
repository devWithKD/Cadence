"use strict";

import { ReactNode, createContext, useReducer } from "react";
import { KanbanState, CategoryType, CardType } from "../interfaces";
import { categories } from "../utils/categories";
import { cards } from "../utils/cards";

interface Action {
  type: string;
  payload: CategoryType | CardType | string;
}

interface KanbanContextInterface {
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
  removrCategory: (catID: string) => void;
}

export const KanbanContext = createContext<KanbanContextInterface>({
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
  removrCategory: () => {},
});

function kanbanReducer(state: KanbanState, action: Action) {
  if (action.type === "ADD_CARD") {
    // Add CardType Logic
    const cardsState: Array<CardType> = [...state.cards];
    cardsState.push(action.payload as CardType);
    return { ...state, cards: cardsState };
  } else if (action.type === "UPDATE_CARD") {
    // Update CardType Logic
    const cardsState: Array<CardType> = [...state.cards];
    const updatedArray = cardsState.map((card) => {
      if (card.id === (action.payload as CardType).id) {
        return action.payload as CardType;
      } else return card;
    });
    return { ...state, cards: updatedArray };
  } else if (action.type === "REMOVE_CARD") {
    // Remove CardType Logic
    return {
      ...state,
      cards: state.cards.filter((card) => card.id != action.payload),
    };
  } else if (action.type === "ADD_CATEGORY") {
    // Add CardType Logic
    const categoriesState = [...state.categories];
    categoriesState.push(action.payload as CategoryType);
    return { ...state, categories: categoriesState };
  } else if (action.type === "UPDATE_CATEGORY") {
    // Update CardType Logic
    const categoriesState = [...state.categories];
    const updatedCats = categoriesState.map((category) => {
      if (category.id === (action.payload as CategoryType).id) {
        return action.payload as CategoryType;
      } else return category;
    });
    return { ...state, categories: updatedCats };
  } else if (action.type === "REMOVE_CATEGORY") {
    // Remove CardType Logic
    return {
      ...state,
      categories: state.categories.filter(
        (category) => category.id != action.payload
      ),
      cards: state.cards.filter((child) => child.parent != action.payload),
    };
  }
  return state;
}

export default function KanbanContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [kanbanState, kanbanDispatch] = useReducer(kanbanReducer, {
    cards: cards,
    categories: categories,
  });

  function addCardHandler(card: CardType) {
    kanbanDispatch({
      type: "ADD_CARD",
      payload: card,
    });
  }

  function addCategoryHandler(category: CategoryType) {
    kanbanDispatch({ type: "ADD_CATEGORY", payload: category });
  }

  function updateCardHandler(card: CardType) {
    kanbanDispatch({ type: "UPDATE_CARD", payload: card });
  }

  function updateCategoryHandler(category: CategoryType) {
    kanbanDispatch({ type: "UPDATE_CATEGORY", payload: category });
  }

  function removeCardHandler(cardID: string) {
    kanbanDispatch({ type: "REMOVE_CARD", payload: cardID });
  }

  function removeCategoryHandler(catID: string) {
    kanbanDispatch({ type: "REMOVE_CATEGORY", payload: catID });
  }

  const ctxValue = {
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
    removrCategory: removeCategoryHandler,
  };
  return (
    <KanbanContext.Provider value={ctxValue}>{children}</KanbanContext.Provider>
  );
}
