import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import firestore from "./firebase-setup";

export async function writeToDB(goal) {
  console.log("firestore");
  try {
    const docRef = await addDoc(collection(firestore, "goals"), goal);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteFromDB(key) {
  console.log("dele firestore");
  try {
    await deleteDoc(doc(firestore, "goals", key));
  } catch (err) {
    console.log(err);
  }
}