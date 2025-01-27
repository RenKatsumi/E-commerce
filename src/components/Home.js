// Home.jsx
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import Navbar from './Navbar';
import CategoryButtons from './CategoryButtons';
import ProductList from './ProductList';
import Popup from './Popup';

const Home = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'beauty',
    'fragrances',
    'furniture',
    'groceries',
    'home-decoration',
    'kitchen-accessories',
    'laptops',
    'mens-shirts',
    'mens-shoes',
    'mens-watches',
    'mobile-accessories',
  ];

  const fetchProducts = (category) => {
    setLoading(true);
    axios
      .get('https://dummyjson.com/products', {
        params: {
          limit: 100,
          category: category === 'all' ? undefined : category,
        },
      })
      .then((response) => {
        const fetchedProducts = response.data.products;
        setProducts(category === 'all' ? fetchedProducts : fetchedProducts.filter((product) =>
          product.category?.toLowerCase() === category
        ));
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      {showPopup && <Popup />}
      <Navbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        showSuggestions={showSuggestions}
        setShowSuggestions={setShowSuggestions}
        filteredProducts={filteredProducts}
      />
      <CategoryButtons
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <ProductList
        products={filteredProducts}
        handleAddToCart={handleAddToCart}
      />
    </div>
  );
};

export default Home;
