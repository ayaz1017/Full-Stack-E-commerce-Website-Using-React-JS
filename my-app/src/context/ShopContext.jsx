import React, { createContext, useEffect, useState } from "react";
import { products } from "../assets/assets";
import { toast } from "react-toastify";

export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {

  const currency = "$";
  const delivery_fee = 10;

  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});

  // ---------------- ADD TO CART ----------------

  const addToCart = (itemId, size) => {

    if (!size) {
      toast.error("Select Product Size");
      return;
    }

    let cartData = structuredClone(cartItems);

    if (cartData[itemId]) {
      cartData[itemId][size] = (cartData[itemId][size] || 0) + 1;
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    setCartItems(cartData);
    toast.success("Added to cart");
  };

  // ---------------- UPDATE QUANTITY ----------------

  const updateQuantity = (itemId, size, quantity) => {

    let cartData = structuredClone(cartItems);

    if (!cartData[itemId]) return;

    if (quantity <= 0) {
      delete cartData[itemId][size];

      // remove product if no sizes left
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      cartData[itemId][size] = quantity;
    }

    setCartItems(cartData);
  };

  // ---------------- GET CART COUNT ----------------

  const getCartCount = () => {
    let totalCount = 0;

    for (const productId in cartItems) {
      for (const size in cartItems[productId]) {
        totalCount += cartItems[productId][size];
      }
    }

    return totalCount;
  };

  // ---------------- GET CART AMOUNT ----------------

  const getCartAmount = () => {

    let totalAmount = 0;

    for (const productId in cartItems) {

      const itemInfo = products.find(
        (product) => product._id === productId
      );

      if (!itemInfo) continue;

      for (const size in cartItems[productId]) {
        totalAmount += itemInfo.price * cartItems[productId][size];
      }
    }

    return totalAmount;
  };

  // ---------------- DEBUG (OPTIONAL) ----------------

  useEffect(() => {
    console.log("Cart Updated:", cartItems);
  }, [cartItems]);

  // ---------------- CONTEXT VALUE ----------------

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    addToCart,
    updateQuantity,
    getCartCount,
    getCartAmount,
  };

  return (
    <ShopContext.Provider value={value}>
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;