import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import "./Cart.css";

export default function Cart() {
  const { items, subtotal, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (items.length === 0) {
    return (
      <div className="cart-page cart-page--empty">
        <h1>Your cart is empty</h1>
        <p>Take a look at what's fresh today.</p>
        <Link to="/menu" className="cart-page__button">
          Browse menu
        </Link>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <h1 className="cart-page__heading">Your cart</h1>

      <div className="cart-page__lines">
        {items.map((item) => (
          <div key={item.id} className="cart-line">
            <div className="cart-line__image">
              {item.image ? (
                <img src={item.image} alt={item.name} />
              ) : (
                <div className="cart-line__placeholder" />
              )}
            </div>

            <div className="cart-line__info">
              <span className="cart-line__name">{item.name}</span>
              <span className="cart-line__price">£{item.price.toFixed(2)}</span>
            </div>

            <div className="cart-line__stepper">
              <button
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                aria-label={`Decrease ${item.name}`}
              >
                −
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                disabled={item.quantity >= item.stock}
                aria-label={`Increase ${item.name}`}
              >
                +
              </button>
            </div>

            <span className="cart-line__subtotal">
              £{(item.price * item.quantity).toFixed(2)}
            </span>

            <button
              className="cart-line__remove"
              onClick={() => removeItem(item.id)}
              aria-label={`Remove ${item.name}`}
            >
              Remove
            </button>
          </div>
        ))}
      </div>

      <div className="cart-page__summary">
        <div className="cart-page__subtotal">
          <span>Subtotal</span>
          <span>£{subtotal.toFixed(2)}</span>
        </div>
        <button
          className="cart-page__checkout"
          onClick={() => navigate("/checkout")}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}