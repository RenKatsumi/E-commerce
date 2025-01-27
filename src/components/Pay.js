import React, { useState, useEffect, useRef } from 'react';
import { useCart } from '../context/CartContext';

const Pay = () => {
  const { cart } = useCart();
  const [totalAmount, setTotalAmount] = useState(0);
  const paypalButtonContainer = useRef(null);

  // Calculate total amount whenever the cart changes
  useEffect(() => {
    const total = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    const totalFixed = total.toFixed(2);
    setTotalAmount(parseFloat(totalFixed));  // Ensure it's a number
  }, [cart]);

  // Initialize PayPal Buttons when the script is ready
  useEffect(() => {
    if (window.paypal && paypalButtonContainer.current && totalAmount > 0) {
      // Only render the button once, even on re-renders
      if (!paypalButtonContainer.current.innerHTML) {
        window.paypal.Buttons({
          createOrder: (data, actions) => {
            console.log("Total Amount for Order:", totalAmount);

            return actions.order.create({
              purchase_units: [{
                amount: {
                  value: totalAmount, // Pass the valid number to PayPal
                },
              }],
            });
          },
          onApprove: (data, actions) => {
            return actions.order.capture().then((details) => {
              alert('Payment Successful!');
              console.log(details);
              // Optionally, redirect or perform other actions here
            });
          },
          onError: (err) => {
            console.error('Payment failed:', err);
            alert('Something went wrong. Please try again.');
          },
        }).render(paypalButtonContainer.current);  // Render PayPal button into the container
      }
    } else if (totalAmount === 0) {
      console.log('Cart is empty or total amount is 0');
      // Optionally show a message or hide the PayPal button
    }
  }, [totalAmount]);  // Run only when totalAmount changes

  return (
    <div className="pay-container">
      <h1>Checkout</h1>
      <p>Total: ${totalAmount}</p>
      {/* Display PayPal button container only if totalAmount is greater than 0 */}
      {totalAmount > 0 ? (
        <div ref={paypalButtonContainer}></div>
      ) : (
        <p>Your cart is empty. Please add items to proceed with the payment.</p>
      )}
    </div>
  );
};

export default Pay;
