import { useState } from "react";
import { motion } from "framer-motion";
import { GALLERY_IMAGES } from "./galleryData";
import GalleryLightbox from "./GalleryLightbox";
import "./Gallery.css";

const INSTAGRAM_URL = "https://instagram.com/bethelbakery";
const FACEBOOK_URL = "https://facebook.com/bethelbakery";

export default function Gallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="gallery">
      <h2 className="gallery__heading">Follow our creations</h2>

      <div className="gallery__grid">
        {GALLERY_IMAGES.map((item, i) => {
          const label = "View: " + item.alt;
          return (
            <motion.button
              key={item.id}
              className="gallery__tile"
              onClick={() => setActive(item)}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              aria-label={label}
            >
              {item.image ? (
                <img src={item.image} alt={item.alt} />
              ) : (
                <div className="gallery__placeholder" />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="gallery__socials">
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gallery__button"
        >
          Follow on Instagram
        </a>

        <a
          href={FACEBOOK_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="gallery__button gallery__button--facebook"
        >
          Follow on Facebook
        </a>
      </div>

      <GalleryLightbox item={active} onClose={() => setActive(null)} />
    </section>
  );
}
