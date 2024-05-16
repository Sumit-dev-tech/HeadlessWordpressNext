import React from 'react';
import Image from 'next/image';
import Link from 'next/link';


const Navbar = () => {
  return (
    <>
      <header className=' container mx-auto lg:max-w-[1000px] flex justify-between items-center '>
                <div className='logo-area'>
                    <Link href="/" className='flex justify-center'>
                        <Image width={100} height={100} alt='' src='/logo.png' />
                    </Link>

                </div>
                <nav>
                    <ul className='flex flex-row justify-center items-center [&>li>a]:px-5 [&>li>a]:py-2 [&>li>a]:text-white [&>li>a]:opacity-90 [&>li>a:hover]:text-yellow-400 [&>li>a]:cursor-pointer [&>li>a]:transition text-xl z-10'>
                        <li><Link href="/" className='text-white'>Home</Link></li>
                        <li><Link href="/about">About</Link></li>
                        <li><Link href="/blog">Blog</Link></li>
                        <li><Link href="/contact">Contact</Link></li>
                    </ul>
                </nav>
            </header>
    </>
  )
}

export default Navbar
