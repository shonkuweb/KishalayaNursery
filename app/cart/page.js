"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiChevronRight,
  FiGrid,
  FiHome,
  FiPackage,
  FiPlus,
  FiTrash2,
  FiTruck,
  FiX
} from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "../context/CartContext";
import { categories as menuCategories } from "../data/categories";
import SiteFooter from "../components/SiteFooter";

export default function CartPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { items: cartItems, updateQty, removeItem } = useCart();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <main className="mobile-page product-page">
      <section className="cart-shell">
        <h1>My Cart</h1>
        {cartItems.length === 0 && (
          <div className="empty-block">
            <p>Your cart is empty.</p>
            <Link className="add-btn" href="/">
              Continue Shopping
            </Link>
          </div>
        )}

        {cartItems.map((item) => (
          <article className="cart-item" key={item.slug}>
            <div className={`cart-thumb ${item.imageClass}`} />
            <div className="cart-meta">
              <p>{item.title}</p>
              <strong>{item.price}</strong>
              <span>{item.oldPrice}</span>
              <div className="qty-box">
                <button type="button" onClick={() => updateQty(item.slug, item.qty - 1)}>
                  −
                </button>
                <strong>{item.qty}</strong>
                <button type="button" onClick={() => updateQty(item.slug, item.qty + 1)}>
                  <FiPlus />
                </button>
              </div>
            </div>
            <button type="button" className="cart-remove" aria-label="Remove item" onClick={() => removeItem(item.slug)}>
              <FiTrash2 />
            </button>
          </article>
        ))}

        {cartItems.length > 0 && (
          <>
            <div className="bill-card">
              <h3>Bill Details</h3>
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
                <span>To Pay</span>
                <strong>
                  Rs.{" "}
                  {(
                    cartItems.reduce((sum, i) => sum + parseFloat(i.price.replace(/[^\d.]/g, "")) * i.qty, 0) + 40
                  ).toFixed(2)}
                </strong>
              </p>
            </div>

            <Link href="/checkout" className="add-btn cart-checkout-btn">
              Proceed to Checkout
            </Link>
          </>
        )}
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
