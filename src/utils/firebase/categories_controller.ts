import { collection, deleteDoc, doc, getDocs, query, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "./firebase";
import { CategoryType } from "../../interfaces";

export const getCategoriesFromBoard = async (boardID: string) => {
  const categoriesQuery = query(
    collection(db, "categories"),
    where("board", "==", boardID)
  );
  const categoriesSnapshot = await getDocs(categoriesQuery);
  const data: CategoryType[] = categoriesSnapshot.docs.map((doc) => {
    const { ...docData } = doc.data();
    return { ...docData, uid: doc.id } as CategoryType;
  });
  return data;
};

export const addCategoryFirestore = async (category: CategoryType, boardID: string) => {
  const { uid, ...categoryData } = category;
  return await setDoc(doc(db, "categories", uid), { ...categoryData, board: boardID });
};

export const updateCategoryFirestore = async (category: CategoryType, boardID: string) => {
  const { uid, ...categoryData } = category;
  return await updateDoc(doc(db, "categories", uid), { ...categoryData, board: boardID });
};

export const deleteCategoryFireStore = async (catID: string) => {
  return await deleteDoc(doc(db, "categories", catID));
};
