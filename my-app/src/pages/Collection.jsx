import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/Productitem";

const Collection = () => {
  const { products } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  /* ---------- CATEGORY TOGGLE ---------- */
  const toggleCategory = (e) => {
    const value = e.target.value;

    if (category.includes(value)) {
      setCategory(prev => prev.filter(item => item !== value));
    } else {
      setCategory(prev => [...prev, value]);
    }
  };

  /* ---------- SUBCATEGORY TOGGLE ---------- */
  const toggleSubCategory = (e) => {
    const value = e.target.value;

    if (subCategory.includes(value)) {
      setSubCategory(prev => prev.filter(item => item !== value));
    } else {
      setSubCategory(prev => [...prev, value]);
    }
  };

  /* ---------- INITIAL LOAD ---------- */
  useEffect(() => {
    setFilterProducts(products);
  }, [products]);

  /* ---------- FILTER PRODUCTS ---------- */
  useEffect(() => {
    let filtered = products;

    if (category.length > 0) {
      filtered = filtered.filter(p =>
        category.includes(p.category)
      );
    }

    if (subCategory.length > 0) {
      filtered = filtered.filter(p =>
        subCategory.includes(p.subCategory)
      );
    }

    setFilterProducts(filtered);
  }, [category, subCategory, products]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">

      {/* ---------- FILTERS LEFT ---------- */}
      <div className="min-w-60">

        <p
          onClick={() => setShowFilter(!showFilter)}
          className="text-xl flex items-center cursor-pointer gap-2 mb-6"
        >
          FILTERS
          <img
            className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
            src={assets.dropdown_icon}
            alt=""
          />
        </p>

        {/* Categories */}
        <div
          className={`border border-gray-300 p-5 mb-5 ${
            showFilter ? "" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" value="Men" onChange={toggleCategory}/>
              Men
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Women" onChange={toggleCategory}/>
              Women
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Kids" onChange={toggleCategory}/>
              Kids
            </label>
          </div>
        </div>

        {/* Type */}
        <div
          className={`border border-gray-300 p-5 ${
            showFilter ? "" : "hidden sm:block"
          }`}
        >
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm text-gray-700">
            <label className="flex gap-2">
              <input type="checkbox" value="Topwear" onChange={toggleSubCategory}/>
              Topwear
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Bottomwear" onChange={toggleSubCategory}/>
              Bottomwear
            </label>

            <label className="flex gap-2">
              <input type="checkbox" value="Winterwear" onChange={toggleSubCategory}/>
              Winterwear
            </label>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT SIDE ---------- */}
      <div className="flex-1">

        {/* Title + Sort */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <p className="text-2xl font-medium">ALL COLLECTIONS</p>
            <div className="w-10 h-[2px] bg-black"></div>
          </div>

          <select className="border border-gray-300 text-sm px-3 py-2">
            <option>Sort by: Relevant</option>
            <option>Sort by: Low to High</option>
            <option>Sort by: High to Low</option>
          </select>
        </div>

        {/* Products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
          {filterProducts.map((item, index) => (
            <ProductItem
              key={index}
              name={item.name}
              id={item._id}
              price={item.price}
              image={item.image}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Collection;
