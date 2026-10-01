import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import RequireStaff from "./components/staff/RequireStaff";
import StaffLayout from "./components/staff/StaffLayout";
import StaffSellItem from "./pages/staff/SellItem";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import About from "./pages/About";
import Delivery from "./pages/Delivery";
import Enquiry from "./pages/Enquiry";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Redirecting from "./pages/Redirecting";
import NotFound from "./pages/NotFound";
import StaffUpdateItem from "./pages/staff/UpdateItem";
import StaffDashboard from "./pages/staff/Dashboard";
import StaffAddItem from "./pages/staff/MenuManager";
import StaffOrders from "./pages/staff/Orders";
import StaffEnquiries from "./pages/staff/Enquiries";

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route
              path="/staff/*"
              element={
                <RequireStaff>
                  <StaffLayout />
                </RequireStaff>
              }
            >
              <Route index element={<Navigate to="sell" replace />} />
              <Route path="sell" element={<StaffSellItem />} />
              <Route path="dashboard" element={<StaffDashboard />} />
              <Route path="products/add" element={<StaffAddItem />} />
              <Route path="products/update" element={<StaffUpdateItem />} />
              <Route path="orders" element={<StaffOrders />} />
              <Route path="enquiries" element={<StaffEnquiries />} />
            </Route>

            <Route
              path="*"
              element={
                <>
                  <Header />
                  <main>
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/menu" element={<Menu />} />
                      <Route path="/about" element={<About />} />
                      <Route path="/delivery" element={<Delivery />} />
                      <Route path="/enquiry" element={<Enquiry />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/order-confirmation" element={<OrderConfirmation />} />
                      <Route path="/account" element={<Account />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/signup" element={<SignUp />} />
                      <Route path="/redirecting" element={<Redirecting />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}