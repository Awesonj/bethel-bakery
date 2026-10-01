import { Link } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  return (
    <div className="not-found">
      <span className="not-found__icon">🥐</span>
      <h1 className="not-found__heading">Page not found</h1>
      <p className="not-found__text">
        Looks like this page got baked into something else. Let's get you
        back on track.
      </p>
      <div className="not-found__actions">
        <Link to="/" className="not-found__button">
          Back to home
        </Link>
        <Link to="/menu" className="not-found__button not-found__button--outline">
          Browse the menu
        </Link>
      </div>
    </div>
  );
}