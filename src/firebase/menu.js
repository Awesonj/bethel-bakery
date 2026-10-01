import {
  collection,
  addDoc,
  doc,
  updateDoc,
  increment,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export function addMenuItem(item) {
  return addDoc(collection(db, "menuItems"), {
    ...item,
    createdAt: serverTimestamp(),
  });
}

export function listenToMenuItems(callback) {
  return onSnapshot(collection(db, "menuItems"), (snapshot) => {
    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    callback(items);
  });
}

export function updateMenuItem(id, data) {
  return updateDoc(doc(db, "menuItems", id), data);
}

export function decrementStock(id, quantity) {
  return updateDoc(doc(db, "menuItems", id), {
    stock: increment(-quantity),
  });
}

export function incrementStock(id, quantity) {
  return updateDoc(doc(db, "menuItems", id), {
    stock: increment(quantity),
  });
}