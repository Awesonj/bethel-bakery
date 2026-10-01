import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getOrdersByEmail } from "../../firebase/orders";
import { logoutStaff } from "../../firebase/auth";
import "./Account.css";

export default function Account() {
  const { user, loading: authLoading } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoadingOrders(false);
      return;
    }

    getOrdersByEmail(user.email)
      .then(setOrders)
      .finally(() => setLoadingOrders(false));
  }, [user]);

  if (authLoading) {
    return <p className="account-page__status">Loading...</p>;
  }

  if (!user) {
    return (
      <div className="account-page">
        <div className="account-page__prompt">
          <h1>Your account</h1>
          <p>Log in or create an account to view your order history.</p>
          <div className="account-page__prompt-actions">
            <Link to="/login" className="account-page__button">
              Log in
            </Link>
            <Link to="/signup" className="account-page__button account-page__button--outline">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="account-page">
      <div className="account-page__profile">
        <h1>My Account</h1>
        <p className="account-page__email">{user.email}</p>
        <button className="account-page__logout" onClick={logoutStaff}>
          Log out
        </button>
      </div>

      <h2 className="account-page__section-heading">Order history</h2>

      {loadingOrders && <p className="account-page__status">Loading orders...</p>}

      {!loadingOrders && orders.length === 0 && (
        <p className="account-page__status">
          You haven't placed any orders yet.{" "}
          <Link to="/menu">Browse the menu</Link> to get started.
        </p>
      )}

      <div className="account-page__orders">
        {orders.map((order) => {
          const total = order.items?.reduce(
            (sum, line) => sum + line.price * line.quantity,
            0
          ) || 0;

          return (
            <Link
              key={order.id}
              to={`/order-confirmation?id=${order.id}`}
              className="account-order"
            >
              <div className="account-order__info">
                <span className="account-order__ref">
                  #{order.id.slice(-6).toUpperCase()}
                </span>
                <span className="account-order__status">{order.status}</span>
              </div>
              <span className="account-order__total">£{total.toFixed(2)}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}