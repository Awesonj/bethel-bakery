import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { logoutStaff } from "../../firebase/auth";
import "./AccountMenu.css";

export default function AccountMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { user } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logoutStaff();
    setOpen(false);
  };

  return (
    <div className="account-menu" ref={ref}>
      <button
        className="account-menu__trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        👤
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="account-menu__dropdown"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            {user ? (
              <>
                <Link to="/account" onClick={() => setOpen(false)}>
                  My Account
                </Link>
                <button className="account-menu__logout" onClick={handleLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link to="/login" onClick={() => setOpen(false)}>
                  Log in
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}