import { useNavigate } from 'react-router-dom';
import React from 'react'
import { useState } from 'react';
import { useExamsContext } from '../hooks/useExamsContext';
function NewExamForm () {
  const {dispatch} = useExamsContext()
  const [patientId, setPatientId] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [zip, setZip] = useState('');
  const [bmi, setBmi] = useState('');
  const [weight, setWeight] = useState('');
  const [pngFileName, setPngFileName] = useState('');
  const [examId, setExamId] = useState('');
  const [icu, setIcu] = useState('');
  const [numIcuAdmits, setNumIcuAdmits] = useState('');
  const [mortality, setMortality] = useState('');
  const [error,setError] = useState(null)
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    const newExam = {
      patientId,
      age,
      sex,
      zip,
      bmi,
      weight,
      pngFileName,
      examId,
      icu,
      numIcuAdmits,
      mortality,
    };
  
    const response = await fetch('https://pythons-covid-database-backend.onrender.com/api/exams', {
      method: 'POST',
      body: JSON.stringify(newExam),
      headers: {
        'Content-Type': 'application/json'
      },
    });
    const json = await response.json();
    console.log('New exam created', json);
    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setPatientId('');
      setAge('');
      setSex('');
      setZip('');
      setBmi('');
      setWeight('');
      setPngFileName('');
      setExamId('');
      setIcu('');
      setNumIcuAdmits('');
      setMortality('');


      console.log('New exam created', json);
      dispatch({type: 'CREATE_EXAM', payload:json});

   // navigate to the exam page
      navigate('/admin');
      window.location.reload()

   
    }
  
    
  };

  return (
    
    <div className="flex flex-col items-center mt-20 h-screen ">
     { window.scrollTo(0,0)}
      <div className='flex items'><h2 className='text-4xl font-semibold mt-10 mb-10'>Create Exam</h2></div>
      <div className="bg-white drop-shadow-lg rounded-lg border-2 px-6 py-8 w-5/6 max-w-5xl flex flex-row justify-center">
        <form className="grid grid-cols-2 gap-6 items-center justify-center w-4/5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="patientId" className="font-medium text-gray-700">
              Patient ID:
            </label>
            <input
              type="text"
              id="patientId"
              className="text-center rounded-md ring-gray-800 border-gray-400 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={patientId}
              onChange={(event) => setPatientId(event.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="examId" className="font-medium text-gray-700">
              Exam ID:
            </label>
            <input
              type="text"
              id="examId"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={examId}
              onChange={(event) => setExamId(event.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="age" className="font-medium text-gray-700">
              Age:
            </label>
            <input
              type="number"
              id="age"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={age}
              min={1}
              onChange={(event) => setAge(event.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="sex" className="font-medium text-gray-700">
              Sex:
            </label>
              <select
              id="sex"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={sex}
              onChange={(event) => setSex(event.target.value)}
              required
            >
              <option value="">Select an option </option>
              <option value="M">Male</option>
              <option value="F">Female</option>
              <option value="O">Other</option>
            </select>
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="zip" className="font-medium text-gray-700">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={zip}
              onChange={(event) => setZip(event.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="bmi" className="font-medium text-gray-700">
              BMI:
            </label>
            <input
              type="text"
              id="bmi"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={bmi}
              onChange={(event) => setBmi(event.target.value)}
              required
            />
          </div>
            <div className="flex flex-col">
              <label htmlFor="weight" className="font-medium text-gray-700">
                Weight:
              </label>
              <input
                type="text"
                id="weight"
                className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="pngFileName" className="font-medium text-gray-700">
                Image URL:
              </label>
              <input
                type="text"
                id="weight"
                className=" text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={pngFileName}
                onChange={(event) => setPngFileName(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="numIcuAdmits" className="font-medium text-gray-700">
                Number of ICU Admits:
              </label>
              <input
                type="number"
                id="numIcuAdmits"
                className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={icu === 'Y' ? Math.max(numIcuAdmits || 1, 1) :  0}
                onChange={(event) => setNumIcuAdmits(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="icu" className="font-medium text-gray-700">
                Admitted to ICU:
              </label>
              <select
              id="icu"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={icu}
              onChange={(event) => setIcu(event.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="N">No</option>
              <option value="Y">Yes</option>
            </select>
            </div>
            <div className="flex flex-col">
              <label htmlFor="mortality" className="font-medium text-gray-700">
                Mortality:
              </label>
               <select
              id="mortality"
              className="text-center rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={mortality}
              onChange={(event) => setMortality(event.target.value)}
              required
            >
              <option value="">Select an option</option>
              <option value="N">No</option>
              <option value="Y">Yes</option>
            
            </select>
            </div>
<button
        type="submit"
        className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Submit
      </button>
    </form>
  </div>
</div>
)
  }

export default NewExamForm