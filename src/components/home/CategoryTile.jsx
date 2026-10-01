import { Link } from "react-router-dom";
import "./CategoryTile.css";

export default function CategoryTile({ category }) {
  return (
    <Link
      to={`/menu?category=${category.id}`}
      className="category-tile"
    >
      {category.image ? (
        <img src={category.image} alt={category.name} />
      ) : (
        <div className="category-tile__placeholder" />
      )}
      <div className="category-tile__overlay" />
      <span className="category-tile__name">{category.name}</span>
    </Link>
  );
}