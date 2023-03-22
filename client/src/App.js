import './App.css';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Exams from './components/Exams';
import Exam from './components/Exam';
import Error from './components/Error';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Patient from './components/Patient';
import Edit from './components/Edit';
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
       <Route path = '/exams/:_id/edit' element = {<Edit/>}/>
        <Route path = '/exams/new' element = {<NewExamForm/>}/>
       <Route path = '/exams/:_id' element   = {<Exam/>}/>
      <Route path = '/admin' element = {<Admin/>}/>
      <Route path = '*' element = {<Error/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
