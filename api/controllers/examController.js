const Exam = require('../models/ExamModel')
const mongoose = require('mongoose')
//get all exams
const getExams = async(req,res) => {
const exams = await Exam.find({}).sort({createdAt: -1})

res.status(200).json(exams)
}

//get a single exam
const getExam = async(req,res) =>{
  const {_id} = req.params

 //checking if _id is valid 12 byte /24 hex string or integer
  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).json({error: 'No such exam'})

  }
  const exam = await Exam.findById(_id)

  if(!exam) {
    return res.status(404).json({eror: 'No exams found'})
  }

  res.status(200).json(exam)
}

//get Exams By Patient
const getExamsByPatient = async (req, res) => {
  try {
    const patientId = req.params.patientId;
    const exam = await Exam.find({ patientId });
    return res.status(200).json({ success: true, exams: exam });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

//create a new exam
const createExam = async(req,res) => {
 const exam = new Exam(req.body);
    //adding document to db
    try {
      const newExam = await exam.save();
      res.status(201).json(newExam);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
}

//delete an exam
const deleteExam = async (req,res) => {
  const {_id} = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).json({error: 'No such exam'})
  }
  

  const exam = await Exam.findByIdAndDelete(_id)
  if(!exam) {
    return res.status(404).json({error: 'No exams found'})
  }

  res.status(200).json(exam)
}

//update an exam
const updateExam = async (req, res) => {
  const {_id} = req.params

  if (!mongoose.Types.ObjectId.isValid(_id)){
    return res.status(404).json({error: 'No such exam'})
  }
  const exam = await Exam.findByIdAndUpdate(req.params._id, req.body, { new: true });

  if(!exam) {
    return res.status(404).json({eror: 'No exams found'})
  }

  res.json(exam);
}

module.exports = {
  createExam, getExams, getExam, deleteExam, updateExam, getExamsByPatient
};
