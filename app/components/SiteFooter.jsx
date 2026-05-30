import { FaCcVisa, FaCcMastercard, FaCcAmex } from "react-icons/fa";
import { SiPaytm, SiPhonepe, SiGooglepay, SiRazorpay } from "react-icons/si";
import { MdAccountBalanceWallet } from "react-icons/md";

export function PaymentCards() {
  return (
    <div className="payment-cards">
      <span className="payment-card pay-visa" title="Visa"><FaCcVisa /></span>
      <span className="payment-card pay-mastercard" title="Mastercard"><FaCcMastercard /></span>
      <span className="payment-card pay-amex" title="American Express"><FaCcAmex /></span>
      <span className="payment-card pay-razorpay" title="UPI"><SiRazorpay /></span>
      <span className="payment-card pay-gpay" title="Google Pay"><SiGooglepay /></span>
      <span className="payment-card pay-phonepe" title="PhonePe"><SiPhonepe /></span>
      <span className="payment-card pay-paytm" title="Paytm"><SiPaytm /></span>
      <span className="payment-card pay-wallet" title="Wallets"><MdAccountBalanceWallet /></span>
    </div>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <p>Contact Us</p>
        <p>Terms & Conditions</p>
        <p>Privacy Policy</p>
        <p>Shipping Policy</p>
        <p>Refund Policy</p>
        <p>Track Your Order</p>
      </div>
      <div className="footer-payments">
        <p className="footer-payments-title">We Accept</p>
        <PaymentCards />
        <p className="footer-secure">100% Secure Payments</p>
      </div>
      <p className="footer-note">Kishaloy Nursery © {new Date().getFullYear()}</p>
    </footer>
  );
}
