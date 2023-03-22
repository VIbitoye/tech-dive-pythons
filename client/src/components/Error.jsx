import React from 'react'
import logo from "./medical_logo.png";
import { Link } from 'react-router-dom'
function Error() {
  return (
    <div className='flex items-center justify-center h-screen'>
        <div className='flex flex-col'>
        <div className='flex text-7xl sm:text-7xl justify-center -translate-y-[4rem] md:text-9xl font-semibold'>404</div>
        <div className= 'mb-10 text-2xl sm:text-4xl md:text-4xl'>The requested page could not be found</div>
    <Link to = '/exams' className='text-green-500 font-semibold text-2xl md:text-4xl'>Go to exams</Link>
        </div>
    </div>
  )
}

export default Error