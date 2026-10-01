import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useMenuItems } from "../../hooks/useMenuItems";
import { CATEGORIES } from "../../components/home/categoryData";
import ItemCard from "../../components/menu/ItemCard";
import "./Menu.css";

export default function Menu() {
  const { items, loading } = useMenuItems();
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeCategory, setActiveCategory] = useState(
    searchParams.get("category") || "All"
  );

  useEffect(() => {
    const urlCategory = searchParams.get("category");
    if (urlCategory) {
      setActiveCategory(urlCategory);
    }
  }, [searchParams]);

  const handleCategoryClick = (categoryId) => {
    setActiveCategory(categoryId);
    if (categoryId === "All") {
      setSearchParams({});
    } else {
      setSearchParams({ category: categoryId });
    }
  };

  const visibleItems =
    activeCategory === "All"
      ? items
      : items.filter((item) => item.category === activeCategory);

  return (
    <div className="menu-page">
      <h1 className="menu-page__heading">Bakery Shop</h1>

      {/* Mobile: dropdown filter */}
      <div className="menu-page__filter-mobile">
        <select
          value={activeCategory}
          onChange={(e) => handleCategoryClick(e.target.value)}
        >
          <option value="All">All</option>
          {CATEGORIES.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Tablet/desktop: pill buttons */}
      <div className="menu-page__filter">
        <button
          className={
            activeCategory === "All"
              ? "menu-page__filter-btn menu-page__filter-btn--active"
              : "menu-page__filter-btn"
          }
          onClick={() => handleCategoryClick("All")}
        >
          All
        </button>
        {CATEGORIES.map((cat) => (
          <button
            key={cat.id}
            className={
              activeCategory === cat.id
                ? "menu-page__filter-btn menu-page__filter-btn--active"
                : "menu-page__filter-btn"
            }
            onClick={() => handleCategoryClick(cat.id)}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {loading && <p className="menu-page__status">Loading menu...</p>}

      {!loading && visibleItems.length === 0 && (
        <p className="menu-page__status">
          No items available in this category right now.
        </p>
      )}

      <div className="menu-page__grid">
        {visibleItems.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}