const mongoose = require('mongoose')

const ExamSchema = new mongoose.Schema({
    patientId: {
        type: String,
        required: true
      },
      age: {
        type: String,
        required: true
      },
      sex: {
        type: String,
        required: true
      },
      zip: {
        type: String,
        required: true
      },
      bmi: {
        type: String,
        required: true
      },
      weight: {
        type: String,
        required: true
      },
      pngFileName: {
        type: String,
        required: true
      },
      examId: {
        type: String,
        required: true
      },
      icu: {
        type: String,
        required: true
      },
      numIcuAdmits: {
        type: String,
        required: true
      },
      mortality: {
        type: String,
        required: true
      },
      
    }, {timestamps: true});
  
    const Exam = mongoose.model('exam', ExamSchema)

    module.exports = Exam;