import React from 'react'
import Container from '../Container'
import Image from 'next/image'
import logo from '@/assets/logo.webp'
import SearchInput from './SearchInput'
import Link from 'next/link'
//import { FaRegUser } from "react-icons/fa";
import HeaderIcons from './HeaderIcons'
import MobileNavigation from './MobileNavigation'
import SigninButton from '../SigninButton'

function MiddleHeader() {
  return (
    <div className=' border-b-[1px] border-b-gray-400'>
        <Container className='py-5 flex items-center gap-4 md:gap-6 lg:gap-20 justify-between '>
            <Link href={'/'} className='flex items-center gap-2'>
                <Image src={logo} alt='logo' className='w-28 ' priority/>
            </Link>

            <SearchInput/>

            <div className=' hidden md:inline-flex items-center gap-3'>
                <SigninButton/>
                <HeaderIcons/>
            </div>
            <MobileNavigation/>
        </Container>
    </div>
  )
}

export default MiddleHeader