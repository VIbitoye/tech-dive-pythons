import React from 'react'

function Pagination({totalRecords, perPage, currentPage, setCurrentPage}) {
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
          className={`flex items-center sm:w-[1rem] md:w-[3.2rem] focus:bg-green-400 active:bg-green-400 hover:bg-green-200 text-gray-600 font-semibold border-r border-gray-400 justify-center px-4 ${
            currentPage === page ? 'bg-green-400' : ''
          } `}
          key={index}
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