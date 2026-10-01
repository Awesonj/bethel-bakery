import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import MobileNav from "./MobileNav";
import AccountMenu from "./AccountMenu";
import logo from "../../assets/logo.png";
import "./Header.css";

const NAV_LINKS = [
  { label: "Home", to: "/" },
  { label: "Bakery Shop", to: "/menu" },
  { label: "About", to: "/about" },
  { label: "Delivery", to: "/delivery" },
  { label: "Enquiries", to: "/enquiry" },
  { label: "Account", to: "/account" },
];

export default function Header() {
  const { itemCount } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="site-header">
      <Link to="/" className="site-header__logo">
        <img src={logo} alt="Bethel Bakery" />
      </Link>

      <nav className="site-header__nav site-header__nav--desktop">
        {NAV_LINKS.map((link) => (
          <Link key={link.to} to={link.to}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="site-header__actions">
        <div className="site-header__account">
          <AccountMenu />
        </div>

        <Link to="/cart" className="site-header__cart" aria-label="Cart">
          🛒
          {itemCount > 0 && (
            <span className="site-header__cart-count">{itemCount}</span>
          )}
        </Link>

        <button
          className="site-header__hamburger"
          aria-label="Open menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          ☰
        </button>
      </div>

      <MobileNav
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        links={NAV_LINKS}
      />
    </header>
  );
}