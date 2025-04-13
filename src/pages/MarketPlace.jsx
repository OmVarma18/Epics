import React, { useState } from "react";
import { useNavigate } from "react-router-dom";  // Importing useNavigate
import "../css/Marketplace.css";

const Marketplace = () => {
  const [products, setProducts] = useState([
    { id: 1, name: "Organic Fertilizer", price: 500, image: "fertilizer.jpg", category: "Fertilizer" },
    { id: 2, name: "Wheat Seeds", price: 1200, image: "wheat.jpg", category: "Seeds" },
    { id: 3, name: "Tractor Rental", price: 5000, image: "tractor.jpg", category: "Tools" },
  ]);
  
  // Cart state
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();  // Initialize useNavigate

  const handleAddToCart = (product) => {
    setCart([...cart, product]);  // Add product to cart
  };

  const handleCheckout = () => {
    // Navigate to checkout and pass the cart state
    navigate('/checkout', { state: { cart } });
  };

  return (
    <div className="marketplace-container">
      <h2>Welcome to the Marketplace</h2>
      <p>Buy and sell agricultural products here!</p>

      <div className="product-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={`/assets/${product.image}`} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
            <button
              className="buy-button"
              onClick={() => handleAddToCart(product)} // Add product to cart
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {/* Display the cart count */}
      <button className="checkout-button" onClick={handleCheckout}>
        Go to Checkout ({cart.length} items)
      </button>
    </div>
  );
};

export default Marketplace;
