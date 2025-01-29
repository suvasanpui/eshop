import Link from 'next/link';
import React from 'react'
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { twMerge } from 'tailwind-merge';


interface props {
  className?: string;
  iconstyle?:string;
}


const linkData=[
    {icon: <FaGithub/> , href:"#"},
    {icon: <FaFacebook/> , href:"#"},
    {icon: <FaYoutube/> , href:"#"},
    {icon: <FaLinkedin/> , href:"#"},
];
const SocialLinks = ({className,iconstyle}:props) => {
  return (
    <div className=' text-xl py-2 text-white/50 flex items-center gap-x-2 '>
        {linkData?.map((items,index)=>(
            <Link target='blank' href={items?.href} key={index} className={twMerge('border border-white/20 inline-flex p-2 rounded-full hover:text-skyColor hover:border-skyColor duration-300 cursor-pointer',iconstyle,className)}>
                {items?.icon}
            </Link>
        ))}
    </div>
  )
}

export default SocialLinks