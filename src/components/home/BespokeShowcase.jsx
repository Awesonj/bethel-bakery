import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bespokeImage from "../../assets/bespoke-cake.jpg";
import "./BespokeShowcase.css";

export default function BespokeShowcase() {
  return (
    <section className="bespoke-showcase">
      <motion.div
        className="bespoke-showcase__image-wrap"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={bespokeImage}
          alt="A bespoke celebration cake by Bethel Bakery"
          className="bespoke-showcase__image"
        />
      </motion.div>

      <motion.div
        className="bespoke-showcase__content"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <h2 className="bespoke-showcase__heading">
          Bespoke &amp; Wedding Cakes
        </h2>
        <p className="bespoke-showcase__text">
          From intimate celebrations to your big day, every bespoke cake is
          designed around your vision, handcrafted with care and finished
          with fine detail.
        </p>
        <Link to="/enquiry" className="bespoke-showcase__button">
          Enquire about a bespoke cake
        </Link>
      </motion.div>
    </section>
  );
}