import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import axios from 'axios';

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

  // Fetch products based on selected category
  const fetchProducts = (category) => {
    setLoading(true);
    axios
      .get('https://dummyjson.com/products', {
        params: {
          limit: 100,
          category: category === 'all' ? undefined : category, // If "all", don't filter by category
        },
      })
      .then((response) => {
        console.log('API response:', response.data); // Log the entire response for debugging
        const fetchedProducts = response.data.products;

        // Filter products based on the category
        const filteredProducts = category === 'all'
          ? fetchedProducts
          : fetchedProducts.filter((product) =>
              product.category && product.category.toLowerCase() === category
            );

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
        setLoading(false);
      });
  };

  // Run on component mount or category change
  useEffect(() => {
    fetchProducts(selectedCategory);
  }, [selectedCategory]);

  const handleAddToCart = (product) => {
    addToCart(product);
    setShowPopup(true);
    setTimeout(() => setShowPopup(false), 3000);
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  // Filter products based on the search query
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {/* Popup Notification */}
      {showPopup && (
        <div className="popup">
          <p>Item added to cart!</p>
        </div>
      )}

      {/* Navbar */}
      <nav className="navbar">
        <img
          src="https://signature.freefire-name.com/img.php?f=10&t=Katsumi"
          alt="Logo"
          className="logo"
        />
        <div className="search-container">
          <input
            type="text"
            placeholder="Search Items"
            value={searchQuery}
            onChange={handleSearch}
            className="search-bar"
          />
          {showSuggestions && (
            <ul className="suggestions">
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  onClick={() => handleSuggestionClick(product.title)}
                  className="suggestion-item"
                >
                  {product.title}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="nav-buttons">
          <Link to="/cart" style={{ textDecoration: 'none' }}>
            <button className="button">View Cart</button>
          </Link>
          
        </div>
      </nav>

      {/* Category Buttons */}
      <div className="category-buttons">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`category-button ${category === selectedCategory ? 'active' : ''}`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Product List */}
      <div className="product-list">
        {filteredProducts.length === 0 ? (
          <p>No products found in this category.</p>
        ) : (
          filteredProducts.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.thumbnail} // 
                alt={product.title}
                className="product-image"
              />
              <h3>{product.title}</h3>
              <p>${product.price}</p>
              <button
                onClick={() => handleAddToCart(product)}
                className="add-button"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
