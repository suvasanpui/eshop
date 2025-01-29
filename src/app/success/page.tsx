import Container from '@/components/Container'
import { redirect, useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { resetCart } from '../redux/counterSlice'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { BsArrowLeft } from 'react-icons/bs'

const SuccessPage = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const dispatch = useDispatch();

  useEffect(() => {
    if (!sessionId) {
      redirect("/");
    } else {
      dispatch(resetCart());
      toast.success('Payment successful! 🎉');
    }
  }, [sessionId, dispatch]);

  return (
    <Container className='flex flex-col items-center justify-center py-20 gap-4'>
      <h2 className='text-4xl font-bold text-center'>Your Payment was Successful!</h2>
      <p className='text-center text-xl text-gray-500'>Thank you for shopping with us</p>
      
      <div className='flex items-center gap-8 mt-8'>
        <Link href="/">
          <button className='flex items-center gap-2 bg-black text-slate-100 px-6 py-3 rounded-md hover:bg-slate-800 duration-200'>
            <BsArrowLeft />
            <span>Continue Shopping</span>
          </button>
        </Link>
        <Link href="/orders">
          <button className='flex items-center gap-2 bg-slate-200 text-black px-6 py-3 rounded-md hover:bg-slate-300 duration-200'>
            <span>View Orders</span>
          </button>
        </Link>
      </div>
    </Container>
  )
}

export default SuccessPage