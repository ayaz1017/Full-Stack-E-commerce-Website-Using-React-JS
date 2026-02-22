import React, { useState, useContext } from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

export default function Navbar() {
  const [visible, setVisible] = useState(false);

  const { setShowSearch } = useContext(ShopContext);

  return (
    <div className="relative flex items-center justify-between py-5 font-medium max-w-screen-xl mx-auto">

      {/* Logo */}
      <Link to="/">
        <img src={assets.logo} className="w-36" alt="logo" />
      </Link>

      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-8 text-sm text-gray-700 list-none">
        <li>
          <NavLink to="/" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>HOME</p>
                <hr className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${isActive ? "block" : "hidden"}`} />
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/collection" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>COLLECTION</p>
                <hr className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${isActive ? "block" : "hidden"}`} />
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/about" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>ABOUT</p>
                <hr className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${isActive ? "block" : "hidden"}`} />
              </>
            )}
          </NavLink>
        </li>

        <li>
          <NavLink to="/contact" className="flex flex-col items-center gap-1">
            {({ isActive }) => (
              <>
                <p>CONTACT</p>
                <hr className={`w-2/4 h-[1.5px] bg-gray-700 border-none ${isActive ? "block" : "hidden"}`} />
              </>
            )}
          </NavLink>
        </li>
      </ul>

      {/* Icons */}
      <div className="flex items-center gap-6">

        {/* 🔍 Search Icon */}
        <img
          onClick={() => setShowSearch(true)}
          src={assets.search_icon}
          className="w-5 cursor-pointer"
          alt="search"
        />

        {/* Profile Dropdown */}
        <div className="relative group">
          <img className="w-4 cursor-pointer" src={assets.profile_icon} alt="" />
          <div className="hidden group-hover:block absolute right-0 pt-4">
            <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-slate-100 text-gray-500 rounded shadow">
              <p className="cursor-pointer hover:text-black">My Profile</p>
              <p className="cursor-pointer hover:text-black">Orders</p>
              <p className="cursor-pointer hover:text-black">Logout</p>
            </div>
          </div>
        </div>

        {/* Cart */}
        <Link to="/cart" className="relative">
          <img src={assets.cart_icon} className="w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-black text-white rounded-full text-[8px]">
            0
          </p>
        </Link>

        {/* Mobile menu icon */}
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_icon}
          className="w-5 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 bg-white z-50 transition-all duration-300 overflow-hidden ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-gray-600">

          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img className="h-4 rotate-180" src={assets.dropdown_icon} alt="" />
            <p>Back</p>
          </div>

          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/">
            HOME
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/collection">
            COLLECTION
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/about">
            ABOUT
          </NavLink>
          <NavLink onClick={() => setVisible(false)} className="py-3 pl-6 border" to="/contact">
            CONTACT
          </NavLink>

        </div>
      </div>
    </div>
  );
}
