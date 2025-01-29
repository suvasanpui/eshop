"use client";
import Link from "next/link";
import React from "react";
import { MdFavoriteBorder } from "react-icons/md";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { useSelector } from "react-redux";
import { StateType } from '@/types/type';

// HeaderIcons component displays favorite and cart icons with count badges
function HeaderIcons() {
  const {cart , favorite} = useSelector((state: StateType) => state.counter);
  console.log(cart)
  return (
    <>
      {/* Favorite link with counter badge */}
      <Link href={"/favorite"} className="text-2xl relative ">
        <MdFavoriteBorder />
        <span className=" absolute -top-1 text-[10px] font-medium w-4 h-4 bg-themeColor -right-1 text-white rounded-full flex items-center justify-center ">
          {favorite?.length>0 ? favorite?.length : '0'}
        </span>
      </Link>

      {/* Shopping cart link with counter badge */}
      <Link href={"/cart"} className="text-2xl relative ">
        <LiaShoppingBagSolid />
        <span className=" absolute -top-1 text-[10px] font-medium w-4 h-4 bg-themeColor -right-1 text-white rounded-full flex items-center justify-center ">
        {cart?.length>0 ? cart?.length : '0'}
        </span>
      </Link>
    </>
  );
}

export default HeaderIcons;
