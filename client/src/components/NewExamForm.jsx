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
  
    const response = await fetch('http://localhost:5000/api/exams', {
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

      navigate('/admin');
      
      // navigate to the exam page
    }
  
    
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className='flex items'><h2 className='text-3xl mb-10'>Create an exam</h2></div>
      <div className="border-2 px-6 py-8 w-5/6 max-w-5xl flex flex-row justify-center">
        <form className="grid grid-cols-2 gap-6 items-center justify-center w-4/5" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="patientId" className="font-medium text-gray-700">
              Patient ID:
            </label>
            <input
              type="text"
              id="patientId"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={age}
              onChange={(event) => setAge(event.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="sex" className="font-medium text-gray-700">
              Sex:
            </label>
            <input
              type="text"
              id="sex"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              value={sex}
              onChange={(event) => setSex(event.target.value)}
              required
            />
          </div>
  
          <div className="flex flex-col">
            <label htmlFor="zip" className="font-medium text-gray-700">
              Zip:
            </label>
            <input
              type="text"
              id="zip"
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={weight}
                onChange={(event) => setWeight(event.target.value)}
                required
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="pngFileName" className="font-medium text-gray-700">
                Image:
              </label>
              <input
                type="text"
                id="weight"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={numIcuAdmits}
                onChange={(event) => setNumIcuAdmits(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="icu" className="font-medium text-gray-700">
                ICU:
              </label>
              <input
                type="text"
                id="ICU"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={icu}
                onChange={(event) => setIcu(event.target.value)}
                required
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="mortality" className="font-medium text-gray-700">
                Morality:
              </label>
              <input
                type="text"
                id="mortality"
                className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                value={mortality}
                onChange={(event) => setMortality(event.target.value)}
                required
              />
            </div>
<button
        type="submit"
        className="py-2 px-4 text-lg bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Submit
      </button>
    </form>
  </div>
</div>
)
  }

export default NewExamForm