"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Product = () => {
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
    <div className="flex flex-col">
      <p className="text-[24px] self-center">Products</p>
      <div className="flex justify-around gap-8 flex-wrap p-4">
        {uniqueCategoriesWithImages && uniqueCategoriesWithImages.length > 0 ? (
          uniqueCategoriesWithImages.map((item, index) => (
            <div
              className="flex flex-col h-[340px] w-[360px] bg-[#f9f9f7]  hover:bg-[#feedcf] p-2 gap-2 justify-center cursor-pointer border rounded-md"
              key={index}
              onClick={() => router.push(`/products/${item["category"]}`)}
            >
              <div className="h-[200px] self-center">
                <img className="h-full" src={item["image"]} />
              </div>
              <div className="text-center">
                <span>{item["category"]}</span>
              </div>
            </div>
          ))
        ) : (
          <div>No products found</div>
        )}
      </div>
    </div>
  );
};

export default Product;
