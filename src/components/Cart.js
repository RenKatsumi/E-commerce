import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const handleRemove = (productId) => {
    removeFromCart(productId); // Remove item from cart
  };

  const handleQuantityChange = (productId, event) => {
    const newQuantity = parseInt(event.target.value, 10);
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity); // Update quantity
    }
  };

  const handleIncrement = (productId) => {
    const product = cart.find(item => item.id === productId);
    updateQuantity(productId, product.quantity + 1); // Increment quantity
  };

  const handleDecrement = (productId) => {
    const product = cart.find(item => item.id === productId);
    if (product.quantity > 1) {
      updateQuantity(productId, product.quantity - 1); // Decrement quantity
    }
  };

  // Calculate the total price of the cart
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="cart-container">
      {/* Navbar (Updated with 'Your Cart' in the center) */}
      <nav className="cart-navbar">
        <div className="navbar-logo">
          <img src="https://signature.freefire-name.com/img.php?f=10&t=Katsumi" alt="Logo" />
        </div>
        <div className="navbar-cart-text">
          <h1>Your Cart</h1>
        </div>
        <div className="navbar-links">
          {/* Home Button */}
          <Link to="/" className="navbar-button">
            Home
          </Link>
          <button className="navbar-button">Login</button>
        </div>
      </nav>

      {/* Cart Content */}
      {cart.length === 0 ? (
        <div className="cart-empty">
          Your cart is empty! <Link to="/">Go back to Home</Link>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-item-image" />
              <div className="cart-item-details">
                <h3>{item.title}</h3> {/* Corrected: Use item.title for the name */}
                <p>${item.price}</p>

                {/* Quantity input with + and - buttons */}
                <div className="cart-item-quantity">
                  <button onClick={() => handleDecrement(item.id)}>-</button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                    min="1"
                    readOnly
                  />
                  <button onClick={() => handleIncrement(item.id)}>+</button>
                </div>

                {/* Subtotal for the item */}
                <div className="cart-item-subtotal">
                  Subtotal: ${(item.price * item.quantity).toFixed(2)}
                </div>

                {/* Remove item from cart */}
                <button onClick={() => handleRemove(item.id)} className="remove-button">Remove</button>
              </div>
            </div>
          ))}
          <div className="checkout-container">
            <Link to="/checkout">
              <button className="checkout-btn">Go to Checkout</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
