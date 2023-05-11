import React from 'react'

function Pagination({totalRecords, perPage, currentPage, setCurrentPage}) {
    
  //calculating the total number of pages needed
    let pages = [];
    for (let i = 1; i <= Math.ceil(totalRecords / perPage); i++){
        pages.push(i)
    }
  return (
    <div className='flex justify-center mt-2 mb-2'>
  <div className='flex items-center border border-gray-400 drop-shadow-lg w-fit rounded-md'>
    {pages.map((page, index) => {
      return (
        <button
         // applying appropriate styles and classes to the pagination buttons
          className={`flex items-center  md:w-[3.2rem] focus:bg-green-400 active:bg-green-400 hover:bg-green-200 text-gray-600 font-semibold border-r border-gray-400 justify-center md:px-4 px-2 ${
            currentPage === page ? 'bg-green-400' : ''
          } `}
          // use the index as the key for the button
          key={index}

          // set the current page when the user clicks on a button
          onClick={() => {
            setCurrentPage(page);
            window.scrollTo(0, 50);
          }}
          style={index === pages.length - 1 ? { borderRight: 'none' } : {}}
        >
          {page}
        </button>
      );
    })}
  </div>
</div>
  )
}

export default Pagination