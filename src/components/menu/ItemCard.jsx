import { useState } from "react";
import { useCart } from "../../context/CartContext";
import "./ItemCard.css";

export default function ItemCard({ item }) {
  const { items, setItems } = useCart();
  const [selectedQty, setSelectedQty] = useState(1);
  const [justAdded, setJustAdded] = useState(false);

  const decrease = () => setSelectedQty((q) => Math.max(1, q - 1));
  const increase = () => setSelectedQty((q) => Math.min(item.stock, q + 1));

  const subtotal = item.price * selectedQty;

  const handleAddToCart = () => {
    setItems((prev) => {
      const existing = prev.find((line) => line.id === item.id);

      if (existing) {
        const newQty = Math.min(existing.quantity + selectedQty, item.stock);
        return prev.map((line) =>
          line.id === item.id ? { ...line, quantity: newQty } : line
        );
      }

      return [...prev, { ...item, quantity: selectedQty }];
    });

    setJustAdded(true);
    setSelectedQty(1);
    setTimeout(() => setJustAdded(false), 1500);
  };

  return (
    <div className="item-card">
      <div className="item-card__image">
        {item.image ? (
          <img src={item.image} alt={item.name} />
        ) : (
          <div className="item-card__placeholder" />
        )}
      </div>

      <div className="item-card__body">
        <h3 className="item-card__name">{item.name}</h3>
        <p className="item-card__price">£{item.price.toFixed(2)}</p>

        {item.stock <= 3 && item.stock > 0 && (
          <p className="item-card__low-stock">Only {item.stock} left</p>
        )}

        <div className="item-card__stepper">
          <button
            onClick={decrease}
            disabled={selectedQty <= 1}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span className="item-card__stepper-value">{selectedQty}</span>
          <button
            onClick={increase}
            disabled={selectedQty >= item.stock}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>

        <div className="item-card__footer">
          <span className="item-card__subtotal">£{subtotal.toFixed(2)}</span>
          <button
            className={
              justAdded
                ? "item-card__add item-card__add--added"
                : "item-card__add"
            }
            onClick={handleAddToCart}
            disabled={item.stock === 0}
          >
            {justAdded ? "Added ✓" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}