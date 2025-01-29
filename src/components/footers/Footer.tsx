import React from 'react'
import Container from '../Container'
import Link from 'next/link'
import Image from 'next/image'
import logo from '@/assets/logo.webp'
import SocialLinks from '../SocialLinks'
import Title from '../Title'
import { navigation } from '@/constants'
import { GoDotFill } from 'react-icons/go'
import { BsEnvelopeAt } from 'react-icons/bs'
import { GrLocation } from 'react-icons/gr'

const Footer = () => {
  return (
    <div className=' bg-lightBG py-10 lg:py-20'>
        <Container className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5'>
            <div className='flex flex-col gap-y-5 '>
                <Link href={'/'}>
                    <Image src={logo} alt='logo'/>
                </Link>
                <p>We are a team of designers and Developers that create high quality of software</p>
                <SocialLinks className=' bg-themeWhite border border-themeColor shadow-md text-black p-3 text-lg hover:bg-themeColor hover:text-themeWhite cursor-pointer duration-200 ml-2 rounded-md'/>
            </div>
            <div>
              <Title>My Account</Title>
              <div className='mt-3 flex flex-col gap-y-2'>
                {navigation?.map((items)=>(
                  <Link key={items?.title} href={items?.href} className=' flex items-center gap-x-2 text-gray-700 hover:text-themeColor duration-300 font-medium '>
                    <GoDotFill size={10}/>
                    {items?.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Title>Information</Title>
              <div className='mt-3 flex flex-col gap-y-2'>
                {navigation?.map((items)=>(
                  <Link key={items?.title} href={items?.href} className=' flex items-center gap-x-2 text-gray-700 hover:text-themeColor duration-300 font-medium '>
                    <GoDotFill size={10}/>
                    {items?.title}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Title>Talk to Us</Title>
              <div className='mt-3 flex flex-col gap-y-2'>
                <div>
                  <p className='text-sm'> Got any Query? Call Us</p>
                  <Title className=' font-medium text-base text-gray-800'>+91 7479108631</Title>
                </div>
                <div className='mt-3'>
                  <p className='text-base flex items-center gap-x-3 text-gray-600'>
                    <BsEnvelopeAt/>suvasanpui74@gmil.com
                  </p>
                  <p className='text-base flex items-center gap-x-3 text-gray-600'>
                    <GrLocation/>Kolkata, India
                  </p>
                </div>
              </div>
            </div>
        </Container>
    </div>
  )
}

export default Footer