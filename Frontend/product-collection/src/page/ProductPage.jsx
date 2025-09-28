import React, { useState, useEffect } from "react";
import Product from "../Components/Product";

const ProductPage = ({ category, onBack }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (!category) return;

    const apiUrl =`http://localhost:3000/collection/products/${category.id}`;
    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => {
        console.log("productData",data.products)
        setProducts(data.products);
      })
      .catch((err) => console.error("Error fetching products:", err));
  }, [category]);

  return (
    <>
      <button className="button" onClick={onBack}>Back</button>
      <h2>{category.title}</h2>
      <Product products={products} />
    </>
  );
};

export default ProductPage;
