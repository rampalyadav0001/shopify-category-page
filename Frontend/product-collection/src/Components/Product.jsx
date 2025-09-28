import React from "react";

const Product = ({ products }) => {
  if (!products.length) return <p>No products found.</p>;

  return (
    <div className="grid">
      {products.map((p) => (
        <div className="card" key={p.id}>
          {p.image?.src && (
            <img src={p.image.src} alt={p.title} width="100%" />
          )}
          <h4>{p.title}</h4>
        </div>
      ))}
    </div>
  );
};

export default Product;
