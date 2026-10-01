import { STAFF_CATEGORIES } from "./categoryData";
import "./CategoryGrid.css";

export default function CategoryGrid({ onSelect }) {
  return (
    <div className="staff-category-grid">
      {STAFF_CATEGORIES.map((category) => (
        <button
          key={category.name}
          className="staff-category-tile"
          onClick={() => onSelect(category.name)}
        >
          <img
            src={category.image}
            alt={category.name}
            className="staff-category-tile__image"
          />
          <span className="staff-category-tile__name">{category.name}</span>
        </button>
      ))}
    </div>
  );
}