import React from 'react'
import { assets } from '../../assets/assets'
import SearchBar from './SearchBar'

//className='flex flex-col items-center justify-center h-screen'
const Hero = () => {
  return (
    <div>
      <div className='flex flex-col items-center justify-center w-full md:pt-36 pt-20 px-7 md:px-0 space-y-7 
      text-center bg-gradient-to-b from-cyan-100'  >
      <h1 className='md:text-home-heading-large text-home-heading-small relative font-bold text-gray-800
       max-w-3xl mx-auto ` ' >Empower Your future with the 
       courses designed to  <span className='text-cyan-600'>fit your choice</span> 
      <img src={assets.sketch} alt="sketch" className='md:block hidden absolute -bottom-7 right-0' />  </h1>
      <p className='md:block hidden text-gray-500 max-w-2xl mx-auto' >Lorem ipsum dolor sit amet consectetur
         adipisicing elit. Quisquam, quae adgvaubdibxnmoqiwjdinw 
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, </p>
      <p className='md:hidden block text-gray-500 max-w-sm mx-auto' >Lorem ipsum dolor sit amet consectetur 
        adipisicing elit. Quisquam,</p>
      <SearchBar/>
      </div>

      
    </div>
  )
}

export default Hero