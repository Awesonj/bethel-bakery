import { motion } from "framer-motion";
import "./WhyBethel.css";

const POINTS = [
  {
    id: "quality",
    title: "Small Batch Quality & Care",
    text: "Every bake is made fresh, in small batches, with close attention to detail.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 6c-8 8-14 14-14 22a14 14 0 0 0 28 0c0-8-6-14-14-22Z" />
        <path d="M24 16v18M18 24h12" />
      </svg>
    ),
  },
  {
    id: "dietary",
    title: "Gluten Free & Vegan Options",
    text: "A growing range of gluten free and vegan bakes, without compromising on taste.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M24 8 8 24l16 16 16-16Z" />
        <path d="M8 24 24 8M40 24 24 40" />
      </svg>
    ),
  },
  {
    id: "delivery",
    title: "Tracked UK Delivery",
    text: "Collection across the West Midlands, or tracked postal delivery further afield.",
    icon: (
      <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="6" y="14" width="24" height="18" rx="2" />
        <path d="M30 20h8l4 6v6h-12" />
        <circle cx="15" cy="34" r="3" />
        <circle cx="35" cy="34" r="3" />
      </svg>
    ),
  },
];

export default function WhyBethel() {
  return (
    <section className="why-bethel">
      <h2 className="why-bethel__heading">Why Bethel</h2>

      <div className="why-bethel__grid">
        {POINTS.map((point, i) => (
          <motion.div
            key={point.id}
            className="why-bethel__item"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
          >
            <span className="why-bethel__icon">{point.icon}</span>
            <h3 className="why-bethel__item-title">{point.title}</h3>
            <p className="why-bethel__item-text">{point.text}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}