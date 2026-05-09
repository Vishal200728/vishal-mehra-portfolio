import React, { useContext } from 'react';
import { ShopContext } from '../Context/ShopContext';
import dropdown_icon from '../Components/Assets/dropdown_icon.png';
import Item from '../Components/Item/Item';

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  
  return (
    <div className="w-full">
      <img className="block w-[82%] mx-auto my-[30px] max-md:w-[90%] max-sm:w-[95%] max-sm:my-5" src={props.banner} alt="category banner" />
      
      <div className="flex justify-between items-center mx-[170px] my-0 max-lg:mx-[100px] max-md:mx-[50px] max-md:flex-col max-md:gap-5 max-md:items-start max-sm:mx-5">
        <p className="text-[#171717] text-base max-md:text-sm">
          <span className="font-semibold">Showing 1-12</span> out of 36 products
        </p>
        <div className="flex items-center gap-2 px-5 py-2.5 rounded-[40px] border border-[#888] cursor-pointer max-sm:px-3 max-sm:py-1.5">
          <span className="text-[#171717] text-base max-sm:text-sm">sort by</span>
          <img src={dropdown_icon} alt="dropdown" className="w-3 h-3" />
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-8 mx-[170px] my-5 max-lg:grid-cols-3 max-lg:gap-6 max-lg:mx-[50px] max-md:grid-cols-2 max-md:gap-5 max-md:mx-[30px] max-sm:grid-cols-2 max-sm:gap-3 max-sm:mx-[15px] max-[450px]:grid-cols-1 max-[450px]:gap-4">
        {all_product.map((item, i) => {
          if (props.category === item.category) {
            return <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />;
          } else {
            return null;
          }
        })}
      </div>
      
      <div className="flex justify-center items-center w-[233px] h-[69px] rounded-[75px] bg-[#ededed] text-[#787878] text-lg font-medium mx-auto my-[150px] cursor-pointer hover:bg-[#e0e0e0] transition max-md:w-[200px] max-md:h-[60px] max-md:text-base max-md:my-[100px] max-sm:w-[160px] max-sm:h-[50px] max-sm:text-sm max-sm:my-[80px]">
        Explore More
      </div>
    </div>
  );
};

export default ShopCategory;