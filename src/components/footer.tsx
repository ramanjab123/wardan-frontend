import { BsFacebook, BsInstagram, BsLinkedin } from "react-icons/bs";
const Footer = () => {
  return (
    <div className="flex justify-around bg-black h-[300px] p-2 ">
      <div className="w-[30%]">
        <div className="w-full flex flex-col items-center">
          <h2 className="text-white text-[32px]">Wardan</h2>
          <h6 className="text-white">Taste of Mithla!</h6>
        </div>
        <p className="text-white text-center mt-2">
          We deliver spices at their best form in flavour and nutrients!
        </p>
        <p className="text-white text-center mt-2">
          23/1, Jagat Banerjee Ghat Rd, Choura Bustee, Shibpur, Howrah, West
          Bengal 711102
        </p>
        <p className="text-white text-center mt-6">
          8565325698 | wardan@spices.com
        </p>
        <div className="flex gap-4 justify-center mt-6">
          <BsFacebook className="h-6 w-6 text-blue-500" />
          <BsInstagram className="h-6 w-6 text-red-500" />
          <BsLinkedin className="h-6 w-6 text-blue-500" />
        </div>
      </div>
      <div className="flex justify-around w-[70%]">
        <div className="w-[33%] flex flex-col justify-center">
          <h1 className="text-white text-center text-[20px]">Product</h1>
          <ul className="text-white self-center mt-6">
            <li>All</li>
            <li>Veg Spices</li>
            <li>Non Veg Spices</li>
            <li>Whole Spices</li>
            <li>Combo Packs</li>
          </ul>
        </div>
        <div className="w-[33%] flex flex-col justify-center">
          <h1 className="text-white text-center text-[20px]">Links</h1>
          <ul className="text-white self-center mt-6">
            <li>Know Our Company</li>
            <li>Meet Our Founders</li>
            <li>Recipes</li>
          </ul>
        </div>
        <div className="w-[33%] flex flex-col justify-center">
          <h1 className="text-white text-center text-[20px]">Others</h1>
          <ul className="text-white self-center mt-6">
            <li>Reviews</li>
            <li>Blog</li>
            <li>Track your order</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
