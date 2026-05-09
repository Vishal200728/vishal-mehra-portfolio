import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../Context/ShopContext';
import logo from '../Assets/logo.png';
import cart_icon from '../Assets/cart_icon.png';

const Navbar = () => {
  const [menu, setMenu] = useState("shop");
  const { getTotalCartItems } = useContext(ShopContext);

  return (
    <nav className="flex justify-around items-center px-4 py-4 shadow-[0_1px_3px_-2px_black] max-md:justify-between max-md:px-6 max-sm:px-4">
      <div className="flex items-center gap-2.5">
        <img src={logo} alt="logo" className="w-11 h-11 max-md:w-9 max-sm:w-8" />
        <p className="text-[#171717] text-[38px] font-semibold max-md:text-2xl max-sm:text-xl">SHOPPER</p>
      </div>
      
      <ul className="flex items-center gap-12 list-none text-[#626262] text-xl font-medium max-lg:gap-8 max-md:hidden">
        <li onClick={() => setMenu("shop")} className="flex flex-col items-center gap-1 cursor-pointer">
          <Link to="/" className="no-underline text-inherit">Shop</Link>
          {menu === "shop" && <hr className="w-[80%] h-0.5 bg-[#ff4141] rounded-full border-none" />}
        </li>
        <li onClick={() => setMenu("men")} className="flex flex-col items-center gap-1 cursor-pointer">
          <Link to="/mens" className="no-underline text-inherit">Men</Link>
          {menu === "men" && <hr className="w-[80%] h-0.5 bg-[#ff4141] rounded-full border-none" />}
        </li>
        <li onClick={() => setMenu("women")} className="flex flex-col items-center gap-1 cursor-pointer">
          <Link to="/womens" className="no-underline text-inherit">Women</Link>
          {menu === "women" && <hr className="w-[80%] h-0.5 bg-[#ff4141] rounded-full border-none" />}
        </li>
        <li onClick={() => setMenu("kids")} className="flex flex-col items-center gap-1 cursor-pointer">
          <Link to="/kids" className="no-underline text-inherit">Kids</Link>
          {menu === "kids" && <hr className="w-[80%] h-0.5 bg-[#ff4141] rounded-full border-none" />}
        </li>
      </ul>
      
      <div className="flex items-center gap-11 max-md:gap-5 max-sm:gap-3">
        <Link to="/login">
          <button className="w-[157px] h-[58px] border border-[#7a7a7a] rounded-full text-[#515151] text-xl font-medium bg-white cursor-pointer hover:bg-gray-50 max-md:w-[120px] max-md:h-[48px] max-md:text-base max-sm:w-[80px] max-sm:h-[36px] max-sm:text-sm">
            Login
          </button>
        </Link>
        <Link to="/cart" className="relative">
          <img src={cart_icon} alt="cart" className="w-8 h-8 max-sm:w-6 max-sm:h-6" />
          <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-600 text-white text-xs rounded-full flex items-center justify-center max-sm:w-4 max-sm:h-4 max-sm:text-[10px]">
            {getTotalCartItems()}
          </div>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;