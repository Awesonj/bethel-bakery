import { useState, useEffect } from "react";
import { listenToMenuItems, decrementStock } from "../../../firebase/menu";
import { createOrder } from "../../../firebase/orders";
import { useAuth } from "../../../context/AuthContext";
import CategoryGrid from "../../../components/staff/CategoryGrid";
import StaffModal from "../../../components/staff/StaffModal";
import "./SellItem.css";

export default function SellItem() {
  const { user, staffName } = useAuth();
  const [items, setItems] = useState([]);
  const [activeCategory, setActiveCategory] = useState(null);
  const [selection, setSelection] = useState({});
  const [order, setOrder] = useState([]);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const unsubscribe = listenToMenuItems(setItems);
    return unsubscribe;
  }, []);

  const categoryItems = items.filter(
    (item) => item.category === activeCategory && !item.soldOut && item.stock > 0
  );

  const openCategory = (category) => {
    setActiveCategory(category);
    setSelection({});
  };

  const closeModal = () => {
    setActiveCategory(null);
    setSelection({});
  };

  const setQty = (item, qty) => {
    const clamped = Math.max(0, Math.min(qty, item.stock));
    setSelection((prev) => ({ ...prev, [item.id]: clamped }));
  };

  const handleAddOrder = () => {
    setOrder((prev) => {
      const next = [...prev];
      Object.entries(selection).forEach(([itemId, qty]) => {
        if (qty <= 0) return;
        const item = categoryItems.find((i) => i.id === itemId);
        if (!item) return;

        const existingIndex = next.findIndex((line) => line.id === itemId);
        if (existingIndex >= 0) {
          next[existingIndex] = {
            ...next[existingIndex],
            quantity: next[existingIndex].quantity + qty,
          };
        } else {
          next.push({ id: itemId, name: item.name, price: item.price, quantity: qty });
        }
      });
      return next;
    });

    closeModal();
  };

  const adjustOrderLine = (id, delta) => {
    setOrder((prev) =>
      prev
        .map((line) =>
          line.id === id ? { ...line, quantity: line.quantity + delta } : line
        )
        .filter((line) => line.quantity > 0)
    );
  };

  const total = order.reduce((sum, line) => sum + line.price * line.quantity, 0);

  const handlePaymentMade = async () => {
    if (order.length === 0 || processing) return;
    setProcessing(true);

    try {
      // 1. Record the sale so it shows up on the Orders page
      await createOrder({
        source: "in-store",
        status: "completed",
        fulfilment: "in-store",
        paymentMethod: "in-store",
        customerName: "In-store sale",
        email: "",
        phone: "",
        soldBy: staffName || user?.email || "Staff",
        items: order.map((line) => ({
          id: line.id,
          name: line.name,
          price: line.price,
          quantity: line.quantity,
        })),
      });

      // 2. Deduct stock for everything that was sold
      await Promise.all(
        order.map((line) => decrementStock(line.id, line.quantity))
      );

      alert(`Payment confirmed: £${total.toFixed(2)}`);
      setOrder([]);
    } catch (err) {
      alert("Something went wrong recording this sale. Please check and try again.");
    } finally {
      setProcessing(false);
    }
  };

  const handleCancelOrder = () => setOrder([]);

  const selectedCount = Object.values(selection).reduce((sum, q) => sum + q, 0);

  return (
    <div className="sell-item">
      <h1 className="sell-item__heading">Sell Item</h1>

      <CategoryGrid onSelect={openCategory} />

      {activeCategory && (
        <StaffModal title={activeCategory} onClose={closeModal}>
          {categoryItems.length === 0 && (
            <p className="sell-item__empty">No items available in this category.</p>
          )}

          <div className="sell-item__item-grid">
            {categoryItems.map((item) => {
              const qty = selection[item.id] || 0;
              return (
                <div key={item.id} className="sell-item__item-box">
                  {item.image ? (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="sell-item__item-image"
                    />
                  ) : (
                    <div className="sell-item__item-image" />
                  )}
                  <span className="sell-item__item-name">{item.name}</span>
                  <span className="sell-item__item-price">£{item.price.toFixed(2)}</span>

                  <div className="sell-item__card-stepper">
                    <button
                      className="sell-item__stepper-btn"
                      onClick={() => setQty(item, qty - 1)}
                      disabled={qty === 0}
                    >
                      −
                    </button>
                    <span className="sell-item__stepper-value">{qty}</span>
                    <button
                      className="sell-item__stepper-btn"
                      onClick={() => setQty(item, qty + 1)}
                      disabled={qty >= item.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            className="sell-item__add-order"
            onClick={handleAddOrder}
            disabled={selectedCount === 0}
          >
            Add Order {selectedCount > 0 ? "(" + selectedCount + ")" : ""}
          </button>
        </StaffModal>
      )}

      {order.length > 0 && (
        <div className="sell-item__bar">
          <div className="sell-item__order-lines">
            {order.map((line) => (
              <div key={line.id} className="sell-item__order-line">
                <span className="sell-item__order-name">{line.name}</span>
                <div className="sell-item__order-stepper">
                  <button
                    className="sell-item__stepper-btn"
                    onClick={() => adjustOrderLine(line.id, -1)}
                  >
                    −
                  </button>
                  <span className="sell-item__stepper-value">{line.quantity}</span>
                  <button
                    className="sell-item__stepper-btn"
                    onClick={() => adjustOrderLine(line.id, 1)}
                  >
                    +
                  </button>
                </div>
                <span className="sell-item__order-subtotal">
                  £{(line.price * line.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div className="sell-item__totals">
            <span className="sell-item__total">Total: £{total.toFixed(2)}</span>
            <div className="sell-item__actions">
              <button className="sell-item__cancel" onClick={handleCancelOrder}>
                Cancel Order
              </button>
              <button
                className="sell-item__pay"
                onClick={handlePaymentMade}
                disabled={processing}
              >
                {processing ? "Processing..." : "Payment Made"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}