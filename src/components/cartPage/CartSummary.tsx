import React, { useEffect, useState } from "react";
import Title from "../Title";
import ProductPriceFormat from "../ProductPriceFormat";
import { ProductType } from "@/types/type";
import { useSession } from "next-auth/react";
import { loadStripe } from "@stripe/stripe-js";

interface Props {
  cart: ProductType[];  // Changed to array type
}
const CartSummary = ({ cart }: Props) => {
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);

  const {data:session}=useSession();


  

  useEffect(() => {
    const amt = cart.reduce((acc, item) => 
      acc + (item?.price * (item?.quantity || 0)), 0
    );
    
    const discount = cart.reduce((acc, item) => 
      acc + (((item?.price * (item?.discountPercentage || 0)) / 100) * (item?.quantity || 0)), 0
    );

    setTotalAmount(amt);
    setDiscountAmount(discount);
  }, [cart]);
  const stripePromise=loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);
  const handleCheckout=async()=>{
    const stripe=await stripePromise;
    const response=await fetch('/api/checkout',{
      method:'POST',
      headers:{
        "Content-Type":"application/json",
      },
      body:JSON.stringify({
        items:cart,
        email:session?.user?.email,
      })
    })
    const checkoutSession=await response?.json();
    const result=await stripe?.redirectToCheckout({
      sessionId:checkoutSession?.id,
    })
    if(result?.error){
      console.error(result?.error.message);
    } 
  }
  return (
    <div className=" bg-gray-100 rounded-lg px-4 py-6 sm:p-10 lg:col-span-5 mt-10 lg:mt-0">
      <Title>Cart Summary</Title>
      <div className=" mt-5 flex flex-col gap-3">
        <div className=" flex items-center justify-between">
          <Title className=" text-lg font-medium "> Sub Total</Title>
          <ProductPriceFormat amount={totalAmount} />
        </div>
        <div className=" flex items-center justify-between">
          <Title className=" text-lg font-medium ">Discount</Title>
          <ProductPriceFormat amount={discountAmount} />
        </div>
        <div className=" flex items-center justify-between">
          <Title className=" text-lg font-medium "> Payble Amount</Title>
          <ProductPriceFormat amount={totalAmount-discountAmount} className=" text-lg font-bold" />
        </div>
        
          <button onClick={handleCheckout} className=" p-2 text-gray-800 bg-blue-500 hover:bg-gray-100 hover:text-green-700">Checkout</button>
        
      </div>
    </div>
  );
};

export default CartSummary;
