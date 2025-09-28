import React from "react";

const Category = ({ categories, onSelect }) => {
    console.log(categories)
  return (
    <div className="grid">
      {categories.map((cat) => (
        <div
          className="card"
          key={cat.id}
          onClick={() => onSelect(cat)}
        >
          {cat.image?.src && (
            <img src={cat.image.src} alt={cat.title} width="100%" />
          )}
          <h3>{cat.title}</h3>
          <small>{cat.type === "smart_collection" ? "Smart" : "Custom"} Collection</small>
        </div>
      ))}
    </div>
  );
};

export default Category;
