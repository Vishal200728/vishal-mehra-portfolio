import React from 'react';

const LoginSignup = () => {
  return (
    <div className="w-full h-[80vh] bg-[#fce3fe] pt-[100px] max-md:h-auto max-md:py-16 max-sm:py-12">
      <div className="w-[580px] bg-white mx-auto py-10 px-[60px] rounded-lg shadow-md max-lg:w-[500px] max-lg:py-8 max-lg:px-12 max-md:w-[450px] max-md:py-6 max-md:px-8 max-sm:w-[90%] max-sm:px-5 max-sm:py-6">
        
        <h1 className="my-5 text-2xl font-bold text-center max-sm:text-xl">Sign Up</h1>
        
        <div className="flex flex-col gap-7 mt-7 max-sm:gap-5">
          <input type="text" placeholder="Your Name" className="h-[72px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg max-md:h-[60px] max-md:text-base max-sm:h-[50px] max-sm:text-sm" />
          <input type="email" placeholder="Email Address" className="h-[72px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg max-md:h-[60px] max-md:text-base max-sm:h-[50px] max-sm:text-sm" />
          <input type="password" placeholder="Password" className="h-[72px] w-full pl-5 border border-[#c9c9c9] outline-none text-[#5c5c5c] text-lg max-md:h-[60px] max-md:text-base max-sm:h-[50px] max-sm:text-sm" />
        </div>
        
        <button className="w-full h-[72px] bg-[#ff4141] text-white text-2xl font-medium mt-8 border-none cursor-pointer hover:bg-[#ff5a5a] transition max-md:h-[60px] max-md:text-xl max-sm:h-[50px] max-sm:text-base">
          Continue
        </button>
        
        <p className="mt-5 text-[#5c5c5c] text-lg font-medium text-center max-sm:text-base">
          Already have an account? <span className="text-[#ff4141] font-semibold cursor-pointer">Login here</span>
        </p>
        
        <div className="flex items-center gap-5 mt-6 text-[#5c5c5c] text-lg font-medium max-sm:gap-3 max-sm:text-sm">
          <input type="checkbox" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;