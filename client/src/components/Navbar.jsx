import React from 'react'
import Link from 'react'
function Navbar() {
  return (
    <div id='navbar'>
        Navbar
        <Link to = '/'></Link>  
        <Link to = '/exams'>Exams</Link>
        <Link to = '/admin'>Administration</Link>
    
    </div>
  )
}

export default Navbar