import { useState, useEffect } from "react";
import { listenToMenuItems, updateMenuItem, incrementStock } from "../../../firebase/menu";
import CategoryGrid from "../../../components/staff/CategoryGrid";
import StaffModal from "../../../components/staff/StaffModal";
import "./UpdateItem.css";

export default function UpdateItem() {
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [addAmounts, setAddAmounts] = useState({});
  const [saleDrafts, setSaleDrafts] = useState({});

  useEffect(() => {
    const unsubscribe = listenToMenuItems(setItems);
    return unsubscribe;
  }, []);

  const categoryItems = items.filter((item) => item.category === activeCategory);

  const handleAddStock = async (item) => {
    const amount = parseInt(addAmounts[item.id], 10);
    if (!amount || amount <= 0) return;

    await incrementStock(item.id, amount);
    await updateMenuItem(item.id, { soldOut: false });
    setAddAmounts((prev) => ({ ...prev, [item.id]: "" }));
  };

  const handleSetSoldOut = (item, soldOut) => {
    updateMenuItem(item.id, { soldOut });
  };

  const handleToggleSale = (item) => {
    updateMenuItem(item.id, { onSale: !item.onSale });
  };

  const handleSaveSaleText = (item) => {
    const text = saleDrafts[item.id] ?? item.saleText ?? "";
    updateMenuItem(item.id, { saleText: text });
  };

  return (
    <div className="update-item">
      <h1 className="update-item__heading">Update Item</h1>

      <CategoryGrid onSelect={setActiveCategory} />

      {activeCategory && (
        <StaffModal title={activeCategory} onClose={() => setActiveCategory(null)}>
          {categoryItems.length === 0 && (
            <p className="update-item__empty">No items in this category yet.</p>
          )}

          <div className="update-item__list">
            {categoryItems.map((item) => (
              <div key={item.id} className="update-item__card">
                <div className="update-item__info">
                  <span className="update-item__name">{item.name}</span>
                  <span className="update-item__price">£{item.price?.toFixed(2)}</span>
                </div>

                <div className="update-item__stock">
                  <span className="update-item__stock-label">
                    Available: <strong>{item.stock ?? 0}</strong>
                  </span>

                  <input
                    type="number"
                    min="1"
                    placeholder="Add qty"
                    className="update-item__stock-input"
                    value={addAmounts[item.id] || ""}
                    onChange={(e) =>
                      setAddAmounts((prev) => ({ ...prev, [item.id]: e.target.value }))
                    }
                  />
                  <button
                    className="update-item__stock-add"
                    onClick={() => handleAddStock(item)}
                  >
                    Add stock
                  </button>
                </div>

                <div className="update-item__toggles">
                  <label className="update-item__toggle">
                    <input
                      type="checkbox"
                      checked={!!item.soldOut}
                      onChange={(e) => handleSetSoldOut(item, e.target.checked)}
                    />
                    Sold out / hidden
                  </label>

                  <label className="update-item__toggle">
                    <input
                      type="checkbox"
                      checked={!!item.onSale}
                      onChange={() => handleToggleSale(item)}
                    />
                    On sale
                  </label>
                </div>

                {item.onSale && (
                  <div className="update-item__sale-text">
                    <input
                      type="text"
                      placeholder="e.g. Buy 5 get 1 free"
                      value={saleDrafts[item.id] ?? item.saleText ?? ""}
                      onChange={(e) =>
                        setSaleDrafts((prev) => ({ ...prev, [item.id]: e.target.value }))
                      }
                    />
                    <button onClick={() => handleSaveSaleText(item)}>Save</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </StaffModal>
      )}
    </div>
  );
}