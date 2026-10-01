export default function QuantityControl({ quantity, stock, onChange }) {
  const decrease = () => onChange(Math.max(0, quantity - 1));
  const increase = () => onChange(Math.min(stock, quantity + 1));

  return (
    <div className="quantity-control">
      <button
        onClick={decrease}
        disabled={quantity === 0}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <span className="quantity-control__value">{quantity}</span>
      <button
        onClick={increase}
        disabled={quantity >= stock}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}