import { v4 as uuid } from "uuid";

export const categories = [
  {
    //  uid: uuid(),
    uid: "uuid-1",
    title: "To-Do",
    color: "slate",
    boardID: "",
    owner: "",
  },
  {
    uid: uuid(),
    title: "In Progress",
    color: "yellow",
    boardID: "",
    owner: "",
  },
  {
    uid: uuid(),
    title: "Done",
    color: "green",
    boardID: "",
    owner: "",
  },
  {
    uid: uuid(),
    title: "Review",
    color: "indigo",
    boardID: "",
    owner: "",
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
