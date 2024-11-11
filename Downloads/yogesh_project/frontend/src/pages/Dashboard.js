import React from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <p>Welcome back! Here is an overview of your academic activities:</p>

      <div className="dashboard-section">
        <h3>Upcoming Appointments</h3>
        <p>No upcoming appointments. <span onClick={() => handleNavigation('/counseling-appointment')} className="dashboard-link">Book Now</span></p>
      </div>

      <div className="dashboard-section">
        <h3>Recent Aptitude Test Score</h3>
        <p>Your last score: <strong>85/100</strong>. <span onClick={() => handleNavigation('/aptitude-test')} className="dashboard-link">Take Test Again</span></p>
      </div>

      <div className="dashboard-section">
        <h3>Marks Analysis</h3>
        <p>View your recommended courses: <span onClick={() => handleNavigation('/marks-analysis')} className="dashboard-link">Analyze Marks</span></p>
      </div>

      <div className="dashboard-section">
        <h3>Webinars & Courses</h3>
        <p>Check out the latest webinars: <span onClick={() => handleNavigation('/webinars')} className="dashboard-link">View Webinars</span></p>
      </div>
    </div>
  );
}

export default Dashboard;
