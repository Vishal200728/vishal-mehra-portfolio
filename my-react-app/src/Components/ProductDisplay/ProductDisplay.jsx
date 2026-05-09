import React, { useContext } from "react";
import star_icon from "../Assets/star_icon.png";
import star_dull_icon from "../Assets/star_dull_icon.png";
import { ShopContext } from "../../Context/ShopContext";

const ProductDisplay = (props) => {
  const { product } = props;
  const { addToCart } = useContext(ShopContext);
  
  return (
    <div className="flex mx-[170px] my-0 gap-8 max-lg:mx-[50px] max-md:flex-col max-md:mx-[30px] max-sm:mx-[15px]">
      
      {/* Left Side - Images */}
      <div className="flex gap-4 max-md:flex-col-reverse max-md:items-center">
        <div className="flex flex-col gap-4 max-md:flex-row max-md:justify-center">
          <img src={product.image} alt="" className="h-[160px] w-auto object-cover cursor-pointer max-md:h-[100px] max-sm:h-[80px]" />
          <img src={product.image} alt="" className="h-[160px] w-auto object-cover cursor-pointer max-md:h-[100px] max-sm:h-[80px]" />
          <img src={product.image} alt="" className="h-[160px] w-auto object-cover cursor-pointer max-md:h-[100px] max-sm:h-[80px]" />
          <img src={product.image} alt="" className="h-[160px] w-auto object-cover cursor-pointer max-md:h-[100px] max-sm:h-[80px]" />
        </div>
        <div>
          <img className="w-[586px] h-[690px] object-cover max-md:w-[400px] max-md:h-[500px] max-sm:w-full max-sm:h-auto" src={product.image} alt="" />
        </div>
      </div>
      
      {/* Right Side - Info */}
      <div className="flex-1 mx-[70px] flex flex-col max-md:mx-0 max-md:items-center max-md:text-center">
        <h1 className="text-[#3d3d3d] text-4xl font-bold max-md:text-3xl max-sm:text-2xl">{product.name}</h1>
        
        {/* Stars */}
        <div className="flex items-center gap-1.5 mt-3 text-[#1c1c1c] text-base max-md:justify-center">
          <img src={star_icon} alt="" className="w-5 h-5" />
          <img src={star_icon} alt="" className="w-5 h-5" />
          <img src={star_icon} alt="" className="w-5 h-5" />
          <img src={star_icon} alt="" className="w-5 h-5" />
          <img src={star_dull_icon} alt="" className="w-5 h-5" />
          <p>(122)</p>
        </div>
        
        {/* Prices */}
        <div className="flex gap-8 my-10 text-2xl font-bold max-md:justify-center max-md:my-6 max-sm:gap-5 max-sm:text-xl">
          <div className="text-[#ff4141]">${product.new_price}</div>
          <div className="text-[#818181] line-through">${product.old_price}</div>
        </div>
        
        <div className="text-[#656565] text-left max-md:text-center">
          A lightweight, usually knitted, pullover shirt, close-fitting and with
          a round neckline and short sleeves, worn as an undershirt or outer
          garment.
        </div>
        
        {/* Sizes */}
        <div className="mt-14 max-md:mt-8">
          <h1 className="text-[#656565] text-xl font-semibold">Select Size</h1>
          <div className="flex gap-5 my-8 flex-wrap max-md:justify-center max-sm:gap-3">
            <div className="px-6 py-[18px] bg-[#fbfbfb] border border-[#ebebeb] rounded cursor-pointer hover:bg-[#ff4141] hover:text-white transition max-sm:px-4 max-sm:py-3">S</div>
            <div className="px-6 py-[18px] bg-[#fbfbfb] border border-[#ebebeb] rounded cursor-pointer hover:bg-[#ff4141] hover:text-white transition max-sm:px-4 max-sm:py-3">M</div>
            <div className="px-6 py-[18px] bg-[#fbfbfb] border border-[#ebebeb] rounded cursor-pointer hover:bg-[#ff4141] hover:text-white transition max-sm:px-4 max-sm:py-3">L</div>
            <div className="px-6 py-[18px] bg-[#fbfbfb] border border-[#ebebeb] rounded cursor-pointer hover:bg-[#ff4141] hover:text-white transition max-sm:px-4 max-sm:py-3">XL</div>
            <div className="px-6 py-[18px] bg-[#fbfbfb] border border-[#ebebeb] rounded cursor-pointer hover:bg-[#ff4141] hover:text-white transition max-sm:px-4 max-sm:py-3">XXL</div>
          </div>
        </div>
        
        <button 
          onClick={() => addToCart(product.id)}
          className="px-10 py-5 w-[200px] bg-[#ff4141] text-white font-semibold rounded mb-10 cursor-pointer hover:scale-105 transition max-md:self-center max-sm:w-[160px] max-sm:py-3"
        >
          ADD TO CART
        </button>
        
        <p className="mt-2"><span className="font-semibold">Category :</span> Women, T-Shirt, Crop Top</p>
        <p className="mt-2"><span className="font-semibold">Tags :</span> Modern, Latest</p>
      </div>
    </div>
  );
};

export default ProductDisplay;