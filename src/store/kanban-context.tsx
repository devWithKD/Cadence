"use strict";

import { ReactNode, createContext, useReducer } from "react";
import { Category, Card, KanbanState } from "../interfaces";
import { categories } from "../utils/categories";
import { cards } from "../utils/cards";

interface Action {
  type: string;
  payload: Category | Card | string;
}

interface KanbanContextInterface {
  // Main State
  cards: Array<Card>;
  categories: Array<Category>;
  // Card Methods
  addCard: (card: Card) => void;
  updateCard: (card: Card) => void;
  removeCard: (cardID: string) => void;
  // Category Methods
  addCategory: (category: Category) => void;
  updateCategory: (category: Category) => void;
  removrCategory: (catID: string) => void;
}

export const KanbanContext = createContext<KanbanContextInterface>({
  // Main State
  cards: [],
  categories: [],
  // Card Methods
  addCard: () => {},
  updateCard: () => {},
  removeCard: () => {},
  // Category Methods
  addCategory: () => {},
  updateCategory: () => {},
  removrCategory: () => {},
});

function kanbanReducer(state: KanbanState, action: Action) {
  if (action.type === "ADD_CARD") {
    // Add Card Logic
    const cardsState: Array<Card> = [...state.cards];
    cardsState.push(action.payload as Card);
    return { ...state, cards: cardsState };
  } else if (action.type === "UPDATE_CARD") {
    // Update Card Logic
    const cardsState: Array<Card> = [...state.cards];
    const updatedArray = cardsState.map((card) => {
      if (card.id === (action.payload as Card).id) {
        return action.payload as Card;
      } else return card;
    });
    return { ...state, cards: updatedArray };
  } else if (action.type === "REMOVE_CARD") {
    // Remove Card Logic
    return {
      ...state,
      cards: state.cards.filter((card) => card.id != action.payload),
    };
  } else if (action.type === "ADD_CATEGORY") {
    // Add Card Logic
    const categoriesState = [...state.categories];
    categoriesState.push(action.payload as Category);
    return { ...state, categories: categoriesState };
  } else if (action.type === "UPDATE_CATEGORY") {
    // Update Card Logic
    const categoriesState = [...state.categories];
    const updatedCats = categoriesState.map((category) => {
      if (category.id === (action.payload as Category).id) {
        return action.payload as Category;
      } else return category;
    });
    return { ...state, categories: updatedCats };
  } else if (action.type === "REMOVE_CATEGORY") {
    // Remove Card Logic
    return {
      ...state,
      categories: state.categories.filter(
        (category) => category.id != action.payload,
      ),
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

  function addCardHandler(card: Card) {
    kanbanDispatch({
      type: "ADD_CARD",
      payload: card,
    });
  }

  function addCategoryHandler(category: Category) {
    kanbanDispatch({ type: "ADD_CATEGORY", payload: category });
  }

  function updateCardHandler(card: Card) {
    kanbanDispatch({ type: "UPDATE_CARD", payload: card });
  }

  function updateCategoryHandler(category: Category) {
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
    // Card Methods
    addCard: addCardHandler,
    updateCard: updateCardHandler,
    removeCard: removeCardHandler,
    // Category Methods
    addCategory: addCategoryHandler,
    updateCategory: updateCategoryHandler,
    removrCategory: removeCategoryHandler,
  };
  return (
    <KanbanContext.Provider value={ctxValue}>{children}</KanbanContext.Provider>
  );
}
