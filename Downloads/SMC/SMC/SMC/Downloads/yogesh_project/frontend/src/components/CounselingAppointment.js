import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Webinars.css'; // Import CSS for styling

function CounselingAppointment() {
  // State for storing webinars and counseling data
  const [counselors, setCounselors] = useState({});
  const navigate = useNavigate(); // Use navigate hook for programmatic navigation

  
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
    } else {
      navigate('/');
    } 
  }, [navigate]); // Run this effect on component mount


  // Fetch counseling data
  useEffect(() => {
    const fetchCounselors = async () => {
      try {
        const response = await axios.get('http://192.168.29.168:8000/api/counselling/');
        setCounselors(response.data.data); // Assuming API structure as response.data.data
      } catch (error) {
        console.error("Error fetching counselors:", error);
      }
    };

    fetchCounselors();
  }, []);

  return (
    <div className="webinars-container">
     
      {/* Counselors Section */}
      <h2>Counseling Sessions</h2>
      <div className="webinar-list">
        {Object.entries(counselors).map(([counselorName, slots], index) => (
          <div key={index} className="webinar-box">
            <h3>{counselorName}</h3>
            <p><strong>Slot 1:</strong> {slots.slot1}</p>
            <p><strong>Slot 2:</strong> {slots.slot2}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CounselingAppointment;
