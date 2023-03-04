import './App.css';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Exams from './components/Exams';
import Exam from './components/Exam';
import Login from './components/Uncompleted/Login';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Redirect } from 'react-router-dom';
import Patient from './components/Patient';
import Edit from './components/Edit';
import NewExamForm from './components/NewExamForm';
import SignUp from './components/Uncompleted/SignUp';

function App() {

  return (
    <div className="App">   

  <Router> 
    <Navbar/>
    <Routes>   
    <Route exact path="/" element={<Redirect to="/exams" />} />
      <Route path = '/exams' element = {<Exams/>}/> 
       <Route path = '/patient/:patientId' element  = {<Patient/>}/>
       <Route path = '/exams/:_id/edit' element = {<Edit/>}/>
       <Route path = '/sign-up' element = {<SignUp/>}/>
       <Route path = '/login' element = {<Login/>}/>
        <Route path = '/exams/new' element = {<NewExamForm/>}/>
       <Route path = '/exams/:_id' element   = {<Exam/>}/>
      <Route path = '/admin' element = {<Admin/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
