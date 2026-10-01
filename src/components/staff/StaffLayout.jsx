import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { logoutStaff } from "../../firebase/auth";
import { useAuth } from "../../context/AuthContext";
import StaffTopBar from "./StaffTopBar";
import logo from "../../assets/logo.png";
import "./StaffLayout.css";

export default function StaffLayout() {
  const [productsOpen, setProductsOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, staffName } = useAuth();

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <div className="staff-layout">
      {sidebarOpen && (
        <div className="staff-sidebar-overlay" onClick={closeSidebar} />
      )}

      <aside className={sidebarOpen ? "staff-sidebar staff-sidebar--open" : "staff-sidebar"}>
        <img src={logo} alt="Bethel Bakery" className="staff-sidebar__logo" />

        <div className="staff-sidebar__brand">
          {staffName || user?.email || "Staff"}
        </div>

        <nav className="staff-sidebar__nav">
          <Link
            to="/staff/sell"
            className="staff-sidebar__link staff-sidebar__link--top"
            onClick={closeSidebar}
          >
            Sell Item
          </Link>

          <button
            className="staff-sidebar__section-toggle"
            onClick={() => setProductsOpen((prev) => !prev)}
          >
            Products
            <span
              className={
                productsOpen
                  ? "staff-sidebar__chevron staff-sidebar__chevron--open"
                  : "staff-sidebar__chevron"
              }
            >
              v
            </span>
          </button>

          {productsOpen && (
            <div className="staff-sidebar__submenu">
              <Link to="/staff/products/add" onClick={closeSidebar}>
                Add Item
              </Link>
              <Link to="/staff/products/update" onClick={closeSidebar}>
                Update Item
              </Link>
            </div>
          )}

          <Link to="/staff/orders" className="staff-sidebar__link" onClick={closeSidebar}>
            Orders
          </Link>

          <Link to="/staff/enquiries" className="staff-sidebar__link" onClick={closeSidebar}>
            Enquiries
          </Link>
        </nav>

        <button className="staff-sidebar__logout" onClick={logoutStaff}>
          Log out
        </button>
      </aside>

      <div className="staff-content">
        <StaffTopBar onMenuClick={() => setSidebarOpen(true)} />
        <Outlet />
      </div>
    </div>
  );
}