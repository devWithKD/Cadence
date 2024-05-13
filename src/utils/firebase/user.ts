import { UserCredential } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

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
