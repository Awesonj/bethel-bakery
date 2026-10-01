import { createContext, useContext, useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { watchAuthState } from "../firebase/auth";
import { db } from "../firebase/config";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isStaff, setIsStaff] = useState(false);
  const [staffName, setStaffName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = watchAuthState(async (firebaseUser) => {
      // Hold everything in a loading state until the staff check finishes,
      // so nothing can redirect before we know who this user really is
      setLoading(true);

      if (!firebaseUser) {
        setUser(null);
        setIsStaff(false);
        setStaffName("");
        setLoading(false);
        return;
      }

      try {
        const staffDoc = await getDoc(doc(db, "staff", firebaseUser.uid));
        const data = staffDoc.exists() ? staffDoc.data() : null;

        if (data && data.role === "staff") {
          setIsStaff(true);
          setStaffName((data.name || "").trim());
        } else {
          setIsStaff(false);
          setStaffName("");
        }
      } catch (err) {
        console.error("Could not check staff status:", err);
        setIsStaff(false);
        setStaffName("");
      } finally {
        setUser(firebaseUser);
        setLoading(false);
      }
    });

    return unsubscribe;
  }, []);

  const value = { user, isStaff, staffName, loading };

  return (
    <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}