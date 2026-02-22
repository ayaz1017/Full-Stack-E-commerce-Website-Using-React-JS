import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import ProductItem from "../components/Productitem";

const Collection = () => {
  const { products, search } = useContext(ShopContext);

  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");

  /* ---------- CATEGORY TOGGLE ---------- */
  const toggleCategory = (e) => {
    const value = e.target.value;

    setCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  /* ---------- SUBCATEGORY TOGGLE ---------- */
  const toggleSubCategory = (e) => {
    const value = e.target.value;

    setSubCategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  /* ---------- SORT FUNCTION ---------- */
  const sortProducts = (list, type) => {
    let sorted = [...list];

    if (type === "low-high") {
      sorted.sort((a, b) => a.price - b.price);
    } else if (type === "high-low") {
      sorted.sort((a, b) => b.price - a.price);
    }

    return sorted;
  };

  /* ---------- CLEAR FILTERS ---------- */
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType("relevant");
  };

  /* ---------- FILTER + SORT ---------- */
  useEffect(() => {
    let filtered = products ? [...products] : [];

    // Search filter (global from context)
    if (search && search.trim() !== "") {
      filtered = filtered.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Category filter
    if (category.length > 0) {
      filtered = filtered.filter((p) =>
        category.includes(p.category)
      );
    }

    // SubCategory filter
    if (subCategory.length > 0) {
      filtered = filtered.filter((p) =>
        subCategory.includes(p.subCategory)
      );
    }

    // Sorting
    filtered = sortProducts(filtered, sortType);

    setFilterProducts(filtered);
  }, [products, search, category, subCategory, sortType]);

  return (
    <div className="flex flex-col sm:flex-row gap-10 pt-10 border-t">

      {/* ================= FILTERS ================= */}
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

        <button
          onClick={clearFilters}
          className="text-sm underline mb-4"
        >
          Clear Filters
        </button>

        {/* Categories */}
        <div className={`border p-5 mb-5 ${showFilter ? "" : "hidden sm:block"}`}>
          <p className="mb-3 text-sm font-medium">CATEGORIES</p>

          <div className="flex flex-col gap-2 text-sm">
            {["Men", "Women", "Kids"].map((item) => (
              <label key={item} className="flex gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={category.includes(item)}
                  onChange={toggleCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>

        {/* Type */}
        <div className={`border p-5 ${showFilter ? "" : "hidden sm:block"}`}>
          <p className="mb-3 text-sm font-medium">TYPE</p>

          <div className="flex flex-col gap-2 text-sm">
            {["Topwear", "Bottomwear", "Winterwear"].map((item) => (
              <label key={item} className="flex gap-2">
                <input
                  type="checkbox"
                  value={item}
                  checked={subCategory.includes(item)}
                  onChange={toggleSubCategory}
                />
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* ================= PRODUCTS ================= */}
      <div className="flex-1">

        {/* Title + Sort */}
        <div className="flex justify-between items-center mb-6 flex-wrap gap-3">

          <div>
            <p className="text-2xl font-medium">ALL COLLECTIONS</p>
            <p className="text-sm text-gray-500">
              {filterProducts.length} products found
            </p>
          </div>

          <select
            onChange={(e) => setSortType(e.target.value)}
            value={sortType}
            className="border text-sm px-3 py-2"
          >
            <option value="relevant">Relevant</option>
            <option value="low-high">Price: Low → High</option>
            <option value="high-low">Price: High → Low</option>
          </select>

        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">

          {filterProducts.length > 0 ? (
            filterProducts.map((item) => (
              <ProductItem
                key={item._id}
                name={item.name}
                id={item._id}
                price={item.price}
                image={item.image}
              />
            ))
          ) : (
            <p className="text-gray-500">No products found.</p>
          )}

        </div>
      </div>
    </div>
  );
};

export default Collection;
