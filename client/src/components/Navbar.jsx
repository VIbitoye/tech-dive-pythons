import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  
  return (

    //container for navbar
    <div id = 'navbar-container' className='bg-[#50936d] top-0 z-10 md:w-screen text-white h-[4rem] drop-shadow-md fixed flex items-center justify-center text-lg min-w-full'>
        <div className= 'flex font-semibold gap-[25rem] md:gap-[30rem] lg:gap-[45rem]'>

              {/*Nav Links */}
              <Link to ='/exams' className='lg:mr-[30rem] md:mr-[5rem] mr-[10rem] mt-2'>
                  <img src=''/> LOGO
               </Link>

             <div className='flex items-center justify-center space-x-[5rem]'>

                  <Link to ='/exams'>
                     Exams
                  </Link>
                  <Link to ='/admin' className = 'flex h-[3rem] shadow-sm text-white w-[11rem] items-center justify-center  rounded-[0.3rem] hover:bg-[#2a734a] bg-[#22502f]'>
                      ADMINISTRATION
                    </Link>
        </div>
      </div>
  
    </div>
  )
}

export default Navbar