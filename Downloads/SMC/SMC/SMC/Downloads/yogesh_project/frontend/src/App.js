import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignUp from './components/Auth/SignUp';
import AptitudeTest from './components/AptitudeTestList';
import CounselingAppointment from './components/CounselingAppointment';
import Webinars from './components/Webinars';
import Test1 from './pages/Test1';
import Test2 from './pages/Test2';
import Login from  './components/Auth/SignIn';
import AddMarks from './components/AddMarks';


function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} /> 
          <Route path="/home" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/counseling-appointment" element={<CounselingAppointment />} />
          <Route path="/webinars" element={<Webinars />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/test1" element={<Test1/>} />
          <Route path="/test2" element={<Test2/>} />
          <Route path="/add-marks" element={<AddMarks/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
