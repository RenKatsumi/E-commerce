import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({
  searchQuery,
  setSearchQuery,
  showSuggestions,
  setShowSuggestions,
  filteredProducts,
}) => {
  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
    setShowSuggestions(event.target.value.length > 0);
  };

  const handleSuggestionClick = (name) => {
    setSearchQuery(name);
    setShowSuggestions(false);
  };

  return (
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
  );
};

export default Navbar;
