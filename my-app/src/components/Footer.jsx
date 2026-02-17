import React from 'react'
import { assets } from '../assets/assets';

const Footer = () => {
  return (
    <div>
      <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
        
        {/* --- Left Section: Logo & Description --- */}
        <div>
          <img src={assets.logo} className='mb-5 w-32' alt="Logo" />
          <p className='w-full md:w-2/3 text-gray-600'>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
          </p>
        </div>

        {/* --- Center Section: Navigation --- */}
        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li className='cursor-pointer'>Home</li>
            <li className='cursor-pointer'>About Us</li>
            <li className='cursor-pointer'>Delivery</li>
            <li className='cursor-pointer'>Privacy Policy</li>
          </ul>
        </div>

        {/* --- Right Section: Contact --- */}
        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+1-212-456-7890</li>
            <li>contact@foreveryou.com</li>
          </ul>
        </div>

      </div>

      {/* --- Bottom Section: Copyright --- */}
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>
          Copyright 2024 @ forever.com - All Rights Reserved.
        </p>
      </div>

    </div>
  )
}

export default Footer;