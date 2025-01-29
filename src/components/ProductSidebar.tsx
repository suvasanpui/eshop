"use client";
import { addToFavorite } from '@/app/redux/counterSlice';
import { ProductType, StateType } from '@/types/type';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { FiShoppingCart } from 'react-icons/fi'
import { LuEye } from 'react-icons/lu'
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md'
import { useDispatch, useSelector } from 'react-redux';

export const ProductSidebar = ({product}:{product:ProductType}) => {
  const { favorite } = useSelector((state: StateType) => state.counter);
  const [existingProduct, setExistingProduct] = useState<ProductType | null>(null);
  const dispatch=useDispatch()
  useEffect(() => {
      const avalableProduct = favorite?.find((items) => ((items._id) || (items.id)) === ((product?._id) || (product?.id)));
      if (avalableProduct) {
        setExistingProduct(avalableProduct);
      }else{
        setExistingProduct(null);
      }
    }, [favorite, product , dispatch , existingProduct]);
    const handleFavorite=()=>{
      dispatch(addToFavorite(product))
      if(existingProduct){
        toast.success("Remove favorite successfully");
      }else{
        toast.success("Addedfavorite successfully");
      }
    }
  return (
    <div className=' absolute right-2 bottom-44 border flex flex-col text-2xl border-borderColor bg-white rounded-md overflow-hidden transform translate-x-20 group-hover:translate-x-0 duration-300 z-40'>
        <button className=' p-2 hover:bg-skyColor/5 hover:text-skyColor duration-200'>
            <FiShoppingCart/>
        </button>
        <button  className=' p-2 hover:bg-skyColor/5 hover:text-skyColor duration-200 border-y border-y-borderColor'>
            <LuEye/>
        </button>
        <button onClick={handleFavorite} className=' p-2 hover:bg-skyColor/5 hover:text-skyColor duration-200'>
            {existingProduct? (<MdFavorite className=' text-skyColor'/>) : (<MdFavoriteBorder/>)}
        </button>
    </div>
  )
}
