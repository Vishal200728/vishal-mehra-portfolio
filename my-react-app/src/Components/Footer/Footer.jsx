import React from 'react';
import footer_logo from '../Assets/logo_big.png';
import instagram_icon from '../Assets/instagram_icon.png';
import pintester_icon from '../Assets/pintester_icon.png';
import whatsapp_icon from '../Assets/whatsapp_icon.png';

const Footer = () => {
  return (
    <footer className="flex flex-col justify-center items-center gap-12 pt-12 pb-8 bg-white max-md:gap-8 max-sm:gap-6">
      <div className="flex items-center gap-5 max-sm:gap-3">
        <img src={footer_logo} alt="Shopper Logo" className="w-12 h-12 max-md:w-10 max-sm:w-8" />
        <p className="text-[#383838] text-[46px] font-bold max-md:text-3xl max-sm:text-2xl">SHOPPER</p>
      </div>
      
      <ul className="flex gap-12 text-[#252525] text-xl list-none max-lg:gap-8 max-md:gap-6 max-md:text-base max-sm:gap-4 max-sm:text-sm max-sm:flex-wrap max-sm:justify-center max-sm:px-4">
        <li className="cursor-pointer hover:text-[#ff4141] transition">Company</li>
        <li className="cursor-pointer hover:text-[#ff4141] transition">Products</li>
        <li className="cursor-pointer hover:text-[#ff4141] transition">Office</li>
        <li className="cursor-pointer hover:text-[#ff4141] transition">About</li>
        <li className="cursor-pointer hover:text-[#ff4141] transition">Contact</li>
      </ul>
      
      <div className="flex gap-5 max-sm:gap-3">
        <div className="p-2.5 bg-[#fbfbfb] border border-[#ebebeb] cursor-pointer hover:scale-110 transition max-sm:p-2">
          <img src={instagram_icon} alt="instagram" className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
        </div>
        <div className="p-2.5 bg-[#fbfbfb] border border-[#ebebeb] cursor-pointer hover:scale-110 transition max-sm:p-2">
          <img src={pintester_icon} alt="pinterest" className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
        </div>
        <div className="p-2.5 bg-[#fbfbfb] border border-[#ebebeb] cursor-pointer hover:scale-110 transition max-sm:p-2">
          <img src={whatsapp_icon} alt="whatsapp" className="w-6 h-6 max-sm:w-5 max-sm:h-5" />
        </div>
      </div>
      
      <div className="flex flex-col items-center gap-7 w-full text-[#1a1a1a] text-xl mb-7 max-sm:text-sm">
        <hr className="w-[80%] h-0.5 bg-[#c7c7c7] border-none rounded max-sm:w-[90%]" />
        <p>Copyright @ 2024 Shopper. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;