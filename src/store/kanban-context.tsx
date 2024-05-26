"use strict";

import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useReducer,
  useState,
} from "react";
import { KanbanState, CategoryType, CardType, Board } from "../interfaces";
import { categories } from "../utils/categories";
import { cards } from "../utils/cards";
import { useAuth } from "./auth-context";
import {
  addCardFirestore,
  deleteCardFireStore,
  getCardsFromBoard,
  updateCardFirestore,
} from "../utils/firebase/cards_controller";
import {
  addCategoryFirestore,
  deleteCategoryFireStore,
  getCategoriesFromBoard,
  updateCategoryFirestore,
} from "../utils/firebase/categories_controller";

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
  // Data Loading State
  loading: boolean;
  // CardType Methods
  addCard: (card: CardType) => void;
  updateCard: (card: CardType) => void;
  removeCard: (cardID: string) => void;
  // CategoryType Methods
  addCategory: (category: CategoryType) => void;
  updateCategory: (category: CategoryType) => void;
  removeCategory: (catID: string) => void;
  // Set Board uid
  setBoard: (board: Board | null) => void;
}

export const KanbanContext = createContext<KanbanContextInterface>({
  // Current Board
  currentBoard: null,
  // Main State
  cards: [],
  categories: [],
  // loading state
  loading: false,
  // CardType Methods
  addCard: () => {},
  updateCard: () => {},
  removeCard: () => {},
  // CategoryType Methods
  addCategory: () => {},
  updateCategory: () => {},
  removeCategory: () => {},
  // Set Board uid
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
        if (card.uid === (action.payload as CardType).uid) {
          return action.payload as CardType;
        }
        return card;
      });
      break;

    case "UPDATE_CATEGORY":
      categoryState = categoryState.map((cat) => {
        if (cat.uid === (action.payload as CategoryType).uid) {
          return action.payload as CategoryType;
        }
        return cat;
      });
      break;

    case "REMOVE_CARD":
      cardsState = cardsState.filter((card) => card.uid != action.payload);
      break;

    case "REMOVE_CATEGORY":
      categoryState = categoryState.filter((cat) => cat.uid != action.payload);
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
  const [dataLoading, setDataLoading] = useState<boolean>(false);

  const { mode, currentUser } = useAuth();

  const addCardHandler = useCallback(
    async (card: CardType) => {
      kanbanDispatch({
        type: "ADD_CARD",
        payload: card,
      });
      try {
        await addCardFirestore(card);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const addCategoryHandler = useCallback(
    async (category: CategoryType) => {
      kanbanDispatch({ type: "ADD_CATEGORY", payload: category });
      try {
        await addCategoryFirestore(category);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const updateCardHandler = useCallback(
    async (card: CardType) => {
      kanbanDispatch({ type: "UPDATE_CARD", payload: card });
      try {
        await updateCardFirestore(card);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const updateCategoryHandler = useCallback(
    async (category: CategoryType) => {
      kanbanDispatch({ type: "UPDATE_CATEGORY", payload: category });
      try {
        await updateCategoryFirestore(category);
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const removeCardHandler = useCallback(async (cardID: string) => {
    kanbanDispatch({ type: "REMOVE_CARD", payload: cardID });
    try {
      await deleteCardFireStore(cardID);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeCategoryHandler = useCallback(async (catID: string) => {
    kanbanDispatch({ type: "REMOVE_CATEGORY", payload: catID });
    try {
      await deleteCategoryFireStore(catID);
    } catch (error) {
      console.error(error);
    }
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
    // Loading State
    loading: dataLoading,
    // CardType Methods
    addCard: addCardHandler,
    updateCard: updateCardHandler,
    removeCard: removeCardHandler,
    // CategoryType Methods
    addCategory: addCategoryHandler,
    updateCategory: updateCategoryHandler,
    removeCategory: removeCategoryHandler,
    // Set Board uid
    setBoard,
  };

  useEffect(() => {
    const getBoardDataFromFirestore = async () => {
      setDataLoading(true);
      try {
        const boardCards = await getCardsFromBoard(
          kanbanState.currentBoard!.uid, currentUser?.uid as string
        );
        const boardCategories = await getCategoriesFromBoard(
          kanbanState.currentBoard!.uid, currentUser?.uid as string
        );
        kanbanDispatch({
          type: "SET_DATA",
          payload: { cards: boardCards, categories: boardCategories },
        });
      } catch (error) {
        console.error(error);
      }
      setDataLoading(false);
    };
    if (mode == "demo") {
      kanbanDispatch({
        type: "SET_DATA",
        payload: { cards, categories },
      });
    } else if (kanbanState.currentBoard != null) {
      getBoardDataFromFirestore();
    }
  }, [currentUser?.uid, kanbanState.currentBoard, mode]);

  return (
    <KanbanContext.Provider value={ctxValue}>{children}</KanbanContext.Provider>
  );
}
