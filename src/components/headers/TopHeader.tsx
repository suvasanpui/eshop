import Container from '../Container'
import React from 'react'
import { FaTruck } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";

function TopHeader() {
  return (
    <div className=' bg-[#010f1c] text-gray-200'>
      <Container className='flex items-center justify-between'>
        <p className='w-full md:w-auto text-sm flex items-center justify-center md:justify-normal font-medium py-1 '>
          <FaTruck className='text-[#ffb342] text-2xl mr-1'/> Express shipping on order $499+
        </p>
        <div className=' hidden md:inline-flex items-center text-sm text text-white'>
          <p className='flex items-center gap-x-1 border-r-[1px] border-r-gray-400 px-4'>English <IoIosArrowDown className='mt-1'/> </p>
          <p className='flex items-center gap-x-1 border-r-[1px] border-r-gray-400 px-4'>INR <IoIosArrowDown className='mt-1'/> </p>
          <p className='flex items-center gap-x-1 border-r-[1px] border-r-gray-400 px-4'>Setting <IoIosArrowDown className='mt-1'/> </p>
        </div>
        
      </Container>
      
    </div>
  )
}

export default TopHeader