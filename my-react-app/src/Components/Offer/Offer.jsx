import React from 'react';
import exclusive_image from '../Assets/exclusive_image.png';

const Offer = () => {
  return (
    <div className="w-[65%] h-auto min-h-[60vh] mx-auto px-[140px] py-12 mb-36 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] rounded-2xl flex items-center justify-between max-lg:w-[80%] max-lg:px-12 max-lg:mb-24 max-md:w-[90%] max-md:flex-col max-md:px-8 max-md:py-8 max-md:mb-20 max-sm:px-4 max-sm:py-6 max-sm:mb-16">
      
      <div className="flex-1 flex flex-col justify-center max-md:items-center max-md:text-center">
        <h1 className="text-[#171717] text-[80px] font-bold leading-tight max-lg:text-6xl max-md:text-5xl max-sm:text-4xl">
          Exclusive
        </h1>
        <h1 className="text-[#171717] text-[80px] font-bold leading-tight max-lg:text-6xl max-md:text-5xl max-sm:text-4xl">
          Offer For You
        </h1>
        <p className="text-[#171717] text-[22px] font-semibold mt-4 max-md:text-lg max-sm:text-base">
          ONLY ON BEST SELLERS PRODUCTS
        </p>
        <button className="w-[282px] h-[70px] rounded-[35px] bg-[#ff4141] border-none text-white text-2xl font-medium mt-8 cursor-pointer hover:scale-105 transition max-md:mx-auto max-md:w-[230px] max-md:h-[60px] max-md:text-xl max-sm:w-[180px] max-sm:h-[50px] max-sm:text-base">
          Check Now
        </button>
      </div>
      
      <div className="flex-1 flex items-center justify-center pt-12 max-md:pt-8">
        <img src={exclusive_image} alt="exclusive offer" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Offer;