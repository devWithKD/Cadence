export interface MileStone {
  id: string;
  title: string;
  status: boolean;
  description: string;
}

export interface CardType {
  id: string;
  parent: string;
  title: string;
  hasStart: boolean;
  startDate?: Date|null;
  hasDue: boolean;
  dueDate?: Date | null;
  description: string;
  hasCheckList: boolean;
  checkList?: Array<MileStone> | null;
}

export interface CategoryType {
  id: string;
  title: string;
  color: string;
}

export interface KanbanState {
  cards: Array<CardType>;
  categories: Array<CategoryType>;
}

export interface ThemeAction {
  type: string;
}

export interface ThemeState {
  theme: string;
}
