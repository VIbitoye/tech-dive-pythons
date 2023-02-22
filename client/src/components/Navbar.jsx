import React from 'react'
import { Link } from 'react-router-dom'
function Navbar() {
  
  return (

    //container for navbar
    <div id = 'navbar-container' className='container bg-[#50936d] top-0 z-10 sm:min-w-full text-white h-[4rem] drop-shadow-md fixed flex items-center justify-center text-lg'>
        <div className= 'container flex font-semibold gap-[7rem] sm:gap-[25rem] md:gap-[30rem] lg:gap-[46rem]'>

              {/*Nav Links */}
              <Link to ='/exams' className='lg:ml-[13rem] md:mr-[5rem] items-center flex '>
                  <img src=''/> LOGO
               </Link>

             <div className='flex items-center justify-center space-x-[2.5rem]'>

                  <Link to ='/exams' className='flex text-xl hover:bg-[#266140] bg-[#2e7c4d] rounded-[0.3rem] h-[3rem] items-center justify-center w-[8rem]'>
                     EXAMS
                  </Link>
                  <Link to ='/admin' className = 'flex h-[3rem] shadow-sm text-white w-[11rem] items-center justify-center  rounded-[0.3rem] hover:bg-[#266140] bg-[#2e7c4d]'>
                      ADMINISTRATION
                    </Link>
        </div>
      </div>
  
    </div>
  )
}

export default Navbar