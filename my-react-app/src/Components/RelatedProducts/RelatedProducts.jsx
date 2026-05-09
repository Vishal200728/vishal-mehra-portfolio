import React from 'react';
import data_product from '../Assets/data';
import Item from '../Item/Item';

const RelatedProducts = () => {
  return (
    <div className="flex flex-col items-center gap-2.5 h-auto mb-24 max-md:mb-16 max-sm:mb-12">
      <h1 className="text-[#171717] text-5xl font-semibold max-lg:text-4xl max-md:text-3xl max-sm:text-2xl">
        Related Products
      </h1>
      <hr className="w-[220px] h-1.5 rounded-full bg-[#252525] border-none max-md:w-[170px] max-md:h-1 max-sm:w-[140px] max-sm:h-0.5" />
      
      <div className="grid grid-cols-4 gap-7 mt-12 max-lg:grid-cols-3 max-lg:gap-6 max-md:grid-cols-2 max-md:gap-5 max-sm:gap-4 max-sm:px-4 max-[360px]:grid-cols-1 max-[360px]:gap-6">
        {data_product.map((item, i) => (
          <Item key={i} id={item.id} name={item.name} image={item.image} new_price={item.new_price} old_price={item.old_price} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;