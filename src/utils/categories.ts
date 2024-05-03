import { v4 as uuid } from "uuid";

export const categories = [
  {
    //  id: uuid(),
    id: "uuid-1",
    title: "To-Do",
    color: "slate",
  },
  {
    id: uuid(),
    title: "In Progress",
    color: "yellow",
  },
  {
    id: uuid(),
    title: "Done",
    color: "green",
  },
  {
    id: uuid(),
    title: "Review",
    color: "indigo",
  },
];

export function removeBgWords(str: string | undefined) {
  if (!str) return;
  // Regular expression to match words with "bg-" (case-insensitive)
  const regex = /\b\w*bg-\w*\b/gi;

  // Replace matching words with an empty string
  return str.replace(regex, "");
}

export const colors = [
  "sky",
  "rose",
  "green",
  "slate",
  "teal",
  "yellow",
  "indigo",
  "blue",
  "purple",
  "pink",
];
