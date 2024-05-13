import {
  DocumentData,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";
import { Board } from "../../interfaces";

interface docData extends DocumentData {
  uid: string;
}

export const getUserBoards = async (userID: string) => {
  const boardsQuery = query(
    collection(db, "boards"),
    where("owner", "==", userID)
  );
  const boardsSnapshot = await getDocs(boardsQuery);
  const data: docData[] = boardsSnapshot.docs.map((doc) => {
    const docdata = doc.data();
    return { ...docdata, uid: doc.id };
  });
  return data;
};

export const addBoard = async (board: Board) => {
  const { uid, ...data } = board;
  return await setDoc(doc(db, "boards", uid), data);
};

export const updateBoard = async (board: Board) => {
  const { uid, ...data } = board;
  return await updateDoc(doc(db, "boards", uid), data);
};

export const deleteBoard = async (uid: string) => {
  return await deleteDoc(doc(db, "boards", uid));
};
