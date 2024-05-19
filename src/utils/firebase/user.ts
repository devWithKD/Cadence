import { UserCredential } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { deleteBoard, getUserBoards } from "./boards";
import {
  deleteCategoryFireStore,
  getCategoriesFromBoard,
} from "./categories_controller";
import { deleteCardFireStore, getCardsFromBoard } from "./cards_controller";

export const createUserIfNotExist = async (creds: UserCredential) => {
  const userRef = doc(db, "users", creds.user.uid);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) {
    setDoc(userRef, {
      name: creds.user.displayName,
      email: creds.user.email,
    });
  }
};

export const deleteUserFirestore = async (userId: string) => {
  const userBoards = await getUserBoards(userId);
  userBoards.forEach(async (board) => {
    const categories = await getCategoriesFromBoard(board.uid);
    const cards = await getCardsFromBoard(board.uid);
    categories.forEach(async (cat) => await deleteCategoryFireStore(cat.uid));
    cards.forEach(async (card) => await deleteCardFireStore(card.uid));
    await deleteBoard(board.uid);
  });
  return deleteDoc(doc(db, "users", userId));
};
