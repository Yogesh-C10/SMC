import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; // Import the CSS file for styling

function Home() {
  return (
    <div className='home_background'>
      <div className="home">
        <h1>Welcome to Smart Student Monitoring System</h1>
        <p>Your one-stop platform for academic guidance, aptitude analysis, and counseling.</p>
        
        <div className="home-links">
          <Link to="/marks-analysis">
            <button className="home-button">Marks Analysis</button>
          </Link>
          <Link to="/aptitude-test">
            <button className="home-button">Aptitude Test</button>
          </Link>
          <Link to="/counseling-appointment">
            <button className="home-button">Counseling Appointment</button>
          </Link>
          <Link to="/webinars">
            <button className="home-button">Webinars & Courses</button>
          </Link>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
