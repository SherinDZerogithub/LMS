import React from 'react'
import { assets } from '../../assets/assets'

const Footer = () => {
  return (
    <footer className='bg-gray-900 md:px-36 text-left w-full mt-10' >
     <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b
      border-white'>
      <div className='flex flex-col md:items-start items-center w-full' >
        <img src={assets.logo_dark} alt="logo" />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit</p>
      </div>
      <div className='flex flex-col md:items-start items-center w-full' >
        <h2 className='font-semibold text-white mb-5' >Company</h2>
        <ul className='flex md:flex-col w-full justify-between text-sm text-white md:space-y-2' >
          <li> <a href="#">Home</a> </li>
          <li> <a href="#"> About us </a> </li>
          <li> <a href="#"> Contact us </a> </li>
          <li> <a href="#"> Privacy Policy </a> </li>
        </ul>
      </div>
      <div className='hidden md:flex flex-col items-start w-full ' >
        <h2 className='font-semibold text-white mb-5 '> Subscribee to our newsletter </h2>
        <p className='text-sm text-white' >The latest news, articals, and resources , sent to your inbox weekly</p>
        <div className='flex items-center gap-2 pt-4' >
          <input type="email" placeholder='Enter Your Email' className='border border-gray-200 bg-gray-700 text-gray-500 placeholder-gray-500
          outline-none w-64 h-9 rounded x-2 text-sm' />
          <button className='bg-blue-600 w-24 h-9 text-white rounded' >Subcribe</button>
        </div>
      </div>
     </div>
     <p className='py-4 text-center text-xs md:text-sm text-white' > Copyright 2025 @GreatStack All Rights Reserved </p>
    </footer>
  )
}

export default Footer