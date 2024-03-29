import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { useExamsContext } from "../hooks/useExamsContext";
import LoadingScreen from "./LoadingScreen";

function Edit() {
  const [loading, setLoading] = useState(true);
  const { exam, dispatch } = useExamsContext();
  const { _id } = useParams();
  const [modal, setModal] = useState(false);
  const [notification, setNotification] = useState();
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    patientId: exam.patientId,
    examId: exam.examId,
    age: exam.age,
    sex: exam.sex,
    zip: exam.zip,
    bmi: exam.bmi,
    weight: exam.weight,
    mortality: exam.mortality,
    icu: exam.icu,
    numIcuAdmits: exam.numIcuAdmits,
  });

  const [originalValues, setOriginalValues] = useState(formValues);



  //fetching exam data
  useEffect(() => {
    const fetchExam = async () => {
      const response = await fetch(
        `https://pythons-covid-database-backend.onrender.com/api/exams/${_id}`
      );
      const data = await response.json();
      if (response.ok) {
        dispatch({ type: "GET_EXAM", payload: data });
        setFormValues({
          patientId: data.patientId,
          examId: data.examId,
          age: data.age,
          sex: data.sex,
          zip: data.zip,
          bmi: data.bmi,
          weight: data.weight,
          mortality: data.mortality,
          icu: data.icu,
          numIcuAdmits: data.numIcuAdmits,
        });
        setOriginalValues({
          patientId: data.patientId,
          examId: data.examId,
          age: data.age,
          sex: data.sex,
          zip: data.zip,
          bmi: data.bmi,
          weight: data.weight,
          mortality:data.mortality
        })
        dispatch({ type: "SET_EXAM", payload: data });
      }
    };
    fetchExam();
    setTimeout(() => setLoading(false), 800);
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === 'icu' && value === 'N') {
      setFormValues({
        ...formValues,
        [name]: value,
        numIcuAdmits: 0,
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: name === 'numIcuAdmits' ? parseInt(value, 10) : value,
      });
    }
  };

  const handleCancel = () => {
    setFormValues(originalValues);
    setEditMode(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await fetch(
      `https://pythons-covid-database-backend.onrender.com/api/exams/${_id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formValues),
      }
    );
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: "SET_EXAM", payload: data }); // update the exam state with the new data
      setOriginalValues(formValues); // update the original values with the new form values
      setEditMode(false); // close the edit mode
      setNotification(true);
      setTimeout(() => {
        setNotification(false);
      }, 4000);
    }
  };

  return (
    <>
      {loading === false ? (
        <div className="container mx-auto px-4 sm:px-8 mt-20">
          {window.scrollTo(0, 0)}
          {modal && (
            <div className="fixed inset-0 z-10 bg-black bg-opacity-80 flex justify-center items-center h-full w-full max-w-full max-h-full" onClick={() => setModal(false)}>
            <div className="h-[70rem] w-[70rem] max-w-full max-h-full flex items-center justify-center overflow-auto">
              <img src={exam.pngFileName} alt="x-ray" className = "rounded" />
            </div>
          </div>
            )}
          <div className="mt-10">
            
          </div>
          <div className="flex flex-col items-center justify-center">
            {!editMode && (
              <>
              <h2 className="text-3xl font-semibold leading-tight text-center mb-1 sm:w-full md:w-[50rem] mx-auto ">
              Exam Details
            </h2>
                {notification && (
                  <div className="mt-4 bg-green-200 font-semibold px-8 py-2 mb-1 border-2 border-green-500 rounded-md text-green-800">
                    Exam data updated successfully!
                  </div>
                )}

<div className="flex flex-col items-center justify-center">
<button
                    className="bg-[#2c73e6] text-white active:bg-blue-600 font-bold mt-3 uppercase text-sm md:ml-24 lg:ml-0 px-7 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setEditMode(true)}
                  >
                    Edit
                  </button>

                  <div className="flex flex-col  md:flex-row items-center justify-center gap-10 h-auto bg-white drop-shadow-lg rounded-md border-2 md:px-10 md:py-10 mt-3">
                  <img onClick={() => setModal(true)} className="w-full md:w-1/2 rounded-lg max-h-[36rem]" src={exam.pngFileName} alt="x-ray" />

            <div className="flex flex-col w-2/3 sm:w-2/3 md:w-1/2 md:px-2 md:py-5 md:grid md:grid-cols-2 md:gap-5 ">
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-2">Patient ID:</p>
                <Link to ={`/patient/${exam.patientId}`}><p className="px-4 font-semibold py-2 text-green-500">{exam.patientId}</p></Link>
              </div>
              <div className="border-2 bg-white rounded-lg drop-shadow-lg mb-2">
                <p className="font-medium px-4 py-3">Exam ID:</p>
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

          </>
        )}
        {editMode && (
            <div> 
               <h2 className="text-3xl mt-4 font-semibold leading-tight text-center mb-1 sm:w-full md:w-[50rem] mx-auto ">
              Edit Exam
            </h2>
          <form className="mt-4 grid grid-cols-2  gap-4" onSubmit={handleSubmit}>
           
            <div className="col-span-1 ">
            <label className="block mb-5 font-medium   text-gray-600">
                          Patient ID:
                          <input type="text" name="patientId" value={formValues.patientId} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-5 font-medium text-gray-600">
                          Exam ID:
                          <input type="text" name="examId" value={formValues.examId} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-5 font-medium text-gray-600">
                          Age:
                          <input type="number" name="age" min={1} value={formValues.age} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-5 font-medium text-gray-600">
                          Sex:
                          <select name="sex" value={formValues.sex} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required>
                           <option value="F">F</option>
                            <option value="M">M</option>
                            <option value="O">Other</option>
                                   </select>
                          </label>
                          <label className="block mb-5 font-medium text-gray-600">
                          Zip code:
                          <input type="text" name="zip" value={formValues.zip} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label></div>
                          <div className="col-span-1">
                          <label className="block mb-5 font-medium text-gray-600">
                          Weight (lbs):
                          <input type="number" name="weight" value={formValues.weight} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-5 font-medium text-gray-600"></label>
                          <label className="block mb-5 font-medium text-gray-600">
                          BMI:
                          <input type="number" name="bmi" value={formValues.bmi} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required />
                          </label>
                          <label className="block mb-5 font-medium text-gray-600">
                          Mortality:
                          <select name="mortality" value={formValues.mortality} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required>
                           <option value="Y">Y</option>
                            <option value="N">N</option>
                                   </select>
                          </label>
                          <label className="block mb-5 font-medium text-gray-600">
                          Admitted to ICU:
                          <select name="icu" value={formValues.icu} onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required>
                           <option value="Y">Y</option>
                            <option value="N">N</option>
                                   </select>
                          </label>
                          <label className="block mb-2 font-medium text-gray-600">
                          Number of ICU admits:
                          <input type="number" name="numIcuAdmits"
                          
                           value={formValues.icu === 'Y' ? Math.max(formValues.numIcuAdmits || 1, 1) : 0}
                            onChange={handleInputChange} className="border-2 border-gray-300 p-2 rounded-md w-full" required min="0"/>
                          </label>
                          </div>
                          <div className="col-span-2 mt-5">
                              <button type="submit" className="bg-blue-600 text-white active:bg-blue-500 uppercase text-sm font-bold px-7 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none mr-3 mb-1 ease-linear transition-all duration-150">Submit</button>
                            <button className="bg-red-600 text-white active:bg-red-500 uppercase text-sm font-semibold px-7 py-3 rounded-full shadow hover:shadow-md outline-none focus:outline-none ml-3 mb-1 ease-linear transition-all duration-150" onClick={handleCancel}>Cancel</button>
                            </div>
                          </form>
                          </div>
                          )}
   </div>                       
</div> ): (<LoadingScreen/>)} </>                        
  )}     
export default Edit