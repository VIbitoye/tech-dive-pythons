import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <div id="navbar-container" className="fixed top-0 z-10 w-full bg-[#50936d] h-[4rem] flex items-center justify-center text-white text-lg drop-shadow-md">
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/exams" className="flex items-center">
            <img src="" alt="" />
            <span className="ml-2 font-semibold">LOGO</span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:items-center font-semibold sm:ml-6">
          <Link to="/exams" className="flex items-center px-3 py-2 rounded-md text-white hover:bg-[#266140] bg-[#2e7c4d]">
            EXAMS
          </Link>
          <Link to="/admin" className="flex items-center px-3 py-2 ml-4 text-white bg-[#2e7c4d] hover:bg-[#266140] rounded-md">
            ADMINISTRATION
          </Link>
        </div>
        <div className="sm:hidden">
          <button className="mobile-menu-button">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="sm:hidden mobile-menu">
        <Link to="/exams" className="block px-4 py-2 text-white font-semibold hover:bg-[#266140]">
          EXAMS
        </Link>
        <Link to="/admin" className="block px-4 py-2 mt-1 text-white font-semibold bg-[#2e7c4d] hover:bg-[#266140] rounded-md">
          ADMINISTRATION
        </Link>
      </div>
    </div>
  )
}

export default Navbar