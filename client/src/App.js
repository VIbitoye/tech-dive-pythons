import './App.css';
import Admin from './components/Admin';
import Navbar from './components/Navbar';
import Exams from './components/Exams';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useApi } from './hooks/use-api';

function App() {
 const response = useApi();
  return (
    <div className="App">   

  <Router> 
    <Navbar/>
    <Routes>
      <Route path = '/exams' element = {<Exams/>}/>
      <Route path = '/' element = {<Exams/>}/>
      <Route path = '/admin' element = {<Admin/>}/>
    </Routes>
    </Router>
    </div>
  );
}

export default App;
