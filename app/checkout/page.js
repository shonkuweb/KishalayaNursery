"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  FiChevronRight,
  FiCreditCard,
  FiDollarSign,
  FiGrid,
  FiHome,
  FiLock,
  FiPackage,
  FiSmartphone,
  FiTruck,
  FiX
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

const PAYMENT_OPTIONS = [
  { id: "upi", label: "UPI / GPay / PhonePe", desc: "Instant & secure", icon: FiSmartphone },
  { id: "cod", label: "Cash on Delivery", desc: "Pay when it arrives", icon: FiDollarSign },
  { id: "card", label: "Card / Net Banking", desc: "Visa, Mastercard, RuPay", icon: FiCreditCard }
];
import { useCart } from "../context/CartContext";
import { categories as menuCategories } from "../data/categories";
import SiteFooter, { PaymentCards } from "../components/SiteFooter";

const FREE_DELIVERY_THRESHOLD = 4999;
const DELIVERY_CHARGE = 40;
const toAmount = (value) => {
  const match = String(value).replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return match ? parseFloat(match[0]) : 0;
};

export default function CheckoutPage() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { items: cartItems, clear } = useCart();
  const [form, setForm] = useState({ name: "", phone: "", pincode: "", address: "" });
  const [payMethod, setPayMethod] = useState("upi");

  const itemTotal = cartItems.reduce((sum, i) => sum + toAmount(i.price) * i.qty, 0);
  const deliveryCharge = cartItems.length === 0 || itemTotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_CHARGE;
  const grandTotal = itemTotal + deliveryCharge;

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const updateField = (key) => (e) => setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const placeOrder = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    if (!form.name.trim() || !form.phone.trim()) {
      alert("Please enter your name and phone number.");
      return;
    }
    const order = {
      id: `KN-${Date.now().toString().slice(-6)}`,
      customer: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      pincode: form.pincode.trim(),
      total: `Rs. ${grandTotal.toFixed(2)}`,
      status: "Pending",
      placedAt: new Date().toISOString(),
      items: cartItems.map((i) => ({ title: i.title, qty: i.qty, price: i.price }))
    };
    try {
      const existing = JSON.parse(localStorage.getItem("admin-orders") || "[]");
      localStorage.setItem("admin-orders", JSON.stringify([order, ...existing]));
    } catch {
      localStorage.setItem("admin-orders", JSON.stringify([order]));
    }
    clear();
    router.push(`/track-order?id=${order.id}`);
  };

  return (
    <main className="mobile-page product-page">
      <section className="checkout-shell">
        <div className="secure-pill">
          <FiLock /> Secure Checkout
        </div>
        <h1>Checkout</h1>
        {cartItems.length === 0 && <p className="empty-small">Your cart is empty.</p>}
        <div className="checkout-card">
          <div className="card-head">
            <h3>
              <span className="step-badge">1</span>Delivery Address
            </h3>
            <span className="sub-muted">Delivered in 1-3 days</span>
          </div>
          <input placeholder="Full Name" value={form.name} onChange={updateField("name")} />
          <input placeholder="Phone Number" value={form.phone} onChange={updateField("phone")} />
          <input placeholder="Pincode" value={form.pincode} onChange={updateField("pincode")} />
          <textarea placeholder="Full Address" rows={3} value={form.address} onChange={updateField("address")} />
        </div>

        <div className="checkout-card">
          <div className="card-head">
            <h3>
              <span className="step-badge">2</span>Payment Method
            </h3>
            <span className="sub-muted">No extra fees on prepaid</span>
          </div>
          <div className="pay-options">
            {PAYMENT_OPTIONS.map((opt) => {
              const Icon = opt.icon;
              const selected = payMethod === opt.id;
              return (
                <button
                  type="button"
                  key={opt.id}
                  className={`pay-option ${selected ? "selected" : ""}`}
                  onClick={() => setPayMethod(opt.id)}
                  aria-pressed={selected}
                >
                  <span className="pay-option-icon">
                    <Icon />
                  </span>
                  <span className="pay-option-text">
                    <strong>{opt.label}</strong>
                    <span>{opt.desc}</span>
                  </span>
                  <span className={`pay-radio ${selected ? "on" : ""}`} />
                </button>
              );
            })}
          </div>
          <div className="pay-accepted">
            <span className="pay-accepted-label">Accepted here</span>
            <PaymentCards />
          </div>
        </div>

        <div className="bill-card">
          <h3>
            <span className="step-badge">3</span>Order Summary
          </h3>
          {cartItems.length === 0 && <p className="empty-small">No products selected.</p>}
          <div className="order-lines">
            {cartItems.map((item) => (
              <div className="order-line" key={item.slug}>
                <div className={`order-line-thumb ${item.imageClass}`} />
                <div className="order-line-info">
                  <p>{item.title}</p>
                  <span>
                    {item.price} × {item.qty}
                  </span>
                </div>
                <strong className="order-line-total">Rs. {(toAmount(item.price) * item.qty).toFixed(2)}</strong>
              </div>
            ))}
          </div>
          <p>
            <span>Item Total</span>
            <strong>Rs. {itemTotal.toFixed(2)}</strong>
          </p>
          <p>
            <span>Delivery Charge</span>
            <strong>{deliveryCharge === 0 ? "FREE" : `Rs. ${deliveryCharge.toFixed(2)}`}</strong>
          </p>
          <p className="bill-total">
            <span>Total Payable</span>
            <strong>Rs. {grandTotal.toFixed(2)}</strong>
          </p>
        </div>

        <div className="info-block">
          <p>🚚 One Day Delivery in Kolkata</p>
          <p>🛡️ 14-Day Replacement | Expert Guidance</p>
          <p>📦 Safe Packaging | Free Delivery above ₹4999</p>
        </div>

        <button type="button" className="add-btn cart-checkout-btn checkout-place-btn" onClick={placeOrder}>
          <span>Place Order</span>
          {cartItems.length > 0 && <span className="checkout-place-total">Rs. {grandTotal.toFixed(2)}</span>}
        </button>
        <p className="checkout-secure-note">
          <FiLock /> 100% secure &amp; encrypted payment
        </p>
      </section>

      <SiteFooter />

      {menuOpen && <button className="menu-overlay" aria-label="Close menu overlay" onClick={() => setMenuOpen(false)} />}
      <aside className={`side-menu ${menuOpen ? "open" : ""}`} aria-label="Website menu">
        <div className="side-menu-head">
          <strong>Menu</strong>
          <button className="icon-btn" aria-label="Close menu" onClick={() => setMenuOpen(false)}>
            <FiX />
          </button>
        </div>
        <nav className="side-menu-links">
          <Link href="/" onClick={() => setMenuOpen(false)}>
            Home <FiChevronRight />
          </Link>
          <Link href="/cart" onClick={() => setMenuOpen(false)}>
            Cart <FiChevronRight />
          </Link>
          <Link href="/checkout" onClick={() => setMenuOpen(false)}>
            Checkout <FiChevronRight />
          </Link>
          <Link href="/product/buttercup" onClick={() => setMenuOpen(false)}>
            Product Details <FiChevronRight />
          </Link>
        </nav>
        <div className="menu-categories">
          <p>Categories</p>
          <div className="menu-category-grid">
            {menuCategories.map((item) => (
              <button key={item} type="button" className="menu-category-item" onClick={() => setMenuOpen(false)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </aside>

      <button className="whatsapp-fab" aria-label="WhatsApp">
        <FaWhatsapp />
      </button>

      <nav className="bottom-nav visible" aria-label="Primary navigation">
        <Link href="/" className="bottom-item" aria-label="Home">
          <span className="bottom-icon">
            <FiHome />
          </span>
          <span>Home</span>
        </Link>
        <button className="bottom-item" type="button" aria-label="Menu" onClick={() => setMenuOpen(true)}>
          <span className="bottom-icon">
            <FiGrid />
          </span>
          <span>Menu</span>
        </button>
        <Link href="/cart" className="bottom-item" aria-label="Cart">
          <span className="bottom-icon">
            <FiPackage />
          </span>
          <span>Cart</span>
        </Link>
        <Link href="/track-order" className="bottom-item" aria-label="Track order">
          <span className="bottom-icon">
            <FiTruck />
          </span>
          <span>Track Order</span>
        </Link>
      </nav>
    </main>
  );
}
