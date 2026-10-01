import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { logoutStaff } from "../../firebase/auth";
import "./MobileNav.css";

export default function MobileNav({ open, onClose, links }) {
  const { user } = useAuth();

  const handleLogout = async () => {
    await logoutStaff();
    onClose();
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="mobile-nav-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className="mobile-nav"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: "easeOut" }}
            role="dialog"
            aria-label="Site menu"
          >
            <button
              className="mobile-nav__close"
              onClick={onClose}
              aria-label="Close menu"
            >
              ✕
            </button>

            <nav className="mobile-nav__links">
              {links.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.25 }}
                >
                  <Link to={link.to} onClick={onClose}>
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mobile-nav__divider" />

            <motion.div
              className="mobile-nav__account"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 + links.length * 0.05, duration: 0.25 }}
            >
              {user ? (
                <>
                  <Link to="/account" onClick={onClose}>
                    👤 My Account
                  </Link>
                  <button className="mobile-nav__logout" onClick={handleLogout}>
                    Log out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={onClose} className="mobile-nav__secondary">
                    Log in
                  </Link>
                  <Link to="/signup" onClick={onClose} className="mobile-nav__secondary">
                    Sign up
                  </Link>
                </>
              )}
            </motion.div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}