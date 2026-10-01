import { Link } from "react-router-dom";
import "./FilmFrame.css";

export default function FilmFrame({ item }) {
  return (
    <Link to="/menu" className="film-frame">
      {item.image ? (
        <img src={item.image} alt={item.name} />
      ) : (
        <div className="film-frame__placeholder" />
      )}
      <div className="film-frame__label">
        <span className="film-frame__name">{item.name}</span>
        <span className="film-frame__price">£{item.price.toFixed(2)}</span>
      </div>
    </Link>
  );
}