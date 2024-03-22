"use client";
// Import necessary modules/components
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { VscAccount } from "react-icons/vsc";

// Define Navbar component
const Navbar = () => {
  const [cartData, setCartData] = useState({});
  const [count, setCount] = useState(0);
  const [showSidebar, setShowSidebar] = useState(false);

  // Fetch cart data on component mount
  useEffect(() => {
    const customerId = localStorage.getItem("customerId");
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/view-cart/${customerId}`
        );
        setCartData(response.data.cartData);
        setCount(response.data.count);
        console.log(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  // Open sidebar
  const openSidebar = () => {
    setShowSidebar(true);
  };

  // Close sidebar
  const closeSidebar = () => {
    setShowSidebar(false);
  };

  // Return JSX for Navbar component
  return (
    <div className="navbar flex bg-[#DC7118] h-[60] items-center px-[16px] py-2">
      <div className="w-[40%] flex-col ms-4">
        <span className="inline-block w-full text-[#fff] px-2 text-[20px]">
          Wardan
        </span>
        <span className="inline-block w-full text-[#fff] text-[12px]">
          Taste of Mithla!!
        </span>
      </div>
      <div className="w-[60%]">
        <ul className="flex gap-4 justify-end">
          <li className="text-[#fff] w-[10%] text-center cursor-pointer  text-[20px]">
            <Link href="">About us</Link>
          </li>
          <li className="text-[#fff] w-[10%] text-center  cursor-pointer  text-[20px]">
            <Link href="http://localhost:3000/products">Products</Link>
          </li>
          <li
            className="text-[#fff] w-[10%] text-center  cursor-pointer  text-[20px] ms-2 py-1"
            style={{ position: "relative" }}
            onClick={openSidebar}
          >
            <LuShoppingCart className="h-6 w-6 font-bold" />
            <span
              style={{
                display: "inline-block",
                position: "absolute",
                bottom: "24px",
                left: "12px",
                fontSize: "12px",
                fontWeight: "bold",
                border: "2px solid white",
                borderRadius: "50%",
                height: "20px",
                width: "20px",
              }}
            >
              {count}
            </span>
          </li>
          

          <li className="text-[#fff] w-[10%] text-center  cursor-pointer  text-[20px]">
            <VscAccount className="h-6 w-6 font-bold" />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
