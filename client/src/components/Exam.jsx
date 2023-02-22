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

    <div class="container mx-auto px-4 sm:px-8 mt-[5rem]">
    <div>
      <h2 class="text-3xl font-semibold leading-tight text-left">Exam Details</h2>
    </div>
    <div className='flex flex-col items-center justify-center'>
      {exam && (
        <>
          <p>Exam ID: {exam.examId}</p>
          <p>Patient ID: {exam.patientId}</p>
          <p>Age: {exam.age}</p>
          <p>Sex: {exam.sex}</p>
          <p>Zip code: {exam.zip}</p>
          <p>BMI: {exam.bmi}</p>
          <p>Mortality: {exam.mortality}</p>
          <p>Number of ICU admits: {exam.numIcuAdmits}</p>
          <p>Image URL:<img src = {`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${exam.pngFileName}`} alt = 'x-ray photo'/></p>
        </>
      )}
    </div>
  </div>
     
  )
}

export default Exam