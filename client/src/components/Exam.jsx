import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Exam() {
  const [exam, setExam] = useState({});
  const {_id} = useParams();
  console.log(_id);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/exams/${_id}`);
        const data = await response.json();
        setExam(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchExams();
  }, []);

  return (

    <div class="container mx-auto px-4 sm:px-8 mt-[7rem]">
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