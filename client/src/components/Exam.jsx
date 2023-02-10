import React from 'react'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

function Exam() {
  const [exam, setExam] = useState([]);
  const {_id} = useParams();
  console.log(_id);

  useEffect(() => {
    fetch(`https://czi-covid-lypkrzry4q-uc.a.run.app/api/exam/${_id}`)
      .then(response => response.json())
      .then(data => setExam(data.exam));
      
  }, []);
  return (

    <div class="container mx-auto px-4 sm:px-8 mt-[7rem]">
      <div>
                  <h2 class="text-3xl font-semibold leading-tight text-left">Exam Details</h2>
               </div>
               <div className='flex flex-col items-center justify-center'>
 <p>Exam ID: {exam.examId}</p>
      <p>Patient ID: {exam.patientId}</p>
      <p>Age: {exam.age}</p>
      <p>Sex: {exam.sex}</p>
      <p>Zip code: {exam.zipCode}</p>
      <p>BMI: {exam.bmi}</p>
      <p>Key findings: {exam.keyFindings}</p>
      <p>Brixia scores: {exam.brixiaScores}</p>
      <p>Image URL: <img src = {exam.imageURL} className=' max-w-[10rem]'/></p>
  </div></div>
     
  )
}

export default Exam