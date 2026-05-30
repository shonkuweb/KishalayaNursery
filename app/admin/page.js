"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const initialOrders = [
  { id: "KN-1001", customer: "Arjun", total: "Rs. 349.00", status: "Pending" },
  { id: "KN-1002", customer: "Riya", total: "Rs. 799.00", status: "Packed" }
];

export default function AdminPage() {
  const [active, setActive] = useState("Orders");
  const [orders, setOrders] = useState(initialOrders);
  const [products, setProducts] = useState([]);
  const [settings, setSettings] = useState({
    supportPhone: "",
    supportEmail: "",
    minDeliveryQty: "1",
    deliveryCharge: "40"
  });

  useEffect(() => {
    const savedOrders = localStorage.getItem("admin-orders");
    const savedProducts = localStorage.getItem("admin-products");
    const savedSettings = localStorage.getItem("admin-settings");
    if (savedOrders) setOrders(JSON.parse(savedOrders));
    if (savedProducts) setProducts(JSON.parse(savedProducts));
    if (savedSettings) setSettings(JSON.parse(savedSettings));
  }, []);

  useEffect(() => localStorage.setItem("admin-orders", JSON.stringify(orders)), [orders]);
  useEffect(() => localStorage.setItem("admin-products", JSON.stringify(products)), [products]);
  useEffect(() => localStorage.setItem("admin-settings", JSON.stringify(settings)), [settings]);

  const orderCount = useMemo(() => orders.length, [orders]);

  const addProduct = () => {
    const name = prompt("Product name:");
    if (!name) return;
    const price = prompt("Price (e.g. Rs. 199.00):", "Rs. 199.00");
    setProducts((prev) => [...prev, { id: `P-${Date.now()}`, name, price: price || "Rs. 0.00" }]);
  };

  return (
    <main className="mobile-page admin-page">
      <div className="top-strip">Kishaloy Nursery Admin Panel</div>
      <section className="admin-shell">
        <div className="admin-head">
          <h1>Admin Dashboard</h1>
          <p className="sub-muted">Manage your store operations from one place.</p>
        </div>

        <div className="admin-tabs" role="tablist" aria-label="Admin sections">
          {["Orders", "Products", "Settings"].map((name) => (
            <button key={name} className={`admin-tab ${active === name ? "active" : ""}`} onClick={() => setActive(name)}>
              {name}
            </button>
          ))}
        </div>

        {active === "Orders" && (
          <article className="admin-card admin-panel">
            <h2>Orders ({orderCount})</h2>
            <p>Track and update order status.</p>
            {orders.map((order) => (
              <div className="admin-row" key={order.id}>
                <div>
                  <strong>{order.id}</strong>
                  <p>
                    {order.customer} • {order.total}
                  </p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) =>
                    setOrders((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: e.target.value } : o)))
                  }
                >
                  <option>Pending</option>
                  <option>Packed</option>
                  <option>Shipped</option>
                  <option>Delivered</option>
                </select>
              </div>
            ))}
          </article>
        )}

        {active === "Products" && (
          <article className="admin-card admin-panel">
            <h2>Products ({products.length})</h2>
            <p>Add, edit and delete product entries.</p>
            <button className="add-btn admin-action" onClick={addProduct}>
              Add New Product
            </button>
            {products.length === 0 && <p className="admin-empty">No custom products yet.</p>}
            {products.map((product) => (
              <div className="admin-row" key={product.id}>
                <div>
                  <strong>{product.name}</strong>
                  <p>{product.price}</p>
                </div>
                <button className="admin-link-btn" onClick={() => setProducts((prev) => prev.filter((p) => p.id !== product.id))}>
                  Delete
                </button>
              </div>
            ))}
          </article>
        )}

        {active === "Settings" && (
          <article className="admin-card admin-panel">
            <h2>Settings</h2>
            <p>Store communication and delivery settings.</p>
            <div className="admin-form-grid">
              <input
                placeholder="Support phone"
                value={settings.supportPhone}
                onChange={(e) => setSettings((s) => ({ ...s, supportPhone: e.target.value }))}
              />
              <input
                placeholder="Support email"
                value={settings.supportEmail}
                onChange={(e) => setSettings((s) => ({ ...s, supportEmail: e.target.value }))}
              />
              <input
                placeholder="Minimum delivery quantity"
                value={settings.minDeliveryQty}
                onChange={(e) => setSettings((s) => ({ ...s, minDeliveryQty: e.target.value }))}
              />
              <input
                placeholder="Delivery charge"
                value={settings.deliveryCharge}
                onChange={(e) => setSettings((s) => ({ ...s, deliveryCharge: e.target.value }))}
              />
            </div>
            <p className="admin-save-note">Changes are saved automatically.</p>
          </article>
        )}

        <Link href="/" className="add-btn admin-home-link">
          Back to Storefront
        </Link>
      </section>
    </main>
  );
}
