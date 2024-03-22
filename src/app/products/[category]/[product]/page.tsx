"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import { BsPlusCircle } from "react-icons/bs";
import { FiMinusCircle } from "react-icons/fi";

const ProductDetails = ({ params }: { params: { product: string } }) => {
  const [ProductDetails, setProductDetails] = useState<any>({});
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState(0);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/products/${params.category}/${params.product}`
        );
        setProductDetails(response.data[0]);
        setPrice(response.data[0]["variant"][0]["price"]);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData(); // Call the async function immediately
  }, [params.product]);

  const addToCart = async () => {
    const data = {
      quantity: qty,
      price: price,
      id: ProductDetails["_id"],
      customerId: Number(localStorage.getItem("customerId")),
    };
    try {
      const response = await axios.post(
        "http://localhost:8000/add-to-cart",
        data
      );
      console.log("addCart", response);
    } catch (error) {
      console.error("There was a problem with the POST request:", error);
    }
  };
  return (
    <div className="flex justify-around">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="w-[50%] flex justify-center items-center p-6 ">
            <div className="h-[700px]">
              <img
                className="h-full"
                src={ProductDetails["images"] && ProductDetails["images"][0]}
                alt="product_image"
              />
            </div>
          </div>
          <div className="w-[50%] flex-col p-6 items-center gap-4">
            <div className="flex flex-col p-2 border-b-2 border-gray-800 ">
              <p className="text-[36px] font-bold">{ProductDetails["name"]}</p>
              <div>
                <span className=" text-[30px] ">Rs. </span>
                <span className="line-through text-[30px] ">{price}</span>{" "}
                <span className=" text-[30px] ">
                  {Math.round(
                    price - price * (ProductDetails["discountPercentage"] / 100)
                  )}
                </span>
              </div>
            </div>
            <div className="flex flex-col mt-4 gap-4">
              <div className="flex flex-col">
                <span className="block text-[20px]">Weight</span>
                <div className="w-full flex gap-4">
                  {ProductDetails["variant"].map((item: any, index: number) => {
                    return (
                      <button
                        className=" bg-black text-white border rounded-md p-2"
                        onClick={() =>
                          setPrice(ProductDetails["variant"][index]["price"])
                        }
                        key={index}
                      >
                        {item["weight"]}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-col">
                <span className="block text-[20px]">Quantity</span>
                <div className="flex items-center w-[100px] border rounded-md gap-4 p-2 border-gray-600">
                  <FiMinusCircle
                    className="h-8 w-8 cursor-pointer"
                    onClick={() =>
                      setQty((prev) => (prev === 1 ? 1 : prev - 1))
                    }
                  />
                  <span className="block text-[16px]">{qty}</span>
                  <BsPlusCircle
                    className="h-8 w-8 cursor-pointer"
                    onClick={() => setQty((prev) => prev + 1)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center mt-4 gap-4">
              <button
                className="block w-[80%] bg-gray-500 text-white p-3 border rounded-md"
                onClick={addToCart}
              >
                Add to Cart
              </button>
              <button className=" block w-[80%] bg-[#dc7118] text-white p-3 border rounded-md">
                Buy Now
              </button>
              <p>{ProductDetails["description"]}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
export default ProductDetails;
