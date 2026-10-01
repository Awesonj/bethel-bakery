import { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { getOrder } from "../../firebase/orders";
import "./OrderConfirmation.css";

export default function OrderConfirmation() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("id");

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!orderId) {
      setLoading(false);
      setError(true);
      return;
    }

    getOrder(orderId)
      .then((result) => {
        if (result) {
          setOrder(result);
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [orderId]);

  if (loading) {
    return <p className="order-confirmation__status">Loading your order...</p>;
  }

  if (error || !order) {
    return (
      <div className="order-confirmation">
        <p className="order-confirmation__status">
          We couldn't find that order. If you've just placed one, check your
          email for confirmation, or contact us if anything looks wrong.
        </p>
        <Link to="/menu" className="order-confirmation__button">
          Back to menu
        </Link>
      </div>
    );
  }

  const total = order.items?.reduce(
    (sum, line) => sum + line.price * line.quantity,
    0
  ) || 0;

  return (
    <div className="order-confirmation">
      <div className="order-confirmation__badge">✓</div>
      <h1 className="order-confirmation__heading">Order confirmed</h1>
      <p className="order-confirmation__sub">
        Thank you! Your order reference is
        <span className="order-confirmation__ref"> #{order.id.slice(-6).toUpperCase()}</span>
      </p>

      <div className="order-confirmation__card">
        <h2>Order summary</h2>
        <div className="order-confirmation__lines">
          {order.items?.map((line) => (
            <div key={line.id} className="order-confirmation__line">
              <span>
                {line.quantity} x {line.name}
              </span>
              <span>£{(line.price * line.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
        <div className="order-confirmation__total">
          <span>Total</span>
          <span>£{total.toFixed(2)}</span>
        </div>
      </div>

      <div className="order-confirmation__card">
        <h2>{order.fulfilment === "delivery" ? "Delivery" : "Collection"} details</h2>
        <p>{order.customerName}</p>
        {order.fulfilment === "collection" ? (
          <>
            <p>12 Walmley Close, Sutton Coldfield, West Midlands, UK</p>
            <p>Collection date: {order.collectionDate || "To be confirmed"}</p>
          </>
        ) : (
          <p>Delivery address: {order.deliveryAddress || "To be confirmed"}</p>
        )}
        <p>
          Payment: {order.paymentMethod === "online" ? "Paid online" : "Pay on collection"}
        </p>
      </div>

      <Link to="/menu" className="order-confirmation__button">
        Continue browsing
      </Link>
    </div>
  );
}