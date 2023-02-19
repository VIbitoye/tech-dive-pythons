import React from 'react'

function Pagination({totalRecords, perPage, currentPage, setCurrentPage}) {
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalRecords / perPage); i++){
        pages.push(i)
    }
  return (
    <div className='flex items-center justify-center'>
    <div className=' flex items-center border w-fit  rounded-md'>
        {
        pages.map((page, index) =>{
        return <button  
        className={`flex items-center text-gray-700 font-semibold border-r-2 border-gray-200 justify-center px-4 ${currentPage === page ? 'bg-green-200' : ''} ${index === pages.length - 1 ? 'border-r-0' : ''}`}  
        key = {index} onClick ={()=> setCurrentPage(page)}>
          {page}
        </button> })}
    </div>
    </div>
  )
}

export default Pagination