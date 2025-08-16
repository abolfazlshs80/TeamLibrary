import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='fixed z-20 top-0 left-0 right-0 flex justify-between items-center p-4 bg-white/10 backdrop-blur-md shadow-sm'>
        <div className='flex items-center gap-4'>
            <p>کتابخانه </p>
            {/* <Image src={} alt='logo' width={50} height={50}/> */}
        </div>
        <div>
            <ul className='flex gap-4'>
                <li><Link href={'/'}>صفحه اصلی</Link></li>
                <li><Link href={'/'}>جستجو کتاب</Link></li>
                <li><Link href={'/'}>درباره ما</Link></li>
                <li><Link href={'/'}>ورود/ساخت حساب</Link></li>
            </ul>
        </div>
        
    </div>
  )
}

export default Header