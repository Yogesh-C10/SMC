import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Webinars.css'; // Import CSS for styling

function Webinars() {
  // State for storing webinars and counseling data
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  const handleLogout = () => {
    // Clear any session or authentication data (e.g., localStorage)
    localStorage.removeItem('username');
    localStorage.removeItem('email'); // Or any other session data you are using
    localStorage.removeItem('log_out_time');
    // Redirect the user to the login page after logout
    navigate('/');
  };
  useEffect(() => {
    const expTime = localStorage.getItem('log_out_time');
    if (expTime) {
      const currentTime = new Date().getTime(); // Get current time in epoch
      if (currentTime > expTime) {
        localStorage.removeItem('username');  
        localStorage.removeItem('email'); // Or any other session data you are using
        localStorage.removeItem('log_out_time');
        navigate('/'); // Redirect to login if expired
      }

    }else {
      navigate('/');
    } 
  }, [navigate]); // Run this effect on component mount

  const [webinars, setWebinars] = useState({});
  // Fetch webinar data
  useEffect(() => {
    const fetchWebinars = async () => {
      try {
        const response = await axios.get('http://192.168.29.168:8000/api/webinars/');
        setWebinars(response.data.data); // Assuming API structure as response.data.data
      } catch (error) {
        console.error("Error fetching webinars:", error);
      }
    };

    fetchWebinars();
  }, []);

  return (
    <div className="webinars-container">
      {/* Webinars Section */}
      <h2>Upcoming Webinars</h2>
      <div className="webinar-list">
        {Object.entries(webinars).map(([title, details], index) => (
          <div key={index} className="webinar-box">
            <h3>{title}</h3>
            <p><strong>By:</strong> {details.by}</p>
            <p><strong>Time:</strong> {details.time}</p>
            <p><strong>Avenue:</strong> {details.avenue}</p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Webinars;
