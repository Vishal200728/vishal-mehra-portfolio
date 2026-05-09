import React from 'react';
import arrow_icon from '../Assets/breadcrum_arrow.png';

const Breadcrum = (props) => {
  const { product } = props;
  
  return (
    <div className="flex items-center gap-2 text-[#5e5e5e] text-base font-semibold flex-wrap mx-[170px] my-[60px] max-lg:mx-20 max-md:mx-12 max-md:my-10 max-sm:mx-5 max-sm:text-sm max-sm:my-8">
      HOME 
      <img src={arrow_icon} alt="" className="w-3" /> 
      SHOP 
      <img src={arrow_icon} alt="" className="w-3" /> 
      <span className="capitalize">{product?.category}</span> 
      <img src={arrow_icon} alt="" className="w-3" /> 
      <span className="text-[#606060] font-medium">{product?.name}</span>
    </div>
  );
};

export default Breadcrum;