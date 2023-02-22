import React from 'react'
import Pagination from './Pagination';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Link} from "react-router-dom";
import { useExamsContext } from '../hooks/useExamsContext';
function Admin({exam}) {
  
  const navigate = useNavigate();
  const[search,setSearch] = useState("");
  console.log(search);

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  
  //modal for confirming deletion of record
  const [showModal, setShowModal] = useState(false);
  
  //Fetching the API
  const {exams, dispatch} = useExamsContext()
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

   useEffect(() => {
    console.log('Data from state:', exams)
  }, [exams])

 
 //Pagination of the records
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState (10);
  const lastRecordIndex = currentPage * perPage;
  const firstRecordIndex = lastRecordIndex - perPage;
  const currentRecords = exams.slice(firstRecordIndex, lastRecordIndex)

  function handleCloseModal() {
    setShowModal(false);
  }

  

    const handleDeleteExam = async()=>{
      const response = await fetch('http://localhost:5000/api/exams/' + exam._id, {
        method: 'DELETE'
      })
      const json = await response.json();
      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }
      else if (response.ok){
        dispatch({type: 'DELETE_EXAM', payload: json})
      }
    }

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

  return (
    <div class="container mx-auto px-4 sm:px-8  mt-[4rem]">
    <div class="py-4">
          
           {/*header */}
               <div>
                  <h2 class="text-3xl font-semibold leading-tight text-left mb-1 sm:w-[50rem]">View Examinations: <span className='text-green-600'>Administrator</span></h2>
               </div>

           {/*search bar */}
           <div class = "p-4 ml-6 min-w-full ">
      <input onChange ={(e) => setSearch(e.target.value)}
       type="search"
        class="form-control relative flex-auto ml-[-2rem] min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none" 
        placeholder="Search"
         aria-label="Search" 
         aria-describedby="button-addon2"/>
      </div>
      <div className='flex flex-row gap-[1rem] md:gap-[4rem] lg:gap-[13.7rem]'>
       <Link to ='/exams/new' className='flex items-center justify-center md:ml-[10rem] w-[9rem] bg-[#50936d] drop-shadow-md text-white rounded-md text text-lg font-semibold'>Create Exam</Link>
       <div>
       {/*pagination of records */}
      <Pagination 
        totalRecords = {exams.length} 
        perPage = {perPage}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        />
  </div></div>
      {/*table*/}
      
      <div class="-mx-4 sm:-mx-[8rem] px-5 sm:px-8 py-4 overflow-x-auto ">
        <div
          class="inline-block min-w-[80rem] shadow-md rounded-lg overflow-hidden"
        >
          <table class="sm:min-w-full leading-normal text-left ">
            {/*table headers
            contains an onclick function to sort them in ascending or descending order*/}
            <thead>
              <tr>
                {/*table headers*/}
                <th onClick={() => handleSort('patientId')}
                
                  class="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  
                  Patient ID { sortBy === 'patientId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                 {/*table headers*/}
                <th onClick={() => handleSort('examId')}
                  class="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
                  class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Age { sortBy === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                    {/*table headers*/}
                <th onClick={() => handleSort('sex')}
                  class="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Sex { sortBy === 'sex' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}
                <th onClick={() => handleSort('bmi')}
                  class="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  BMI { sortBy === 'bmi' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}

                <th onClick={() => handleSort('zip')}
                  class="px-4 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                
                  Zip Code { sortBy === 'zip' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                    {/*table headers*/}
                <th 
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
                  <th
                  class="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
                
              </tr>
            </thead>
            <tbody>
                {/*mapping the api data onto the table */}
              {currentRecords.filter((exam)=>{
          /* search function */ 
          return search.toLowerCase() === '' ? exam : exam.examId.toLowerCase().includes(search.toLowerCase()) || exam.patientId.toLowerCase().includes(search.toLowerCase()) || exam.sex.toLowerCase().includes(search.toLowerCase()) || exam.mortality.toLowerCase().includes(search.toLowerCase()) || exam.zip.toLowerCase().includes(search.toLowerCase())
          || exam.numIcuAdmits.toLowerCase().includes(search.toLowerCase())
          || exam.age.toLowerCase().includes(search.toLowerCase());
        } ).map(exam => (<tr key = {exam.id} class= ' border-b border-gray-200 h-[10rem'>
                  {/*table data */}
                        <td class=" px-6 py-5 border-gray-200 text-center text-green-600 bg-white text-sm">{exam.patientId} </td>       
                        <td class=" px-8 py-5  border-gray-200 text-green-600 bg-white  font-semibold text-sm"><Link to={`/exams/${exam._id}`}>{exam.examId}</Link></td>
                        
                        <td class=" px-7 py-5  border-gray-200 w-[10rem] bg-white text-sm"><img src = {`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${exam.pngFileName}`} alt = 'x-ray photo'/></td>
                        <td class=" px-[3rem] py-5  border-gray-200 bg-white text-sm">{exam.mortality}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.numIcuAdmits}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.age}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.sex}</td> 
                        <td class=" px-6 py-5 border-gray-200 bg-white text-sm">{exam.bmi}</td> 
                        <td class=" px-7 py-5 border-gray-200 bg-white text-sm"> {exam.zip}</td> 
                        <td class=" px-6 py-5 border-gray-200"><Link className = " text-blue-500 text-sm rounded font-semibold"
                         to = {`/exams/${exam._id}/update`}>
                          Edit</Link></td>
                          <td class=" px-5 py-5 border-gray-200 text-sm font-semibold text-red-400"><button onClick={() => setShowModal(true)}> Delete</button></td>
                         {showModal &&  (<div class = "fixed inset-0 bg-transparent bg-opacity-60 backdrop-blur-sm flex justify-center items-center  ">
                         <div class = "p-2 rounded w-[50rem] h-[20rem] bg-white border-2">
                          <div class = 'flex flex-col items-center justify-center'>
                        <div class = " text-4xl mt-10">Delete Exam</div>
                        <p class = 'text-2xl mt-7'>Are you sure you want to permanently delete this exam?</p>
                        <div className='flex flex-row gap-10 mt-10 text-sm font-semibold text-white'>
                        <button onClick={handleDeleteExam} class = " flex  items-center justify-center rounded bg-red-800 w-[6rem] h-[3rem] drop-shadow-md " >Delete</button>
                        <button onClick={handleCloseModal} class = "  flex items-center justify-center rounded bg-[#50936d] w-[6rem] h-[3rem] drop-shadow-md " >Cancel</button>
                       </div>
                       
                       </div>
                        <div class = "flex mt-[20rem] justify-center"></div>
                                    </div> 
                                        </div>)}
               
              </tr>))}
              
             
            </tbody>
          </table>
        </div>
    
      </div>
    </div>
  </div>
  )
}

export default Admin