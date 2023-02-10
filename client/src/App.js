import './App.css';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Exams from './components/Exams';
import Exam from './components/Exam';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useApi } from './hooks/use-api';
import Patient from './components/Patient';

function App() {
 const response = useApi();
  return (
    <div className="App">   

  <Router> 
    <Navbar/>
    <Routes>   
      <Route path = '/' element = {<Exams/>}/>
      <Route path = '/exams' element = {<Exams/>}/> 
       <Route path = '/patient/:patientId' element  = {<Patient/>}/>
       <Route path = '/exam/:_id' element   = {<Exam/>}/>
      <Route path = '/admin' element = {<Admin/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
