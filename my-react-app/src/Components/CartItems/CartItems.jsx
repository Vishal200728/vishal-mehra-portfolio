import { useContext } from 'react';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, removeFromCart } = useContext(ShopContext);
  
  return (
    <div className="mx-[170px] my-[100px] max-lg:mx-[50px] max-md:mx-[20px] max-sm:mx-[15px] max-sm:my-[60px]">
      
      {/* Header */}
      <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-[75px] py-5 text-[#454545] text-lg font-semibold max-lg:gap-10 max-md:text-sm max-md:gap-5 max-sm:min-w-[600px] max-sm:text-xs">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className="h-[3px] bg-[#e2e2e2] border-0" />
      
      {/* Cart Items */}
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="grid grid-cols-[0.5fr_2fr_1fr_1fr_1fr_0.5fr] items-center gap-[75px] py-5 text-base font-medium max-lg:gap-10 max-md:text-sm max-md:gap-5 max-sm:min-w-[600px] max-sm:text-xs">
                <img src={e.image} alt="" className="h-[62px] max-sm:h-[45px]" />
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <button className="w-[64px] h-[50px] border-2 border-[#ebebeb] bg-white max-sm:w-[50px] max-sm:h-[40px]">{cartItems[e.id]}</button>
                <p>${e.new_price * cartItems[e.id]}</p>
                <img className="w-[15px] mx-auto cursor-pointer max-sm:w-[12px]" src={remove_icon} onClick={() => removeFromCart(e.id)} alt="" />
              </div>
              <hr className="h-[3px] bg-[#e2e2e2] border-0" />
            </div>
          );
        }
        return null;
      })}
      
      {/* Cart Total & Promo Code */}
      <div className="flex my-[100px] max-md:flex-col max-md:gap-10">
        <div className="flex-1 flex flex-col gap-10 mr-[200px] max-md:mr-0">
          <h1 className="text-2xl font-semibold">Cart Totals</h1>
          <div>
            <div className="flex justify-between py-4">
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="flex justify-between py-4">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="flex justify-between py-4">
              <h3 className="font-bold">Total</h3>
              <h3 className="font-bold">${getTotalCartAmount()}</h3>
            </div>
          </div>
          <button className="w-[262px] h-[58px] bg-[#ff5a5a] text-white text-base font-semibold border-none cursor-pointer max-md:w-full max-md:max-w-[262px]">PROCEED TO CHECKOUT</button>
        </div>
        
        <div className="flex-1 text-base font-medium">
          <p className="text-[#555]">If you have a promo code, Enter it here</p>
          <div className="w-[504px] mt-4 pl-5 h-[58px] bg-[#eaeaea] flex justify-between items-center max-md:w-full max-md:max-w-[504px]">
            <input type="text" placeholder="promo code" className="border-none outline-none bg-transparent text-base w-[330px] h-[50px]" />
            <button className="w-[170px] h-[58px] bg-black text-white text-base cursor-pointer max-sm:w-[120px]">Submit</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItems;