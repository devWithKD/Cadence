import {
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
import { CardType } from "../../interfaces";
// import { User } from "firebase/auth";

export const getCardsFromBoard = async (boardID: string, userID: string) => {
  const cardsQuery = query(
    collection(db, "cards"),
    where("owner", "==", userID),
    where("boardID", "==", boardID)
  );
  const cardsSnapshot = await getDocs(cardsQuery);
  const data: CardType[] = cardsSnapshot.docs.map((doc) => {
    const { ...docdata } = doc.data();
    return { ...docdata, uid: doc.id } as CardType;
  });
  return data;
};

export const addCardFirestore = async (card: CardType) => {
  const { uid, ...cardData } = card;
  return await setDoc(doc(db, "cards", uid), { ...cardData });
};

export const updateCardFirestore = async (card: CardType) => {
  const { uid, ...cardData } = card;
  return await updateDoc(doc(db, "cards", uid), { ...cardData });
};

export const deleteCardFireStore = async (cardID: string) => {
  return await deleteDoc(doc(db, "cards", cardID));
};
