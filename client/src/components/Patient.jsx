import React from 'react'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';
import { useParams } from 'react-router-dom';
import Pagination from './Pagination';
function Patient() {
  const [exams, setExams] = useState([]);
  const[search,setSearch] = useState("");
  const searchProperties = ["examId", "patientId", "sex", "mortality", "zip", "numIcuAdmits", "age"];
  const [loading, setLoading] = useState();
  console.log(search);
  const [sortBy, setSortBy] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const { patientId } = useParams();


    //Fetching the API
  
    useEffect(() => {
      const fetchExams = async () => {
        try {
          const response = await fetch(`https://pythons-covid-database-backend.onrender.com/api/exams/patient/${patientId}`);
          const data = await response.json();
          setExams(data.exams);
        } catch (error) {
          console.error(error);
        }
      };
  
      fetchExams();

      setTimeout(() => {
        setLoading(false);
      }, 400);
    }, []);
  
 //Pagination of the records
 const [currentPage, setCurrentPage] = useState(1)
 const [perPage, setPerPage] = useState (10);
 const lastRecordIndex = currentPage * perPage;
 const firstRecordIndex = lastRecordIndex - perPage;
  

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
  const filteredItems = exams && exams.filter((exam) =>
  searchProperties.some((prop) => exam[prop].toLowerCase().includes(search.toLowerCase()))
);
 const currentRecords = filteredItems.slice(firstRecordIndex, lastRecordIndex)


  return (
    <>
    {loading === false ? (
    <div className="container mx-auto px-4 sm:px-8 mt-[4rem]">
    <div className="py-4">
          
           {/*header */}
               <div>
                  <h2 className="text-3xl font-semibold leading-tight text-left sm:w-[50rem] mb-1">View Examinations:  <span className='text-green-500'>Patient {patientId}</span></h2>
               </div>
               <div className = "p-4 ml-6 min-w-full ">
      <input onChange ={(e) => setSearch(e.target.value)}
       type="search"
        className="form-control relative flex-auto ml-[-2rem] min-w-0 block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-gray-400 focus:outline-none" 
        placeholder="Search"
         aria-label="Search" 
         aria-describedby="button-addon2"/>
      </div>
       {/*pagination of records */}
       <Pagination 
        totalRecords = {exams.length} 
        perPage = {perPage}
        setCurrentPage = {setCurrentPage}
        />
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div
          className="inline-block min-w-full shadow-md rounded-lg overflow-hidden"
        >
          <table className="min-w-full leading-normal text-left ">
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
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Exam ID { sortBy === 'examId' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>

                      {/*table headers*/}
                <th 
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider"
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
                  Icu Admits { sortBy === 'numIcuAdmits' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                   {/*table headers*/}   

                <th onClick={() => handleSort('age')}
                  className="px-6 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Age { sortBy === 'age' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                    {/*table headers*/}
                <th onClick={() => handleSort('sex')}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  Sex { sortBy === 'sex' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}
                <th onClick={() => handleSort('bmi')}
                  className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider"
                ><button>
                  BMI { sortBy === 'bmi' ? (sortDirection === 'asc' ? '⬆️' : '⬇️') : ''}</button>
                </th>
                      {/*table headers*/}

                <th onClick={() => handleSort('zip')}
                  className="px-3 py-5 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-700  tracking-wider"
                ><button>
                  
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
              {currentRecords.map(exam => (<tr key = {exam.id} className= ' border-b border-gray-200 h-[10rem]'>
               
                        <td className=" px-6 py-5 border-gray-200 text-center text-green-600 bg-white text-sm">{exam.patientId} </td>       
                        <td className=" px-5 py-5  border-gray-200 text-green-600 bg-white  font-semibold text-sm"><Link to={`/exams/${exam._id}`}>{exam.examId}</Link></td>
                        <td className=" px-7 py-5  border-gray-200 w-[13rem] bg-white text-sm"><img src = {exam.pngFileName} alt = 'x-ray photo'/></td>
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
      </div>
      </div>) : (
        <LoadingScreen/>
      )}
      </>



  )
}

export default Patient