import React from 'react';
import { Link } from 'react-router-dom';

const Item = (props) => {
  return (
    <div className="w-[350px] cursor-pointer hover:scale-105 transition-all duration-600 max-lg:w-[280px] max-md:w-[240px] max-sm:w-full max-sm:max-w-[260px] max-sm:mx-auto">
      <Link to={`/product/${props.id}`} onClick={() => window.scrollTo(0, 0)}>
        <img src={props.image} alt={props.name} className="w-full h-auto" />
      </Link>
      <p className="my-1.5 text-base max-md:text-sm max-sm:text-xs">{props.name}</p>
      
      <div className="flex gap-5 max-sm:gap-3">
        <div className="text-[#374151] text-lg font-semibold max-md:text-base max-sm:text-sm">
          ${props.new_price}
        </div>
        <div className="text-[#8c8c8c] text-lg font-medium line-through max-md:text-base max-sm:text-sm">
          ${props.old_price}
        </div>
      </div>
    </div>
  );
};

export default Item;