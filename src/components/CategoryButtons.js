import React from 'react';

const CategoryButtons = ({ categories, selectedCategory, setSelectedCategory }) => {
  return (
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
  );
};

export default CategoryButtons;
