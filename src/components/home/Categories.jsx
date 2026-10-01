import { CATEGORIES } from "./categoryData";
import CategoryTile from "./CategoryTile";
import "./Categories.css";

export default function Categories() {
  return (
    <section className="categories">
      <h2 className="categories__heading">Shop by category</h2>

      <div className="categories__grid">
        {CATEGORIES.map((category) => (
          <CategoryTile key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
}