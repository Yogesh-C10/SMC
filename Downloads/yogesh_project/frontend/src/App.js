// import React from 'react';
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// import Home from './pages/+';
// import Dashboard from './pages/Dashboard';
// import SignUp from './components/SignUp';
// import MarksAnalysis from './components/MarksAnalysis';
// import AptitudeTest from './components/AptitudeTest';
// import CounselingAppointment from './components/CounselingAppointment';
// import Webinars from './components/Webinars';

// const App = () => {
//     return (
//         <Router>
//             <Switch>
//                 <Route path="/" exact component={Home} />
//                 <Route path="/signup" component={SignUp} />
//                 <Route path="/dashboard" component={Dashboard} />
//                 <Route path="/marks-analysis" component={MarksAnalysis} />
//                 <Route path="/aptitude-test" component={AptitudeTest} />
//                 <Route path="/counseling-appointment" component={CounselingAppointment} />
//                 <Route path="/webinars" component={Webinars} />
//             </Switch>
//         </Router>
//     );
// };

// export default App;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import SignUp from './components/SignUp';
import MarksAnalysis from './components/MarksAnalysis';
import AptitudeTest from './components/AptitudeTestList';
import CounselingAppointment from './components/CounselingAppointment';
import Webinars from './components/Webinars';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/marks-analysis" element={<MarksAnalysis />} />
          <Route path="/aptitude-test" element={<AptitudeTest />} />
          <Route path="/counseling-appointment" element={<CounselingAppointment />} />
          <Route path="/webinars" element={<Webinars />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
