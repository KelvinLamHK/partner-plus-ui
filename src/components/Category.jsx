import React, { useState, useEffect } from "react";
import { API_BASE_URL } from '../api.config.js';

function Category() {
  const [mainCategories, setMainCategories] = useState([]);
  const [selectedMainCategory, setSelectedMainCategory] = useState(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/v1/document-center/category/list`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify()
    })
      .then(response => response.json())
      .then(data => {
        setMainCategories(data.firstLevelCategoryList);
      });
  }, []);

  const handleMainCategoryChange = (event) => {
    const selectedMainCategoryId = event.target.value;
    setSelectedMainCategory(selectedMainCategoryId);
    setSelectedSubCategory(null);
  };

  const handleSubCategoryChange = (event) => {
    const selectedSubCategoryId = event.target.value;
    setSelectedSubCategory(selectedSubCategoryId);
  };

  const subCategoryOptions = selectedMainCategory
    ? mainCategories.find(category => category.categoryId === selectedMainCategory)?.secondLevelCategoryList
    : null;

  return (
    <>
      <div className="mt-2 w-1/2 mr-4">
        <label>Category:</label><br></br>
        <select value={selectedMainCategory} onChange={handleMainCategoryChange} className="rounded border  border-red-400 h-10 w-full">
          <option value="" className="text-ft">Select main category</option>
          {mainCategories.map(category => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryEnglish}
            </option>
          ))}
        </select>
      </div>

      {subCategoryOptions && (
        <div className="mt-2 w-1/2">
          <label>Subcategory:</label><br></br>
          <select value={selectedSubCategory} onChange={handleSubCategoryChange} className="rounded border  border-red-300 h-10 w-full">
            <option value="">Select subcategory</option>
            {subCategoryOptions.map(subCategory => (
              <option key={subCategory.categoryId} value={subCategory.categoryId}>
                {subCategory.categoryEnglish}
              </option>
            ))}
          </select>
        </div>
      )}
    </>
  );
}

export default Category;