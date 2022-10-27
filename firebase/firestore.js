import { collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import firestore from "./firebase-setup";

// export async function writeToDB(goal) {
//   try {
//     const docRef = await addDoc(collection(firestore, "goals"), goal);
//   } catch (err) {
//     console.log(err);
//   }
// }

export async function writeToDB(data){
  console.log("firestore");
  console.log(data);
  try{
      await addDoc(collection(firestore,"goals"),data);
  }catch(e){
      console.log("error");
  }
}

// export async function deleteFromDB(key) {
//   try {
//     await deleteDoc(doc(firestore, "goals", key));
//   } catch (err) {
//     console.log(err);
//   }
// }