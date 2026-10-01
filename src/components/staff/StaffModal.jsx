import { AnimatePresence, motion } from "framer-motion";
import "./StaffModal.css";

export default function StaffModal({ title, onClose, children }) {
  return (
    <AnimatePresence>
      <motion.div
        className="staff-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="staff-modal"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
        >
          <div className="staff-modal__header">
            <h2>{title}</h2>
            <button className="staff-modal__close" onClick={onClose}>
              ← Back to categories
            </button>
          </div>

          <div className="staff-modal__body">{children}</div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}