import React from "react";
import { Link } from "react-router-dom";
import logo from "./medical_logo.png";
import { useState } from "react";
import './Navbar.css';
function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      id="navbar-container"
      className="fixed top-0 z-10 w-full bg-[#50936d] h-[4rem] flex items-center justify-center text-white text-lg drop-shadow-md"
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center">
          <Link to="/exams" className="flex items-center ">
            <img className="md:w-[3rem]" src={logo} alt="" />
            <span className="ml-2 text-sm md:text-xl font-semibold">
              Pythons Medical Center
            </span>
          </Link>
        </div>
        <div className="hidden sm:flex sm:items-center font-semibold sm:ml-6 gap-1">
          <Link to="/exams" className="bg-[#2e7c4d] text-white active:bg-green-600 font-bold uppercase text-base px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            EXAMS
          </Link>
          <Link to="/admin" className="bg-[#2e7c4d] text-white active:bg-green-600 font-bold uppercase text-base px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150">
            ADMINISTRATION
          </Link>
        </div>
        <div className="sm:hidden relative">
  <button className="mobile-menu-button mt-2 right-0" onClick={toggleMobileMenu}>
    <svg className="w-8 h-6 " fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  </button>
  <div className={`sm:hidden ease-in-out mobile-menu mt-2 ${isMobileMenuOpen ? 'block dropdown' : 'hidden'} bg-[#50936d] ml-2 py-1 px-1 h-fit rounded-md absolute -right-4 animated slide-in-left`}>

    <Link to="/exams" className="block px-2 py-1 tracking-wider text-left text-white font-semibold bg-[#2e7c4d] hover:bg-[#266140] ">
      EXAMS
    </Link>
    <Link to="/admin" className="block px-2 py-1 mt-1 text-left text-white font-semibold bg-[#2e7c4d] hover:bg-[#266140] ">
      ADMINISTRATION
    </Link>
  </div>
</div>
      </div>
    </div>
  );
}

export default Navbar;
