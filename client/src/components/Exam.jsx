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

    <div className="container mx-auto px-4 sm:px-8 mt-20">
      <div className='mt-10'>
       <h2 className="text-3xl font-semibold leading-tight text-center mb-1 sm:w-full md:w-[50rem] mx-auto ">Exam Details</h2>
       </div>
      <div className="flex flex-col items-center justify-center">
    
<div className="flex flex-col items-center justify-center">
  <div className="flex flex-col md:flex-row items-center justify-center gap-10 h-auto bg-white drop-shadow-xl rounded-md border-t md:px-10 md:py-10 mt-10">
    <img className="w-full md:w-1/2 rounded-lg" src={exam.pngFileName} alt="x-ray photo" />

    <div className="flex flex-col text-lg md:text-xl bg-white rounded-lg drop-shadow-lg items-start justify-center md:w-1/2 md:px-10 md:py-5 gap-y-2">
      <p className="font-medium">Patient ID: {exam.patientId}</p>
      <p className="font-medium">Exam ID: {exam.examId}</p>
      <p className="font-medium">Age: {exam.age}</p>
      <p className="font-medium">Sex: {exam.sex}</p>
      <p className="font-medium">Zip code: {exam.zip}</p>
      <p className="font-medium">BMI: {exam.bmi}</p>
      <p className="font-medium">Mortality: {exam.mortality}</p>
      <p className="font-medium">Number of ICU admits: {exam.numIcuAdmits}</p>
    </div>
  </div>
</div>
 
  </div>
  </div>

     
  )
}

export default Exam