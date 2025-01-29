"use client";
import { addToCart, decreaseQuantity, increaseQuantity } from '@/app/redux/counterSlice';
import { ProductType, StateType } from '@/types/type';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { FaMinus, FaPlus } from 'react-icons/fa';

const AddToCartButton = ({ product }: { product: ProductType }) => {
  const { cart } = useSelector((state: StateType) => state.counter);
  const [existingProduct, setExistingProduct] = useState<ProductType | null>(null);
  useEffect(() => {
    const avalableProduct = cart?.find((items) => items.id === product?.id);
    if (avalableProduct) {
      setExistingProduct(avalableProduct);
    }
  }, [cart, product]);
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      toast.success(`${product?.title.substring(0, 10)}... added successfully`);
    }
  };
  console.log(product);
  return (
    <>
      {existingProduct ? (
        <div className='flex self-start items-center justify-center gap-2 py-2 mb-2'>
          <button 
            onClick={() => {
              dispatch(decreaseQuantity((product?._id) || (product?.id)));
              toast.success("Quantity decrease successfully");
            }} 
            disabled={existingProduct?.quantity === 1}
            className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer disabled:text-gray-300 disabled:hover:bg-[#f7f7f7]'
          >
            <FaMinus />
          </button>
          <p className='text-base font-semibold w-10 text-center'>{existingProduct?.quantity}</p>
          <button 
            onClick={() => {
              dispatch(increaseQuantity((product?._id) || (product?.id)));
              toast.success("Quantity added successfully");
            }} 
            className='bg-[#f7f7f7] text-black p-2 border-[1px] border-gray-200 hover:border-skyText rounded-full text-sm hover:bg-white duration-200 cursor-pointer disabled:text-gray-300 disabled:hover:bg-[#f7f7f7]'
          >
            <FaPlus />
          </button>
        </div>
      ) : (
        <button onClick={handleAddToCart} className='bg-transparent border border-skyColor text-black rounded-full py-1.5 hover:bg-skyColor hover:text-white duration-300 my-2'>
          Add to Cart
        </button>
      )}
    </>
  );
};

export default AddToCartButton;