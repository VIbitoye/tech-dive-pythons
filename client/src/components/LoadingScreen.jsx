import React from 'react'
import { BarLoader } from 'react-spinners'
function LoadingScreen() {
  return (
    <div className='flex flex-col items-center justify-center h-screen '>
      <BarLoader color="#36d7b7" 
      width={600}
      /><h2 className='mt-10 text-3xl'> Loading
      </h2>
    </div>
  )
}

export default LoadingScreen