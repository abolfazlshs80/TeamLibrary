'use client';
import { useState , useEffect } from 'react';
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import { IoMdHome , IoMdSearch ,IoMdLogIn  } from "react-icons/io";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen]= useState(false);
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <header className='fixed z-20 top-0 left-0  right-0 flex justify-between items-center p-4 bg-white/10 backdrop-blur-md shadow-sm'>
        <div className='flex items-center gap-2'>
            <Image src={logo} alt='logo' width={35} height={35}/>
            <p className='flex gap-4 text-[#435F56] text-base font-bold'>کتابخانه </p>
        </div>
        <nav className='hidden md:block'>
            <ul className='flex gap-4 text-[#435F56] text-[14px] font-semibold'>
                <li ><Link className='inline-flex items-center space-x-1' href={'/'}><span>صفحه اصلی</span><IoMdHome size={18}/></Link></li>
                <li><Link className='inline-flex items-center space-x-1' href={'/'}><span>جستجو کتاب</span><IoMdSearch size={18}/></Link></li>
                <li><Link href={'/'}>درباره ما</Link></li>
                <li><Link className='inline-flex items-center space-x-1' href={'/'}><span>ورود/ساخت حساب</span><IoMdLogIn size={18}/></Link></li>
            </ul>
        </nav>
        <button 
        className='md:hidden text-[#435F56] text-2xl'
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label='منوی اصلی'
        aria-expanded={isMenuOpen}
      >
        ☰
      </button>
      {isMenuOpen && (
        <div className='fixed inset-0 bg-white/50 z-10' onClick={() => setIsMenuOpen(false)}>
          <div 
            className='absolute top-16 left-0 bg-[#435F56] w-64 p-4 rounded-br-md '
            onClick={(e) => e.stopPropagation()}
          >
            <ul className='flex flex-col gap-4 text-[#F7F5E9] text-[14px] font-semibold'>
              <li className='hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200 '><Link href='/' onClick={() => setIsMenuOpen(false)}>صفحه اصلی</Link></li>
              <li className='hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200 '><Link href='/' onClick={() => setIsMenuOpen(false)}>جستجو کتاب</Link></li>
              <li className='hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200 '><Link href='/' onClick={() => setIsMenuOpen(false)}>درباره ما</Link></li>
              <li className='hover:bg-[#F7F5E9] hover:text-[#435F56] hover:pr-2 hover:border-r-2 border-[#B2685A]
               transition-all duration-200'><Link href='/' onClick={() => setIsMenuOpen(false)}>ورود/ساخت حساب</Link></li>
            </ul>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header