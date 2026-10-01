import { useState, useEffect } from "react";
import { listenToOrders, updateOrderStatus } from "../../../firebase/orders";
import "./Orders.css";

const STATUSES = ["new", "preparing", "ready", "completed", "cancelled"];
const STATUS_TABS = ["all", ...STATUSES];
const SOURCE_TABS = ["all", "online", "in-store"];

function getSource(order) {
  return order.source || "online";
}

function getTotal(order) {
  return (
    order.items?.reduce((sum, line) => sum + line.price * line.quantity, 0) || 0
  );
}

function isToday(timestamp) {
  if (!timestamp?.toDate) return false;
  const date = timestamp.toDate();
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sourceFilter, setSourceFilter] = useState("all");

  useEffect(() => {
    const unsubscribe = listenToOrders(setOrders);
    return unsubscribe;
  }, []);

  const visibleOrders = orders.filter((order) => {
    const statusMatch = statusFilter === "all" || order.status === statusFilter;
    const sourceMatch =
      sourceFilter === "all" || getSource(order) === sourceFilter;
    return statusMatch && sourceMatch;
  });

  const todaysTakings = orders
    .filter((o) => isToday(o.createdAt) && o.status !== "cancelled")
    .reduce((sum, o) => sum + getTotal(o), 0);

  const handleStatusChange = (orderId, status) => {
    updateOrderStatus(orderId, status);
  };

  return (
    <div className="staff-orders">
      <div className="staff-orders__header">
        <h1 className="staff-orders__heading">Orders</h1>
        <div className="staff-orders__takings">
          <span className="staff-orders__takings-label">Today's sales</span>
          <span className="staff-orders__takings-value">
            £{todaysTakings.toFixed(2)}
          </span>
        </div>
      </div>

      <div className="staff-orders__tabs">
        {SOURCE_TABS.map((tab) => (
          <button
            key={tab}
            className={
              sourceFilter === tab
                ? "staff-orders__tab staff-orders__tab--source-active"
                : "staff-orders__tab"
            }
            onClick={() => setSourceFilter(tab)}
          >
            {tab === "in-store"
              ? "In-store"
              : tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="staff-orders__tabs">
        {STATUS_TABS.map((tab) => (
          <button
            key={tab}
            className={
              statusFilter === tab
                ? "staff-orders__tab staff-orders__tab--active"
                : "staff-orders__tab"
            }
            onClick={() => setStatusFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {visibleOrders.length === 0 && (
        <p className="staff-orders__empty">No orders here right now.</p>
      )}

      <div className="staff-orders__list">
        {visibleOrders.map((order) => {
          const source = getSource(order);
          const total = getTotal(order);
          const isInStore = source === "in-store";

          return (
            <div key={order.id} className="order-card">
              <div className="order-card__top">
                <div>
                  <span className="order-card__ref">
                    #{order.id.slice(-6).toUpperCase()}
                    <span
                      className={
                        isInStore
                          ? "order-card__source order-card__source--instore"
                          : "order-card__source order-card__source--online"
                      }
                    >
                      {isInStore ? "In-store" : "Online"}
                    </span>
                  </span>
                  <span className="order-card__customer">
                    {isInStore
                      ? "Sold by " + (order.soldBy || "staff")
                      : order.customerName}
                  </span>
                </div>
                <span
                  className={"order-card__status order-card__status--" + order.status}
                >
                  {order.status}
                </span>
              </div>

              {!isInStore && (
                <div className="order-card__details">
                  <span>
                    {order.fulfilment === "delivery" ? "Delivery" : "Collection"}
                    {order.collectionDate ? " - " + order.collectionDate : ""}
                  </span>
                  <span>
                    {order.paymentMethod === "online"
                      ? "Paid online"
                      : "Pay on collection"}
                  </span>
                  {order.email && <span>{order.email}</span>}
                  {order.phone && <span>{order.phone}</span>}
                </div>
              )}

              <div className="order-card__lines">
                {order.items?.map((line, i) => (
                  <div key={i} className="order-card__line">
                    <span>
                      {line.quantity} x {line.name}
                    </span>
                    <span>£{(line.price * line.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="order-card__footer">
                <span className="order-card__total">
                  Total: £{total.toFixed(2)}
                </span>

                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order.id, e.target.value)}
                  className="order-card__status-select"
                >
                  {STATUSES.map((status) => (
                    <option key={status} value={status}>
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}