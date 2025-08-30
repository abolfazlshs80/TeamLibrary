import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import { IoMdHome , IoMdSearch ,IoMdLogIn  } from "react-icons/io";
const Header = () => {
  return (
    <div className='fixed z-20 top-0 left-0  right-0 flex justify-between items-center p-4 bg-white/10 backdrop-blur-md shadow-sm'>
        <div className='flex items-center gap-2'>
            <Image src={logo} alt='logo' width={35} height={35}/>
            <p className='flex gap-4 text-[#435F56] text-base font-bold'>کتابخانه </p>
        </div>
        <div>
            <ul className='flex gap-4 text-[#435F56] text-[14px] font-semibold'>
                <li ><Link className='inline-flex items-center space-x-1' href={'/'}><span>صفحه اصلی</span><IoMdHome size={18}/></Link></li>
                <li><Link className='inline-flex items-center space-x-1' href={'/'}><span>جستجو کتاب</span><IoMdSearch size={18}/></Link></li>
                <li><Link href={'/'}>درباره ما</Link></li>
                <li><Link className='inline-flex items-center space-x-1' href={'/login'}><span>ورود/ساخت حساب</span><IoMdLogIn size={18}/></Link></li>
            </ul>
        </div>
        
    </div>
  )
}

export default Header