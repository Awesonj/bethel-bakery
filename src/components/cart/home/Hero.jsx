import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { useTypedText } from "../../hooks/useTypedText";
import heroImage from "../../assets/hero-cake.jpg";
import "./Hero.css";

const HEADLINE = "Celebrate in style";

export default function Hero() {
  const prefersReducedMotion = useReducedMotion();
  const { displayed, done } = useTypedText(HEADLINE, 45, 300);

  return (
    <section className="hero">
      <motion.img
        src={heroImage}
        alt="A Bethel Bakery celebration cake"
        className="hero__image"
        initial={prefersReducedMotion ? false : { scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 6, ease: "easeOut" }}
      />

      <div className="hero__overlay" />

      <div className="hero__content">
        {/* Full text always in the DOM for SEO/accessibility */}
        <h1 className="hero__heading" aria-label={HEADLINE}>
          <span aria-hidden="true">
            {prefersReducedMotion ? HEADLINE : displayed}
            {!prefersReducedMotion && !done && <span className="hero__cursor" />}
          </span>
        </h1>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: prefersReducedMotion ? 0 : 1.6, duration: 0.5 }}
        >
          <Link to="/menu" className="hero__button">
            Browse range
          </Link>
        </motion.div>
      </div>
    </section>
  );
}