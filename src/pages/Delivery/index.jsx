import { motion } from "framer-motion";
import logo from "../../assets/logo.png";
import "./Delivery.css";

export default function Delivery() {
  return (
    <div className="delivery-page">
      <div className="delivery-banner">
        <motion.div
          className="delivery-banner__pattern"
          animate={{ x: [0, 20, 0], y: [0, 10, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        />
        <img src={logo} alt="Bethel Bakery" className="delivery-banner__logo" />
        <h1 className="delivery-banner__title">Delivery</h1>
      </div>

      <div className="delivery-content">
        <motion.p
          className="delivery-intro"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          At Bethel Bakery, we aim to make your experience as smooth as
          possible. Here's all you need to know about our delivery and
          collection services:
        </motion.p>

        <motion.section
          className="delivery-block"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h2>Minimum order notice for Next Day Delivery</h2>
          <p>48 hours minimum notice</p>
        </motion.section>

        <motion.section
          className="delivery-block"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h2>Collection</h2>
          <p>
            Prefer to collect your order? If you are in the West Midlands,
            simply choose the collection option at checkout. After placing
            your order, you will receive an email with detailed instructions
            on how and when to collect your treats from our location on the
            date you selected.
          </p>
        </motion.section>

        <motion.section
          className="delivery-block"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h2>Delivery Options</h2>
          <p>
            We offer delivery via <strong>Royal Mail</strong> for your
            convenience at the moment.
          </p>
          <p>
            Please ensure someone is available to receive your order. If
            you're not home, you can arrange for collection from the nearest
            depot or nominate delivery to a neighbour.
          </p>
          <p>
            We are committed to ensuring that your treats arrive safely and
            promptly!
          </p>
          <span className="delivery-badge">DPD delivery coming soon</span>
        </motion.section>
      </div>
    </div>
  );
}