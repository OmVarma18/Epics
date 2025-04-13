import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Checkout.css";

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cart = location.state?.cart || [];

  const totalPrice = cart.reduce((total, product) => total + product.price, 0);

  const handleConfirmPurchase = () => {
    alert("Purchase Confirmed! Thank you for shopping with us.");
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>
      <div className="cart-summary">
        <h3>Your Cart</h3>
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            {cart.map((product, index) => (
              <div key={index} className="cart-item">
                <img src={`/assets/${product.image}`} alt={product.name} />
                <p>{product.name}</p>
                <p>₹{product.price}</p>
              </div>
            ))}
            <div className="total-price">
              <h4>Total Price: ₹{totalPrice}</h4>
            </div>
          </div>
        )}
      </div>

      <button onClick={handleConfirmPurchase} disabled={cart.length === 0}>
        Confirm Purchase
      </button>
    </div>
  );
};

export default CheckoutPage;
