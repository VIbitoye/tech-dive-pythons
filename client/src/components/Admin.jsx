import React from 'react'
import Pagination from './Pagination';
import LoadingScreen from './LoadingScreen';
import { useState, useEffect } from 'react';
import { Link} from "react-router-dom";
import { useExamsContext } from '../hooks/useExamsContext';
function Admin() {
  const [selectedExam, setSelectedExam] = useState();
  const searchProperties = ["examId", "patientId", "sex", "mortality", "zip", "numIcuAdmits", "age"];
  const [notification, setNotification] = useState()
  const[search,setSearch] = useState("");
  console.log(search);

  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  
  //modal for confirming deletion of record
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true)
  //initialization of context
  const {exams, dispatch} = useExamsContext()
  //Fetching the API
  useEffect(() => {
    const fetchExams = async () =>{
    const response = await fetch('https://pythons-covid-database-backend.onrender.com/api/exams')
    const data = await response.json()
    if (response.ok){
    
  dispatch({type: 'GET_EXAMS', payload: data})
  
    }
    }
    fetchExams()
    console.log('Data from state:', exams)  
    setTimeout(() => setLoading(false),700)
   }, [])


   useEffect(() => {
  
  }, [])

 //Pagination of the records
  const [currentPage, setCurrentPage] = useState(1)
  const [perPage, setPerPage] = useState (10);
  const lastRecordIndex = currentPage * perPage;
  const firstRecordIndex = lastRecordIndex - perPage;

  //closes modal
  function handleCloseModal() {
    setShowModal(false)
  }

// Will delete the selected exam 
  const handleDeleteExam = async (selectedExam) => {
    const response = await fetch(
      `https://pythons-covid-database-backend.onrender.com/api/exams/${selectedExam._id}`,
      {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }, 
      }
    )
    const json = await response.json();
    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    } else if (response.ok) {
      dispatch({ type: 'DELETE_EXAM', payload: selectedExam._id })
      setSelectedExam(null)
      setShowModal(false)
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 2500);
    }
  }

  const searchHandler = (event) => {
    setSearch(event.target.value);
    setCurrentPage(1); // Reset current page to 1 when searching
  }

  //Sorts the fields
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

    //filtering for search
    const filteredItems = exams && exams.filter((exam) =>
    searchProperties.some((prop) => exam[prop].toLowerCase().includes(search.toLowerCase()))
  );
  
  
   const currentRecords = filteredItems && filteredItems.slice(firstRecordIndex, lastRecordIndex)
   //for reducing the number of pages based on search results
   const totalRecords = filteredItems?.length;

   return (
    <>
    {loading === false ? (
<div className="container mx-auto px-4 sm:px-8 mt-[4rem]">
{window.scrollTo(0, 50)}
    <div className="py-4">
          
           {/*header */}
           <div>
            <h2 className="text-3xl font-semibold leading-tight text-center mb-1 sm:text-left sm:ml-10 lg:w-1/2 xl:w-5/12">View Examinations: <span className='text-green-600'>Administrator</span></h2>
            </div>

           {/*search bar */}
           <div className="p-4">
              <input
                onChange={searchHandler}
                value={search}
                type="search"
                className="form-control relative flex-auto w-full md:w-3/4 lg:w-1/2 xl:w-2/3 mx-auto mb-3 px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="button-addon2"
              />
            </div>
      {/*create exam button */}
      <div className='flex flex-col items-center'>
         
      {notification && (
          <div className="mt-1 px-8 bg-red-200 border-2 border-red-400 font-semibold py-2 mb-7 rounded-md text-red-800">
            Exam has been deleted!
          </div>
        )}
          <Link
            to='/exams/new'
            className='flex items-center justify-center w-[9rem] px-4 py-2 bg-[#50936d] drop-shadow-md text-white rounded-md text text-lg font-semibold'
          >
            Create Exam
          </Link>
          <div className='flex gap-4 mt-4'>
            <Pagination
            totalRecords={totalRecords} 
              perPage={perPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        </div>
      {/*table*/}
      
      <div className="px-5 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">

          <table className=" table-auto w-full leading-normal text-left">
            {/*table headers
            contains an onclick function to sort them in ascending or descending order*/}
            <thead>
              <tr>
                {/*table headers*/}
                <th onClick={() => handleSort('patientId')}
                
                  className="px-5 py-3  border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  
                  Patient ID { sortBy === 'patientId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                 {/*table headers*/}
                <th onClick={() => handleSort('examId')}
                  className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Age { sortBy === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                    {/*table headers*/}
                <th onClick={() => handleSort('sex')}
                  className="px-7 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Sex { sortBy === 'sex' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}
                <th onClick={() => handleSort('bmi')}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  BMI { sortBy === 'bmi' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}

                <th onClick={() => handleSort('zip')}
                  className="px-4 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                
                  Zip Code { sortBy === 'zip' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

              
                <th 
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
                ></th>
                  <th
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100"
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
        } ).map(exam => (<tr key = {exam.id} className= ' border-b border-gray-200 h-[10rem'>
                  
                  {/*table data */}
                        <td className=" px-6 py-5 border-gray-200 text-center text-green-600 bg-white text-sm">{exam.patientId} </td>       
                        <td className=" px-8 py-5  border-gray-200 text-green-600 bg-white  font-semibold text-sm"><Link to={`/exams/${exam._id}/edit`}>{exam.examId}</Link></td>
                        <td className=" px-7 py-5  border-gray-200 w-[10rem] bg-white text-sm "><img className='rounded' src = {exam.pngFileName} alt = 'x-ray photo'/></td>
                        <td className=" px-12 py-5  border-gray-200 bg-white text-sm">{exam.mortality}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.numIcuAdmits}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.age}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm">{exam.sex}</td> 
                        <td className=" px-6 py-5 border-gray-200 bg-white text-sm">{exam.bmi}</td> 
                        <td className=" px-7 py-5 border-gray-200 bg-white text-sm"> {exam.zip}</td>
                          <td className=" px-5 py-5 border-gray-200 text-sm font-semibold text-red-500">
                          <button onClick={() => {setSelectedExam(exam); setShowModal(true)}}> Delete</button></td>
                          {/*when the delete button is clicked this confirmation modal should render */}
                           {showModal && selectedExam && (<div className = "fixed inset-0 bg-transparent bg-opacity-60 backdrop-blur-sm flex justify-center items-center  ">
                         <div className = "p-2 rounded w-[50rem] h-[20rem] bg-white border-2">
                          <div className = 'flex flex-col items-center justify-center'>
                        <div className = " text-4xl mt-10">Delete Exam</div>
                        <p className = 'md:text-2xl mt-7 sm:text-lg'>Are you sure you want to permanently delete this exam?</p>
                        <div className='flex flex-row gap-10 mt-10  font-semibold text-white text-xl'>
                        <button onClick={() => handleDeleteExam(selectedExam)} className = " flex  items-center justify-center rounded bg-red-800 w-[6rem] h-[3rem] drop-shadow-md " >Delete</button>
                        <button onClick={handleCloseModal} className = "  flex items-center justify-center rounded bg-[#399d4d] w-[6rem] h-[3rem] drop-shadow-md " >Cancel</button>
                       </div>
                       
                       </div>
                     
                                    </div> 
                                        </div>)}
               
              </tr>))}
              
             
            </tbody>
          </table>
        </div>
    
      </div>
      <Pagination 
         totalRecords={totalRecords} 
        perPage = {perPage}
        currentPage = {currentPage}
        setCurrentPage = {setCurrentPage}
        />
    </div>
  </div>) : (
        <LoadingScreen />
      )}
      </>
  );
}

export default Admin