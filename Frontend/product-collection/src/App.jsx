import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductPage from "./page/ProductPage";
import CategoryPage from "./page/CategoryPage";
import "./App.css";

const App = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchCategories = async () => {
    try {
      const customRes = await axios.get("http://localhost:3000/collection");
      const smartRes = await axios.get("http://localhost:3000/collection/smart_collection");
      const customArray = Object.values(customRes.data)
        .filter((item) => typeof item === "object")
        .map((item) => ({ ...item, type: "custom_collection" }));
      const smartArray = Object.values(smartRes.data)
        .filter((item) => typeof item === "object")
        .map((item) => ({ ...item, type: "smart_collection" }));
      setCategories([...customArray, ...smartArray]);
      console.log(categories)
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div className="container">
      {!selectedCategory ? (
        <CategoryPage categories={categories} onSelectCategory={setSelectedCategory} />
      ) : (
        <ProductPage
          category={selectedCategory}
          onBack={() => setSelectedCategory(null)}
        />
      )}
    </div>
  );
};

export default App;
