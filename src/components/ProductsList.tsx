"use client";
import React from 'react'
import Container from './Container'
import ProductsCart from './ProductsCart';
import { ProductType } from '@/types/type';

interface Props {
    products: ProductType[];
}
const ProductsList = ({products} : Props) => {
  return (
    <Container className=' py-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
        {products?.map((items:ProductType)=>(
            <ProductsCart key={items?._id || items?.id} product={items}/>
        ))}
    </Container>
  )
}

export default ProductsList