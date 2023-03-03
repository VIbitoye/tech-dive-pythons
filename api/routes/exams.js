const express = require('express')
const {
    createExam, getExams, getExam, deleteExam, updateExam, getExamsByPatient
} = require('../controllers/examController')
const router = express.Router()

//GET all exams
router.get('/', getExams);

//GET patient's exams
router.get("/patient/:patientId", getExamsByPatient);

//GET a single exam
router.get('/:_id', getExam);

//POST a new exam
router.post('/', createExam)

//DELETE an exam
router.delete('/:_id', deleteExam)

//UPDATE an exam
router.patch('/:_id', updateExam)



module.exports = router