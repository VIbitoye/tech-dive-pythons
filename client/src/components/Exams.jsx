import React from 'react'
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
import { useExamsContext } from '../hooks/useExamsContext';
function Exams() {
  const {exams, dispatch} = useExamsContext()
  const searchProperties = ["examId", "patientId", "sex", "mortality", "zip", "numIcuAdmits", "age"];
  //Fetching the API
  useEffect(() => {
    const fetchExams = async () =>{
      if (exams === null) {
        return <div>Loading...</div>
      }
      
    const response = await fetch('http://localhost:5000/api/exams')
    const data = await response.json()
    if (response.ok){
    
  dispatch({type: 'GET_EXAMS', payload: data})
  
    }
    }
    fetchExams()
    console.log('Data from state:', exams)
   }, [])

 //Pagination of the records
 const [currentPage, setCurrentPage] = useState(1)
 const [perPage, setPerPage] = useState (10);
 const lastRecordIndex = currentPage * perPage;
 const firstRecordIndex = lastRecordIndex - perPage;




const[search,setSearch] = useState("");
console.log(search);

const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  const searchHandler = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when searching
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortBy === key && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortBy(key);
    setSortDirection(direction);
  
    const sortedExams = [...exams].sort((a, b) => {
      let aValue = a[key];
      let bValue = b[key];
  
      //for converting only the strings that are numbers into number types
      if (!isNaN(aValue) && !isNaN(bValue)) {
        aValue = parseInt(aValue, 10);
        bValue = parseInt(bValue, 10);
      }
  
      if (direction === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  
    dispatch({ type: 'SORT_EXAMS', payload: sortedExams });
  };

  const filteredItems = exams && exams.filter((exam) =>
  searchProperties.some((prop) => exam[prop].toLowerCase().includes(search.toLowerCase()))
);

 const currentRecords = filteredItems && filteredItems.slice(firstRecordIndex, lastRecordIndex)
 const totalRecords = filteredItems?.length;
  return (
    <div className="container mx-auto px-4 sm:px-8  mt-[4rem]">
    <div className="py-4">
          
           {/*header */}
           <div>
            <h2 className="text-3xl font-semibold leading-tight text-center mb-1 sm:text-left sm:ml-10 lg:w-1/2 xl:w-5/12">View Examinations</h2>
            </div>

           {/*search bar */}
           <div className="p-4">
              <input
                onChange={searchHandler}
                value={search}
                type="search"
                className="form-control relative flex-auto w-full md:w-3/4 lg:w-1/2 xl:w-2/3 mx-auto mb-5 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>

        {/*pagination of records */}
          <Pagination 
          totalRecords={totalRecords} 
          perPage = {perPage}
          currentPage = {currentPage}
          setCurrentPage = {setCurrentPage}
        />
      {/*table*/}
      
      <div className="px-5 sm:px-8 py-4 overflow-x-auto">
          <div className="shadow-md rounded-lg overflow-hidden">

          <table className=" table-auto w-full leading-normal text-left">
            {/*table headers
            contains an onclick function to sort them in ascending or descending order*/}
            <thead>
              <tr>
                {/*table headers*/}
                <th onClick={() => handleSort('patientId')}
                
                  className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  
                  Patient ID { sortBy === 'patientId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                 {/*table headers*/}
                <th onClick={() => handleSort('examId')}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  Exam ID { sortBy === 'examId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                      {/*table headers*/}
                <th 
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700  tracking-wider"
                >
                 Image
                </th>
                  {/*table headers*/}
                <th onClick={() => handleSort('mortality')}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Mortality { sortBy === 'mortality' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                  {/*table headers*/}
                <th onClick={() => handleSort('numIcuAdmits')}
                  className="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                 ICU Admits { sortBy === 'numIcuAdmits' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                   {/*table headers*/}   

                <th onClick={() => handleSort('age')}
                  className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  Age { sortBy === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                    {/*table headers*/}
                <th onClick={() => handleSort('sex')}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  Sex { sortBy === 'sex' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}
                <th onClick={() => handleSort('bmi')}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  BMI { sortBy === 'bmi' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}

                <th onClick={() => handleSort('zip')}
                  className="px-4 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  {/*condition for  */}
                  Zip Code { sortBy === 'zip' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                    {/*table headers*/}
                <th 
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
              </tr>
            </thead>
            <tbody>
                {/*mapping the api data onto the table */}
               {currentRecords.map((exam) => (<tr key = {exam.id} className= ' border-b border-gray-200 h-[10rem] hover:bg-blue-500'>
                  {/*table data */}
                        <td className=" px-6 py-5 border-gray-200 text-center text-green-600 bg-white font-semibold text-sm"><Link to ={`/patient/${exam.patientId}`}>{exam.patientId}</Link> </td>       
                        <td className=" px-5 py-5  border-gray-200 text-green-600 bg-white  font-semibold text-sm"><Link to={`/exams/${exam._id}`}>{exam.examId}</Link></td>
                        <td className=" px-7 py-5  border-gray-200 w-[10rem] bg-white text-sm"><img className='rounded' src = {exam.pngFileName} alt = 'x-ray photo'/></td>
                        <td className=" px-[3rem] py-5  border-gray-200 bg-white text-sm">{exam.mortality}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.numIcuAdmits}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.age}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.sex}</td> 
                        <td className=" px-6 py-5 border-gray-200 bg-white text-sm">{exam.bmi}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm"> {exam.zip}</td> 


                        
               
              </tr>))}
                    
             
            </tbody>
          </table>
        </div>
      </div>
      <Pagination 
        totalRecords = {totalRecords} 
        perPage = {perPage}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        />
    </div>
  </div>
  )
}

export default Exams