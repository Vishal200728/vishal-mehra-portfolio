import React from 'react';

const DescriptionBox = () => {
  return (
    <div className="my-[120px] mx-[170px] max-lg:mx-[50px] max-lg:my-[80px] max-md:mx-[30px] max-md:my-[60px] max-sm:mx-[20px] max-sm:my-[40px]">
      
      <div className="flex">
        <div className="flex items-center justify-center text-base font-semibold w-[171px] h-[70px] border border-[#d0d0d0] max-md:w-[130px] max-md:h-[50px] max-md:text-sm max-sm:w-[100px] max-sm:h-[45px] max-sm:text-xs">
          Description
        </div>
        <div className="flex items-center justify-center text-base font-semibold w-[171px] h-[70px] border border-[#d0d0d0] bg-[#fbfbfb] text-[#555] max-md:w-[130px] max-md:h-[50px] max-md:text-sm max-sm:w-[100px] max-sm:h-[45px] max-sm:text-xs">
          Reviews (122)
        </div>
      </div>
      
      <div className="flex flex-col gap-6 border border-[#d0d0d0] p-12 pb-[70px] max-md:p-8 max-md:pb-12 max-sm:p-5 max-sm:pb-8 max-sm:gap-4">
        <p className="text-[#5e5e5e] text-base leading-relaxed max-md:text-sm max-sm:text-xs">
          An e-commerce website is an online platform that facilitates buying and selling of products or services over the internet. It serves as a virtual marketplace where businesses and individuals can showcase their products, interact with customers, and conduct transactions without the need for a physical presence. E-commerce websites have gained immense popularity due to their convenience, accessibility, and the global reach they offer.
        </p>
        <p className="text-[#5e5e5e] text-base leading-relaxed max-md:text-sm max-sm:text-xs">
          E-commerce websites typically display products or services with detailed descriptions, images, prices, and any available variations (e.g., sizes, colors). Each product usually has its own dedicated page with relevant information.
        </p>
      </div>
    </div>
  );
};

export default DescriptionBox;