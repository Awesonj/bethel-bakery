import {
  collection,
  addDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./config";

export function createEnquiry(data) {
  return addDoc(collection(db, "enquiries"), {
    ...data,
    status: "new",
    createdAt: serverTimestamp(),
  });
}

export function listenToEnquiries(callback) {
  const q = query(collection(db, "enquiries"), orderBy("createdAt", "desc"));
  return onSnapshot(q, (snapshot) => {
    const enquiries = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    callback(enquiries);
  });
}

export function updateEnquiryStatus(enquiryId, status) {
  return updateDoc(doc(db, "enquiries", enquiryId), { status });
}