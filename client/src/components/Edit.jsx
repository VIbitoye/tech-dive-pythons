import React, { useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import { useExamsContext } from '../hooks/useExamsContext';

function Edit() {
  const navigate = useNavigate()
  const { exam, dispatch, loading } = useExamsContext()
  const { _id } = useParams()
  const [updatedExam, setUpdatedExam] = useState(exam);
  const [notification, setNotification] = useState()
  const [editMode, setEditMode] = useState(false)
  const [formValues, setFormValues] = useState({
    patientId: exam.patientId,
    examId: exam.examId,
    age: exam.age,
    sex: exam.sex,
    zip: exam.zip,
    bmi: exam.bmi,
    mortality: exam.mortality,
    numIcuAdmits: exam.numIcuAdmits,
  })

  const [originalValues, setOriginalValues] = useState(formValues)

  useEffect(() => {
    const fetchExam = async () => {
      const response = await fetch(`http://localhost:5000/api/exams/${_id}`);
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: 'GET_EXAM', payload: data });
        setFormValues({
          patientId: data.patientId,
          examId:data.examId,
          age: data.age,
          sex: data.sex,
          zip: data.zip,
          bmi: data.bmi,
          mortality: data.mortality,
          numIcuAdmits: data.numIcuAdmits,
        });
        dispatch({ type: 'SET_EXAM', payload: data });
      }
    };
    fetchExam();
  },  []);


  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleCancel = () => {
    setFormValues(originalValues);
    setEditMode(false);
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(`http://localhost:5000/api/exams/${_id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formValues),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'SET_EXAM', payload: data }); // update the exam state with the new data
      setOriginalValues(formValues);  // update the original values with the new form values
      setEditMode(false);  // close the edit mode
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 5000);
    }
  
  }



  
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
  
        <p className="text-lg font-medium text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 sm:px-8 ">
      <div>
        <h2 className="text-3xl font-semibold leading-tight text-left mt-20">Exam Details</h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        {!editMode && (
          <>
            {notification && (
          <div className="mt-4 bg-green-200 px-4 py-2 mb-7 rounded-md text-green-700">
            Exam data updated successfully!
          </div>
        )}
            <p className="text-lg font-medium text-gray-600">Patient ID: {exam.patientId}</p>
            <p className="text-lg font-medium text-gray-600">Exam ID: {exam.examId}</p>
            <p className="text-lg font-medium text-gray-600">Age: {exam.age}</p>
            <p className="text-lg font-medium text-gray-600">Sex: {exam.sex}</p>
            <p className="text-lg font-medium text-gray-600">Zip code: {exam.zip}</p>
            <p className="text-lg font-medium text-gray-600">BMI: {exam.bmi}</p>
            <p className="text-lg font-medium text-gray-600">Mortality: {exam.mortality}</p>
            <p className="text-lg font-medium text-gray-600">Number of ICU admits: {exam.numIcuAdmits}</p>
            <div className="mt-4 w-[30rem]">
              <p className="text-lg font-medium text-gray-600">Image URL:</p>
              <img src={`https://ohif-hack-diversity-covid.s3.amazonaws.com/covid-png/${exam.pngFileName}`} alt='x-ray photo' />
            </div>
            <button className="mt-4 px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600" onClick={() => setEditMode(true)}>Edit</button>
          </>
        )}
        {editMode && (
          <form className="mt-4" onSubmit={handleSubmit}>
            <label className="block mb-2 font-medium text-gray-600">
                          Patient ID:
                          <input type="text" name="patientId" value={formValues.patientId} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Exam ID:
                          <input type="text" name="examId" value={formValues.examId} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Age:
                          <input type="number" name="age" value={formValues.age} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Sex:
                          <input type="text" name="sex" value={formValues.sex} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Zip code:
                          <input type="text" name="zip" value={formValues.zip} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          BMI:
                          <input type="number" name="bmi" value={formValues.bmi} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Mortality:
                          <input type="text" name="mortality" value={formValues.mortality} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Number of ICU admits:
                          <input type="number" name="numIcuAdmits" value={formValues.numIcuAdmits} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>

                          <button className="px-4 py-2 rounded-md text-white bg-blue-500 hover:bg-blue-600" type="submit">Save</button>
                          <button className="ml-4 px-4 py-2 rounded-md text-white bg-red-500 hover:bg-red-600" onClick={handleCancel}>Cancel</button>
                          </form>
                          )}
                          </div>
                          </div>
                          );
                          }
export default Edit