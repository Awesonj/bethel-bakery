import { motion } from "framer-motion";
import "./CollectionContact.css";

const ADDRESS_LINE_1 = "12 Walmley Close";
const ADDRESS_LINE_2 = "Sutton Coldfield, Birmingham";
const ADDRESS_LINE_3 = "West Midlands, UK";
const PHONE_DISPLAY = "0121 000 0000";
const PHONE_TEL = "+441210000000";
const EMAIL = "hello@bethelbakery.co.uk";
const GOOGLE_MAPS_URL = "https://www.google.com/maps/search/?api=1&query=12+Walmley+Close+Sutton+Coldfield";
const GOOGLE_MAPS_EMBED_URL = "https://maps.google.com/maps?q=12+Walmley+Close+Sutton+Coldfield&output=embed";

const HOURS = [
  { day: "Monday", time: "Closed" },
  { day: "Tuesday - Friday", time: "9:00am - 5:00pm" },
  { day: "Saturday", time: "9:00am - 4:00pm" },
  { day: "Sunday", time: "Closed" },
];

export default function CollectionContact() {
  return (
    <section className="collection-contact">
      <motion.div
        className="collection-contact__info"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="collection-contact__heading">Visit or get in touch</h2>

        <address className="collection-contact__address">
          {ADDRESS_LINE_1}
          <br />
          {ADDRESS_LINE_2}
          <br />
          {ADDRESS_LINE_3}
        </address>

        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="collection-contact__directions"
        >
          Get directions
        </a>

        <div className="collection-contact__hours">
          <h3>Opening hours</h3>
          <ul>
            {HOURS.map((entry) => (
              <li key={entry.day}>
                <span>{entry.day}</span>
                <span>{entry.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="collection-contact__links">
          <a href={"tel:" + PHONE_TEL} className="collection-contact__link">
            Call: {PHONE_DISPLAY}
          </a>

          <a href={"mailto:" + EMAIL} className="collection-contact__link">
            Email: {EMAIL}
          </a>
        </div>
      </motion.div>

      <motion.div
        className="collection-contact__map"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <iframe
          className="collection-contact__map-frame"
          src={GOOGLE_MAPS_EMBED_URL}
          title="Bethel Bakery location"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <a
          href={GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="collection-contact__map-link"
        >
          Open in Google Maps
        </a>
      </motion.div>
    </section>
  );
}
