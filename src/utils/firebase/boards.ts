import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { db } from "./firebase";
import { Board, docData } from "../../interfaces";

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
  const userBoards = data.map((dp) => {
    return {
      uid: dp.uid as string,
      owner: dp.owner as string,
      title: dp.title as string,
    };
  });
  return userBoards;
};

export const addBoard = async (board: Board) => {
  const { uid, ...data } = board;
  return await setDoc(doc(db, "boards", uid), data);
};

export const updateBoard = async (board: Board) => {
  const { uid, ...data } = board;
  return await updateDoc(doc(db, "boards", uid), data);
};

export const deleteBoard = async (board: Board) => {
  const cards = await getDocs(
    query(
      collection(db, "cards"),
      where("boardID", "==", board.uid),
      where("owner", "==", board.owner)
    )
  );
  const categories = await getDocs(
    query(
      collection(db, "categories"),
      where("boardID", "==", board.uid),
      where("owner", "==", board.owner)
    )
  );
  const batch = writeBatch(db);
  cards.forEach((doc) => batch.delete(doc.ref));
  categories.forEach((doc) => batch.delete(doc.ref));
  batch.commit();
  return await deleteDoc(doc(db, "boards", board.uid));
};
