import { Link } from "react-router-dom";
import logo from "../../assets/bethel-bakery-logo.png";
import "./Footer.css";

const INSTAGRAM_URL = "https://instagram.com/bethelbakery";
const FACEBOOK_URL = "https://facebook.com/bethelbakery";

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="site-footer">
      <div className="site-footer__top">
        <img src={logo} alt="Bethel Bakery" className="site-footer__logo" />

        <nav className="site-footer__links">
          <Link to="/menu">Bakery Shop</Link>
          <Link to="/about">About</Link>
          <Link to="/delivery">Delivery</Link>
          <Link to="/enquiry">Enquiries</Link>
        </nav>

        <div className="site-footer__socials">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            IG
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            FB
          </a>
        </div>
      </div>

      <div className="site-footer__bottom">
        <span>Copyright (c) {year} Bethel Bakery</span>

        <div className="site-footer__legal">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookies">Cookies</Link>
        </div>

        <button
          className="site-footer__top-button"
          onClick={scrollToTop}
          aria-label="Back to top"
        >
          Back to top
        </button>
      </div>
    </footer>
  );
}