"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiChevronRight,
  FiGrid,
  FiHome,
  FiPackage,
  FiTruck,
  FiX
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { categories as menuCategories } from "../data/categories";
import SiteFooter, { PaymentCards } from "../components/SiteFooter";

export default function CheckoutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items: cartItems, clear } = useCart();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="mobile-page product-page">
      <section className="checkout-shell">
        <div className="secure-pill">Secure Checkout</div>
        <h1>Checkout</h1>
        {cartItems.length === 0 && <p className="empty-small">Your cart is empty.</p>}
        <div className="checkout-card">
          <div className="card-head">
            <h3>Delivery Address</h3>
            <span className="sub-muted">We deliver in 1-3 days</span>
          </div>
          <input placeholder="Full Name" />
          <input placeholder="Phone Number" />
          <input placeholder="Pincode" />
          <textarea placeholder="Full Address" rows={3} />
        </div>

        <div className="checkout-card">
          <div className="card-head">
            <h3>Payment Method</h3>
            <span className="sub-muted">No extra fees on prepaid</span>
          </div>
          <label className="radio-line">
            <input type="radio" name="pay" defaultChecked /> UPI / GPay / PhonePe
          </label>
          <label className="radio-line">
            <input type="radio" name="pay" /> Cash on Delivery
          </label>
          <label className="radio-line">
            <input type="radio" name="pay" /> Card / Net Banking
          </label>
          <div className="pay-grid">
            <button type="button">Pay with UPI</button>
            <button type="button">Pay with Card</button>
            <button type="button">Net Banking</button>
          </div>
          <div className="pay-accepted">
            <span className="pay-accepted-label">Accepted here</span>
            <PaymentCards />
          </div>
        </div>

        <div className="bill-card">
          <h3>Order Summary</h3>
          <p>
            <span>Item Total</span>
            <strong>
              Rs.{" "}
              {cartItems
                .reduce((sum, i) => sum + parseFloat(i.price.replace(/[^\d.]/g, "")) * i.qty, 0)
                .toFixed(2)}
            </strong>
          </p>
          <p>
            <span>Delivery Charge</span>
            <strong>Rs. 40.00</strong>
          </p>
          <p className="bill-total">
            <span>Total Payable</span>
            <strong>
              Rs.{" "}
              {(
                cartItems.reduce((sum, i) => sum + parseFloat(i.price.replace(/[^\d.]/g, "")) * i.qty, 0) + 40
              ).toFixed(2)}
            </strong>
          </p>
        </div>

        <div className="info-block">
          <p>🚚 One Day Delivery in Kolkata</p>
          <p>🛡️ 14-Day Replacement | Expert Guidance</p>
          <p>📦 Safe Packaging | Free Delivery above ₹4999</p>
        </div>

        <button
          type="button"
          className="add-btn cart-checkout-btn"
          onClick={() => {
            clear();
            alert("Order placed successfully!");
          }}
        >
          Place Order
        </button>
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
        <Link href="/checkout" className="bottom-item" aria-label="Track order">
          <span className="bottom-icon">
            <FiTruck />
          </span>
          <span>Track Order</span>
        </Link>
      </nav>
    </main>
  );
}
