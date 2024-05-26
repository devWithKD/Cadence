import { UserCredential } from "firebase/auth";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";
import { deleteBoard, getUserBoards } from "./boards";

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
    await deleteBoard(board);
  });
  return deleteDoc(doc(db, "users", userId));
};
