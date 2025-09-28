import React from "react";
import Category from "../Components/category";

const CategoryPage = ({ categories, onSelectCategory }) => {
  return (
    <>
      <h1>Categories</h1>
      <Category categories={categories} onSelect={onSelectCategory} />
    </>
  );
};

export default CategoryPage;
