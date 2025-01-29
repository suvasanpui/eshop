import Container from '@/components/Container'
import Title from '@/components/Title'
import Link from 'next/link'
import React from 'react'

const CancelPage = () => {
  return (
    <Container className='py-10'>
      <div className='flex flex-col items-center gap-2'>
        <Title>Payment Failed!</Title>
        <p className='text-red-500 text-center mt-2'>
          Something went wrong during the payment process. Please try again.
        </p>
        <Link 
          href="/cart" 
          className='bg-black text-slate-100 px-8 py-2 mt-4 rounded-md hover:bg-slate-800'>
          Return to Cart
        </Link>
      </div>
    </Container>
  )
}

export default CancelPage