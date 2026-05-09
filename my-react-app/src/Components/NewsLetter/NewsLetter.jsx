import React from 'react';

const NewsLetter = () => {
  return (
    <div className="w-[65%] h-auto min-h-[40vh] mx-auto px-[140px] py-12 mb-36 bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] rounded-2xl flex flex-col items-center justify-center gap-8 max-lg:w-[80%] max-lg:px-12 max-lg:mb-24 max-md:w-[90%] max-md:px-6 max-md:py-8 max-md:mb-20 max-sm:px-4 max-sm:py-6 max-sm:mb-16 max-sm:gap-4">
      
      <h1 className="text-[#454545] text-5xl font-semibold text-center max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
        Get Exclusive Offers On Your Email
      </h1>
      
      <p className="text-[#454545] text-xl text-center max-md:text-base max-sm:text-sm">
        Subscribe to our newsletter and stay updated
      </p>
      
      <div className="flex items-center justify-between bg-white w-[730px] h-[70px] rounded-full border border-[#e3e3e3] max-lg:w-[600px] max-lg:h-[65px] max-md:w-[500px] max-md:h-[60px] max-sm:w-full max-sm:flex-col max-sm:h-auto max-sm:bg-transparent max-sm:border-none max-sm:gap-3">
        <input 
          type="email" 
          placeholder="Your Email id" 
          className="w-[500px] ml-8 border-none outline-none text-[#616161] text-base max-lg:w-[400px] max-md:w-[320px] max-md:ml-6 max-sm:w-full max-sm:ml-0 max-sm:h-[50px] max-sm:px-4 max-sm:bg-white max-sm:rounded-full max-sm:border max-sm:border-[#e3e3e3]"
        />
        <button className="w-[210px] h-[70px] bg-black text-white text-base rounded-full cursor-pointer hover:bg-gray-800 transition max-lg:w-[180px] max-lg:h-[65px] max-md:w-[160px] max-md:h-[60px] max-sm:w-full max-sm:h-[50px]">
          Subscribe
        </button>
      </div>
    </div>
  );
};

export default NewsLetter;