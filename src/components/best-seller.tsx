"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const BestSelller = () => {
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

  const bestSellerProducts =
    products &&
    products.filter((item, index) => {
      return item["bestSeller"] === true;
    });

  return (
    <div className="flex flex-col">
      <p className="text-[24px] self-center">Best Seller</p>
      <div className="flex justify-around gap-8 flex-wrap p-4">
        {bestSellerProducts && bestSellerProducts.length > 0 ? (
          bestSellerProducts.map((item, index) => (
            <div
              className="flex flex-col h-[340px] w-[360px] bg-[#f9f9f7]  hover:bg-[#feedcf] p-2 gap-2 justify-center cursor-pointer border rounded-md"
              key={index}
              onClick={() =>
                router.push(`/products/${item["category"]}/${item["name"]}`)
              }
            >
              <div className="bg-black w-[54px] h-[20px] text-white border rounded-md px-2 py-4 items-center flex ">
                <span className="text-[10px]">
                  {item["discountPercentage"]}%
                </span>
              </div>
              <div className="h-[200px] self-center">
                <img className="h-full" src={item["images"][0]} />
              </div>
              <div className="text-center">
                <span>
                  {item["name"]} net weight -{item["variant"][0]["weight"]}{" "}
                </span>
                <p>
                  Rs.{" "}
                  <span className="line-through">
                    {item["variant"][0]["price"]}
                  </span>{" "}
                  <span>
                    {Math.round(
                      item["variant"][0]["price"] -
                        item["variant"][0]["price"] *
                          (item["discountPercentage"] / 100)
                    )}
                  </span>
                </p>
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

export default BestSelller;
