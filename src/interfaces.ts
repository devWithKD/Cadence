import { DocumentData } from "firebase/firestore";

export interface MileStone {
  uid: string;
  title: string;
  status: boolean;
}

export interface CardType {
  uid: string;
  parent: string;
  title: string;
  hasStart: boolean;
  startDate?: Date | null;
  hasDue: boolean;
  dueDate?: Date | null;
  description: string;
  hasCheckList: boolean;
  checkList?: Array<MileStone> | null;
  boardID: string;
  owner: string;
}

export interface CategoryType {
  uid: string;
  title: string;
  color: string;
  boardID: string;
  owner: string;
}

export interface KanbanState {
  currentBoard: Board | null;
  cards: CardType[];
  categories: CategoryType[];
}

export interface Board {
  title: string;
  owner: string;
  uid: string;
}

export interface ThemeAction {
  type: string;
}

export interface ThemeState {
  theme: string;
}

export const ItemTypes = {
  CARD: "card",
};

export interface docData extends DocumentData {
  uid: string;
}