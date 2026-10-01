import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./About.css";

export default function About() {
  return (
    <div className="about-page">
      <div className="about-hero">
        <motion.div
          className="about-hero__image-wrap"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          <div className="about-hero__frame" />
          <div className="about-hero__photo-placeholder">
            <span>Photo coming soon</span>
          </div>
          <span className="about-hero__badge">Handmade in Sutton Coldfield</span>
        </motion.div>

        <motion.div
          className="about-hero__content"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <span className="about-hero__label">Meet the baker</span>
          <h1 className="about-hero__name">Ola</h1>
          <div className="about-hero__divider" />

          <p>
            Hi my name is Ola, a Medical Doctor turned baker, blending
            precision and artistry to create edible works of art. Based in
            Sutton Coldfield, West Midlands.
          </p>

          <p>
            Our journey began with making bespoke wedding &amp; celebration
            cakes adorned with intricate, hand-crafted sugar flowers &amp;
            models designed for life's biggest celebrations which soon
            blossomed into something much greater.
          </p>

          <p>
            We realised that life isn't just about grand celebrations; it's
            about cherishing the little moments too. Birthdays,
            anniversaries, and weddings will always be special, but why wait
            for those big days to indulge in something special?
          </p>

          <p>
            That's when we decided to expand our craft to not only make
            exquisite custom cakes but also to create everyday baked goods
            that bring warmth and happiness to your table.
          </p>

          <p className="about-hero__quote">
            At the heart of everything we bake is the belief that food
            connects us all together. Every bake, every pastry, every slice
            of cake is made with love, care and a deep desire to make your
            ordinary days extraordinary. From our hands to your home, let's
            celebrate the beauty of both the everyday and the extraordinary.
          </p>

          <h2 className="about-hero__subheading">
            Here for your next celebrations...
          </h2>

          <p>
            Whether it's a wedding, birthday, graduation, or any other
            special event, we take delight in turning your vision into a
            beautiful, delicious reality, because life's most cherished
            moments deserve nothing less. We're overjoyed not only by the
            beauty of each product but also by the taste that makes each
            bite unforgettable.
          </p>

          <p className="about-hero__closing">
            We look forward to helping you create something extraordinary
            for your next event!
          </p>

          <div className="about-hero__actions">
            <Link to="/menu" className="about-hero__button">
              Browse range
            </Link>
            <Link to="/enquiry" className="about-hero__button about-hero__button--outline">
              Enquire about a bespoke cake
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}