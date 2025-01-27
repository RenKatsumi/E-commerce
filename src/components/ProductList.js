import React from 'react';
import ProductItem from './ProductItem';

const ProductList = ({ products, handleAddToCart }) => {
  if (products.length === 0) {
    return <p>No products found in this category.</p>;
  }

  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductItem
          key={product.id}
          product={product}
          handleAddToCart={handleAddToCart}
        />
      ))}
    </div>
  );
};

export default ProductList;
