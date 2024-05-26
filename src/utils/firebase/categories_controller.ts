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
import { CategoryType } from "../../interfaces";

export const getCategoriesFromBoard = async (
  boardID: string,
  userID: string
) => {
  const categoriesQuery = query(
    collection(db, "categories"),
    where("owner", "==", userID),
    where("boardID", "==", boardID)
  );
  const categoriesSnapshot = await getDocs(categoriesQuery);
  const data: CategoryType[] = categoriesSnapshot.docs.map((doc) => {
    const { ...docData } = doc.data();
    return { ...docData, uid: doc.id } as CategoryType;
  });
  return data;
};

export const addCategoryFirestore = async (category: CategoryType) => {
  const { uid, ...categoryData } = category;
  return await setDoc(doc(db, "categories", uid), { ...categoryData });
};

export const updateCategoryFirestore = async (category: CategoryType) => {
  const { uid, ...categoryData } = category;
  return await updateDoc(doc(db, "categories", uid), { ...categoryData });
};

export const deleteCategoryFireStore = async (catID: string) => {
  return await deleteDoc(doc(db, "categories", catID));
};
