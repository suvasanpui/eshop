"use client";
import { ProductType } from '@/types/type'
import React, { useEffect, useState } from 'react'
import ProductPriceFormat from './ProductPriceFormat';
import { useSelector } from 'react-redux';
import { StateType } from '@/types/type';

const ProductPrice = ({product}:{product:ProductType}) => {
  const { cart } = useSelector((state: StateType) => state.counter);
  const [existingProduct, setExistingProduct] = useState<ProductType | null>(null);
  useEffect(() => {
    const avalableProduct = cart?.find((items) => items.id === product?.id);
    if (avalableProduct) {
      setExistingProduct(avalableProduct);
    }
  }, [cart, product]);
    const regularPrice = product?.price;
    const discountPrice = product?.price ? 
        product.price * (1 - (product.discountPercentage || 0)/100) 
        : 0;
  return (
    <div className=' flex items-center gap-2'>
        <ProductPriceFormat className=' text-gray-500 line-through font-normal' amount={existingProduct? regularPrice * existingProduct.quantity! : regularPrice}/>
        <ProductPriceFormat className=' font-semibold text-skyColor' amount={existingProduct? discountPrice * existingProduct.quantity! : discountPrice}/>
    </div>
  )
}

export default ProductPrice
