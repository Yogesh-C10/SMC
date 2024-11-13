import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignUp from './components/Auth/SignUp';
import MarksAnalysis from './components/MarksAnalysis';
import AptitudeTest from './components/AptitudeTestList';
import CounselingAppointment from './components/CounselingAppointment';
import Webinars from './components/Webinars';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import Login from  './components/Auth/SignIn';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/Login" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marks-analysis" element={<MarksAnalysis />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/counseling-appointment" element={<CounselingAppointment />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/test1" element={<Test1/>} />
          <Route path="/test2" element={<Test2/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
