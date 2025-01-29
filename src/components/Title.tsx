import React from 'react'
import { twMerge } from 'tailwind-merge';

interface props{
    children?:React.ReactNode;
    className?: string;
}

const Title = ({children , className}:props) => {
  return (
    <h2 className={twMerge('text-xl font-semibold flex items-center',className)}>
        {children}
    </h2>
  )
}

export default Title