import { AnimatePresence, motion } from "framer-motion";
import "./GalleryLightbox.css";

export default function GalleryLightbox({ item, onClose }) {
  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="gallery-lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="gallery-lightbox__inner"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={(e) => e.stopPropagation()}
          >
            {item.image ? (
              <img src={item.image} alt={item.alt} />
            ) : (
              <div className="gallery-lightbox__placeholder" />
            )}
            <button
              className="gallery-lightbox__close"
              onClick={onClose}
              aria-label="Close"
            >
              ✕
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}