import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { createOrder } from "../../firebase/orders";
import { decrementStock } from "../../firebase/menu";
import "./Checkout.css";

export default function Checkout() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [fulfilment, setFulfilment] = useState("collection");
  const [paymentMethod, setPaymentMethod] = useState("collection");
  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState(user?.email || "");
  const [phone, setPhone] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [collectionDate, setCollectionDate] = useState("");
  const [placing, setPlacing] = useState(false);

  if (items.length === 0) {
    return (
      <div className="checkout-page">
        <p className="checkout-page__empty">
          Your cart is empty. Add something from the menu before checking out.
        </p>
      </div>
    );
  }

  const minDate = new Date();
  minDate.setHours(minDate.getHours() + 48);
  const minDateString = minDate.toISOString().split("T")[0];

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setPlacing(true);

    try {
      const orderId = await createOrder({
        items: items.map((i) => ({
          id: i.id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
        })),
        fulfilment,
        paymentMethod,
        customerName,
        email,
        phone,
        deliveryAddress: fulfilment === "delivery" ? deliveryAddress : null,
        collectionDate: fulfilment === "collection" ? collectionDate : null,
      });

      // Reserve/deduct stock at the point of order
      await Promise.all(
        items.map((i) => decrementStock(i.id, i.quantity))
      );

      clearCart();
      navigate(`/order-confirmation?id=${orderId}`);
    } catch (err) {
      alert("Something went wrong placing your order. Please try again.");
      setPlacing(false);
    }
  };

  return (
    <div className="checkout-page">
      <h1 className="checkout-page__heading">Checkout</h1>

      <form className="checkout-form" onSubmit={handlePlaceOrder}>
        <section className="checkout-section">
          <h2>Collection or delivery</h2>
          <div className="checkout-radio-group">
            <label>
              <input
                type="radio"
                name="fulfilment"
                value="collection"
                checked={fulfilment === "collection"}
                onChange={() => setFulfilment("collection")}
              />
              Collection (West Midlands)
            </label>
            <label>
              <input
                type="radio"
                name="fulfilment"
                value="delivery"
                checked={fulfilment === "delivery"}
                onChange={() => setFulfilment("delivery")}
              />
              Royal Mail delivery
            </label>
          </div>

          {fulfilment === "collection" ? (
            <label className="checkout-field">
              Collection date (48 hours notice required)
              <input
                type="date"
                min={minDateString}
                value={collectionDate}
                onChange={(e) => setCollectionDate(e.target.value)}
                required
              />
            </label>
          ) : (
            <label className="checkout-field">
              Delivery address
              <textarea
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                rows={3}
                required
              />
            </label>
          )}
        </section>

        <section className="checkout-section">
          <h2>Your details</h2>
          <label className="checkout-field">
            Full name
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </label>
          <label className="checkout-field">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="checkout-field">
            Phone
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </label>
        </section>

        <section className="checkout-section">
          <h2>Payment</h2>
          <div className="checkout-radio-group">
            <label>
              <input
                type="radio"
                name="payment"
                value="online"
                checked={paymentMethod === "online"}
                onChange={() => setPaymentMethod("online")}
              />
              Pay online now
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="collection"
                checked={paymentMethod === "collection"}
                onChange={() => setPaymentMethod("collection")}
              />
              Pay on collection
            </label>
          </div>
          {paymentMethod === "online" && (
            <p className="checkout-note">
              Online card payment will be enabled once payments are connected.
              For now this order will be recorded and payment collected in
              person.
            </p>
          )}
        </section>

        <section className="checkout-section">
          <h2>Order summary</h2>
          <div className="checkout-summary-lines">
            {items.map((item) => (
              <div key={item.id} className="checkout-summary-line">
                <span>
                  {item.quantity} x {item.name}
                </span>
                <span>£{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          <div className="checkout-summary-total">
            <span>Total</span>
            <span>£{subtotal.toFixed(2)}</span>
          </div>
        </section>

        <button
          type="submit"
          className="checkout-page__submit"
          disabled={placing}
        >
          {placing ? "Placing order..." : "Place order"}
        </button>
      </form>
    </div>
  );
}