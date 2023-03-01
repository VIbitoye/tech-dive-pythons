import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useExamsContext } from '../hooks/useExamsContext';
function Exam() {
  const { exam, dispatch, loading } = useExamsContext();
  const { _id } = useParams();

  useEffect(() => {
    const fetchExams = async () => {
      const response = await fetch(`http://localhost:5000/api/exams/${_id}`);
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: 'GET_EXAM', payload: data });
      }
    };
    fetchExams();
  }, []);

  
  if (loading) {
    return <div className='h-screen flex items-center justify-center'>Loading...</div>;
  }


  return (

    <div className="container mx-auto px-4 sm:px-6 mt-20">
      <div className='mt-10'>
       <h2 className="text-3xl font-semibold leading-tight text-center mb-1 sm:w-full md:w-[50rem] mx-auto ">Exam Details</h2>
       </div>
       <div className="flex flex-col items-center justify-center">
                  <div className="flex flex-col md:flex-row items-center justify-center gap-10 h-auto bg-white drop-shadow-lg rounded-md border-2 md:px-10 md:py-10 mt-10">
            <img className="w-full md:w-1/2 rounded-lg" src={exam.pngFileName} alt="x-ray photo" />

            <div className="flex flex-col w-full md:w-1/2 md:px-10 md:py-5 md:grid md:grid-cols-2 md:gap-5">
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Patient ID:</p>
                <p className="px-4 py-2">{exam.patientId}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Exam ID:</p>
                <p className="px-4 py-2">{exam.examId}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Age:</p>
                <p className="px-4 py-2">{exam.age}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Sex:</p>
                <p className="px-4 py-2">{exam.sex}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Zip code:</p>
                <p className="px-4 py-2">{exam.zip}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Weight:</p>
                <p className="px-4 py-2">{exam.weight} lbs</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">BMI:</p>
                <p className="px-4 py-2">{exam.bmi}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Mortality:</p>
                <p className="px-4 py-2">{exam.mortality}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Admitted to ICU:</p>
                <p className="px-4 py-2">{exam.icu}</p>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Number of ICU admits:</p>
                <p className="px-4 py-2">{exam.numIcuAdmits}</p>
              </div>
            </div>
          </div>
        </div>
  </div>

     
  )
}

export default Exam