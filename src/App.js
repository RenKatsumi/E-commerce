import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Updated for React Router v6
import { CartProvider } from './context/CartContext';  // Import the CartProvider
import Home from './components/Home';
import Cart from './components/Cart';
import Pay from './components/Pay'; // Assuming you have a Pay component for the checkout
import './App.css';

const App = () => {
  return (
    <CartProvider> {/* CartProvider should wrap the entire app */}
      <Router>
        <Routes> {/* Replaced Switch with Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Pay />} /> {/* Changed '/pay' to '/checkout' */}
        </Routes>
      </Router>
    </CartProvider>
  );
};

export default App;
