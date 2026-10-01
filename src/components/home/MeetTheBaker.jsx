import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import bakerPhoto from "../../assets/baker-ola.jpg";
import "./MeetTheBaker.css";

export default function MeetTheBaker() {
  return (
    <section className="meet-baker">
      <motion.div
        className="meet-baker__image-wrap"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6 }}
      >
        <img
          src={bakerPhoto}
          alt="Ola, the baker behind Bethel Bakery"
          className="meet-baker__image"
        />
        <span className="meet-baker__badge">Handmade in Sutton Coldfield</span>
      </motion.div>

      <motion.div
        className="meet-baker__content"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <span className="meet-baker__label">Meet the baker</span>
        <h2 className="meet-baker__heading">Ola</h2>
        <p className="meet-baker__text">
          Hi, I'm Ola, a Medical Doctor turned baker, blending precision and
          artistry to create edible works of art. Based in Sutton Coldfield,
          West Midlands.
        </p>
        <Link to="/about" className="meet-baker__link">
          Read our story →
        </Link>
      </motion.div>
    </section>
  );
}