import React from 'react';
import hand_icon from '../Assets/hand_icon.png';
import arrow_icon from '../Assets/arrow.png';
import hero_image from '../Assets/hero_image.png';

const Hero = () => {
  return (
    <div className="flex bg-gradient-to-b from-[#fde1ff] to-[#e1ffea22] max-md:flex-col max-md:h-auto max-md:min-h-screen">
      <div className="flex-1 flex flex-col justify-center gap-5 pl-[180px] max-lg:pl-[100px] max-md:pl-12 max-md:items-center max-md:text-center max-md:py-12 max-sm:pl-8 max-sm:gap-3">
        <h2 className="text-2xl font-semibold text-[#090909] max-sm:text-lg">NEW ARRIVALS ONLY</h2>
        
        <div>
          <div className="flex items-center gap-5 max-md:justify-center max-sm:gap-3">
            <p className="text-[100px] font-bold text-[#171717] max-lg:text-[80px] max-md:text-[60px] max-sm:text-[40px]">new</p>
            <img src={hand_icon} alt="hand icon" className="w-[105px] max-md:w-[70px] max-sm:w-[50px]" />
          </div>
          <p className="text-[100px] font-bold text-[#171717] max-lg:text-[80px] max-md:text-[60px] max-sm:text-[40px]">collections</p>
          <p className="text-[100px] font-bold text-[#171717] max-lg:text-[80px] max-md:text-[60px] max-sm:text-[40px]">for everyone</p>
        </div>
        
        <div className="flex items-center justify-center gap-4 w-[310px] h-[70px] rounded-full bg-[#ff4141] text-white text-2xl font-medium mt-8 cursor-pointer hover:scale-105 transition max-md:mx-auto max-md:w-[280px] max-md:h-[60px] max-md:text-xl max-sm:w-[220px] max-sm:h-[48px] max-sm:text-base">
          <div>Latest collection</div>
          <img src={arrow_icon} alt="arrow" className="w-5 h-5 max-sm:w-4" />
        </div>
      </div>
      
      <div className="flex-1 flex items-center justify-center pt-12">
        <img src={hero_image} alt="hero" className="max-w-full h-auto" />
      </div>
    </div>
  );
};

export default Hero;