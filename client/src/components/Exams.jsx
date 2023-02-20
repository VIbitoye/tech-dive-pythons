import React from 'react'
import Pagination from './Pagination';
import { useState, useEffect } from 'react';
import { Link, useRouteMatch } from "react-router-dom";
function Exams() {
  const [exams, setExams] = useState([]);
  //Fetching the API
  useEffect(() => {
    const fetchExams = async () =>{
    const response = await fetch('http://localhost:5000/api/exams')
    const data = await response.json()
    if (response.ok){
      setExams(data)
    }
    }
    fetchExams()
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

    setExams([...exams].sort((a, b) => {
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
    }));
  };
  const filteredItems = exams.filter((exam) =>
  exam.examId.toLowerCase().includes(search.toLowerCase()) || exam.patientId.toLowerCase().includes(search.toLowerCase()) || exam.sex.toLowerCase().includes(search.toLowerCase()) || exam.mortality.toLowerCase().includes(search.toLowerCase()) || exam.zip.toLowerCase().includes(search.toLowerCase())
  || exam.numIcuAdmits.toLowerCase().includes(search.toLowerCase())
  || exam.age.toLowerCase().includes(search.toLowerCase())
);
 const currentRecords = filteredItems.slice(firstRecordIndex, lastRecordIndex)

  return (
    <div class="container mx-auto px-4 sm:px-8  mt-[4rem]">
    <div class="py-4">
          
           {/*header */}
               <div>
                  <h2 class="text-3xl font-semibold leading-tight text-left mb-1 sm:w-[50rem]">View Examinations</h2>
               </div>

           {/*search bar */}
      <div class = "p-4 ml-6 min-w-full ">
      <input onChange ={searchHandler}
      value={search}
       type="search"
        class="form-control relative flex-auto ml-[-2rem] min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-black focus:outline-none" 
        placeholder="Search"
         aria-label="Search" 
         aria-describedby="button-addon2"/>
      </div>
        {/*pagination of records */}
          <Pagination 
          totalRecords = {exams.length} 
          perPage = {perPage}
          currentPage = {currentPage}
          setCurrentPage = {setCurrentPage}
        />
      {/*table*/}
      
      <div class="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          class="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        >
          <table class="min-w-full leading-normal text-left ">
            {/*table headers
            contains an onclick function to sort them in ascending or descending order*/}
            <thead>
              <tr>
                {/*table headers*/}
                <th onClick={() => handleSort('patientId')}
                
                  class="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  
                  Patient ID { sortBy === 'patientId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                 {/*table headers*/}
                <th onClick={() => handleSort('examId')}
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  Exam ID { sortBy === 'examId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                      {/*table headers*/}
                <th 
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700  tracking-wider"
                >
                 Image
                </th>
                  {/*table headers*/}
                <th onClick={() => handleSort('mortality')}
                  class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Mortality { sortBy === 'mortality' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                  {/*table headers*/}
                <th onClick={() => handleSort('numIcuAdmits')}
                  class="px-1 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                 ICU Admits { sortBy === 'numIcuAdmits' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                   {/*table headers*/}   

                <th onClick={() => handleSort('age')}
                  class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  Age { sortBy === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                    {/*table headers*/}
                <th onClick={() => handleSort('sex')}
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  Sex { sortBy === 'sex' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}
                <th onClick={() => handleSort('bmi')}
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                >
                  BMI { sortBy === 'bmi' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
                </th>
                      {/*table headers*/}

                <th onClick={() => handleSort('zip')}
                  class="px-1 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                >
                  {/*condition for  */}
                  Zip Code { sortBy === 'zip' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}
                </th>

                    {/*table headers*/}
                <th 
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
              </tr>
            </thead>
            <tbody>
                {/*mapping the api data onto the table */}
               {currentRecords.map((exam) => (<tr key = {exam.id} class= ' border-b border-gray-200 h-[10rem] hover:bg-blue-500'>
                  {/*table data */}
                        <td class=" px-6 py-5 border-gray-200 text-center text-green-600 bg-white font-semibold text-sm"><Link to ={`/patient/${exam.patientId}`}>{exam.patientId}</Link> </td>       
                        <td class=" px-5 py-5  border-gray-200 text-green-600 bg-white  font-semibold text-sm"><Link to={`/exams/${exam._id}`}>{exam.examId}</Link></td>
                        
                        <td class=" px-7 py-5  border-gray-200 w-[13rem] bg-white text-sm"><img src = {`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${exam.pngFileName}`} alt = 'x-ray photo'/></td>
                        <td class=" px-[3rem] py-5  border-gray-200 bg-white text-sm">{exam.mortality}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.numIcuAdmits}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.age}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.sex}</td> 
                        <td class=" px-6 py-5 border-gray-200 bg-white text-sm">{exam.bmi}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm"> {exam.zip}</td> 


                        
               
              </tr>))}
                    
             
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Exams