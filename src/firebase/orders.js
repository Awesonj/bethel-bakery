import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  onSnapshot,
  query,
  where,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

function normalizeEmail(email) {
  return (email || "").trim().toLowerCase();
}

export async function createOrder(orderData) {
  const docRef = await addDoc(collection(db, "orders"), {
    ...orderData,
    email: normalizeEmail(orderData.email),
    status: orderData.status || "new",
    source: orderData.source || "online",
    createdAt: serverTimestamp(),
  });
  return docRef.id;
}

export async function getOrder(orderId) {
  const orderDoc = await getDoc(doc(db, "orders", orderId));
  if (!orderDoc.exists()) return null;
  return { id: orderDoc.id, ...orderDoc.data() };
}

export async function getOrdersByEmail(email) {
  const q = query(
    collection(db, "orders"),
    where("email", "==", normalizeEmail(email)),
    orderBy("createdAt", "desc")
  );
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

export function listenToOrders(callback) {
  const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const orders = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(orders);
  });
}

export function updateOrderStatus(orderId, status) {
  return updateDoc(doc(db, "orders", orderId), { status });
}