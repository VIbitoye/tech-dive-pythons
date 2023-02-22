import './App.css';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Exams from './components/Exams';
import Exam from './components/Exam';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patient from './components/Patient';
import Update from './components/Update';
import NewExamForm from './components/NewExamForm';

function App() {

  return (
    <div className="App">   

  <Router> 
    <Navbar/>
    <Routes>   
      <Route path = '/' element = {<Exams/>}/>
      <Route path = '/exams' element = {<Exams/>}/> 
       <Route path = '/patient/:patientId' element  = {<Patient/>}/>
       <Route path = '/update' element = {<Update/>}/>
       <Route path = '/exams/new' element = {<NewExamForm/>}/>
       <Route path = '/exams/:_id' element   = {<Exam/>}/>
      <Route path = '/admin' element = {<Admin/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
