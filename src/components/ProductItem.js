import React from 'react';

const ProductItem = ({ product, handleAddToCart }) => {
  return (
    <div className="product-item">
      <img
        src={product.thumbnail}
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
  );
};

export default ProductItem;
