"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Product from "./product";
import BestSelller from "./best-seller";

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8000/products");
        setProducts(response.data.products); // Assuming response.data contains products
        // console.log(response.data.products);
        console.log("hit");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, []);

  const uniqueProductNames: any = {};

  products.forEach((product) => {
    const category = product["category"];
    // Check if the category already exists in the uniqueProductNames object
    if (!(category in uniqueProductNames)) {
      // If not, add the category as a key with its corresponding image
      uniqueProductNames[category] = product["images"][0];
    }
  });

  console.log(uniqueProductNames);
  // Convert the object to an array of objects, if needed
  const uniqueCategoriesWithImages = Object.keys(uniqueProductNames).map(
    (category) => ({
      category: category,
      image: uniqueProductNames[category],
    })
  );

  console.log(uniqueCategoriesWithImages);
  return (
    <div className="flex flex-col gap-8">
      <div
        className="w-full h-[600px] bg-cover bg-center"
        style={{ backgroundImage: "url('/bgImg.jpg')" }}
      ></div>
      <Product />
      <BestSelller />
      <div></div>
    </div>
  );
};

export default Homepage;
