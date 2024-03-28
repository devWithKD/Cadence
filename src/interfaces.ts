export interface MileStone {
  id: string;
  title: string;
  status: boolean;
  description: string;
}

export interface Card {
  id: string;
  parent: string;
  title: string;
  hasDue: boolean;
  dueDate: Date | null;
  description: string;
  hasCheckList: boolean;
  checkList: Array<MileStone> | null;
}

export interface Category {
  id: string;
  title: string;
  color: string;
}

export interface KanbanState {
  cards: Array<Card>;
  categories: Array<Category>;
}

export interface ThemeAction {
  type: string;
}

export interface ThemeState {
  theme: string;
}
