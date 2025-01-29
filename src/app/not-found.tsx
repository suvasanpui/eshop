import Container from '@/components/Container'
import Image from 'next/image'
import React from 'react'
import notFound from '@/assets/notFound.webp'
import ButtonIcon from '@/components/ButtonIcon'

const NotFoundPage = () => {
  return (
    <Container className='flex gap-2 flex-col items-center py-10'>
        <Image src={notFound} alt='notFoundImage' className=' max-w-60 '/>
        <p className=' text-xl font-semibold '> Oops ! Page Not Found </p>
        <p className=' text-sm text-gray-500 max-w-80 text-center '> Whoops , this is embarrshing .Looks like the page you were looking for wash&apos;t found.</p>
        <ButtonIcon href='/'>Back to Home</ButtonIcon>
    </Container>
  )
}

export default NotFoundPage