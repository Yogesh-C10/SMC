import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddMarks.css'; // CSS file for styling

function AddMarks() {
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
    } 
  }, [navigate]); // Run this effect on component mount

  useEffect(() => {
    const expTime = localStorage.getItem('log_out_time');
    if (expTime) {
      const currentTime = new Date().getTime(); // Get current time in epoch
      if (currentTime > expTime) {
        navigate('/'); // Redirect to login if expired
      }
    } 
  }, [navigate]); // Run this effect on component mount
  const initialMarksData = {
    email: localStorage.getItem('email'),
    label: '1', // Default to class 1
    score: { maths: '', science: '', social: '' },
  };

  const [marksData, setMarksData] = useState(initialMarksData);
  const [status, setStatus] = useState('');
  const [studentMarks, setStudentMarks] = useState({});
  const [quizMarks, setQuizMarks] = useState({}); // To store quiz marks
  const [newClasses, setNewClasses] = useState([1]); // Keeps track of classes added

  useEffect(() => {
    const expTime = localStorage.getItem('log_out_time');
    if (expTime) {
      const currentTime = new Date().getTime(); // Get current time in epoch
      if (currentTime > expTime) {
        navigate('/'); // Redirect to login if expired
      }
      
    } else {
      navigate('/');
    } 
  }, [navigate]); // Run this effect on component mount

  // Fetch student marks and quiz marks when component mounts
  useEffect(() => {
    const fetchMarks = async () => {
      // Retrieve email from localStorage
      const email = localStorage.getItem('email');
      
      // Ensure email is available before making the API call
      if (!email) {
        console.error('Email not found in localStorage');
        return;
      }

      const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `http://192.168.29.168:8000/api/schoolmarks/?email=${email}`,
        headers: { 'Content-Type': 'application/json' },
      };

      try {
        const response = await axios.request(config);
        setStudentMarks(response.data.marks || {}); // Set marks to state
        setQuizMarks(response.data.quiz || {}); // Set quiz marks to state
      } catch (error) {
        console.error('Failed to fetch student marks:', error);
      }
    };

    fetchMarks();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('score.')) {
      const field = name.split('.')[1];
      setMarksData((prev) => ({
        ...prev,
        score: { ...prev.score, [field]: value },
      }));
    } else {
      setMarksData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async () => {
    const config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://192.168.29.168:8000/api/schoolmarks/',
      headers: { 'Content-Type': 'application/json' },
      data: JSON.stringify(marksData),
    };

    try {
      const response = await axios.request(config);
      if (response.status === 200) {
        setStatus('User details updated successfully!');
        // Reset form fields after successful submission
        setMarksData(initialMarksData);
        // Fetch updated marks
        window.location.reload(); // This will reload the page and reflect the updated data
      }
    } catch (error) {
      setStatus('Failed to update user details. Please try again.');
      console.error(error);
    }
  };

  const handleAddClass = () => {
    const nextClass = Math.min(...newClasses) + 1;
    if (newClasses.length < 12 && !newClasses.includes(nextClass)) {
      setNewClasses((prev) => [...prev, nextClass]);
    }
  };

  return (
    <div className="addmarks-container">
      <h1>Student Marks</h1>
      {/* Display student marks */}
      <div className="student-marks">
        {Object.keys(studentMarks).length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Class</th>
                <th>Maths</th>
                <th>Science</th>
                <th>Social</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(studentMarks).map(([classLabel, scores]) => (
                <tr key={classLabel}>
                  <td>{classLabel}</td>
                  <td>{scores.maths}</td>
                  <td>{scores.science}</td>
                  <td>{scores.social}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No marks available.</p>
        )}
      </div>

      {/* Display quiz marks */}
      <div className="quiz-marks">
        {Object.keys(quizMarks).length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Quiz</th>
                <th>Marks</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(quizMarks).map(([quizName, quizScore]) => (
                <tr key={quizName}>
                  <td>{quizName}</td>
                  <td>{quizScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No quiz marks available.</p>
        )}
      </div>

      {/* Add marks form */}
      <div className="addmarks-form">
        <h2>Add Marks</h2>
        <label>Class (Label):</label>
        <select
          name="label"
          value={marksData.label}
          onChange={handleChange}
          required
        >
          {[...Array(12).keys()].map((n) => (
            <option key={n + 1} value={n + 1}>
              {n + 1}
            </option>
          ))}
        </select>
        <div className="scores-section">
          <label>Maths:</label>
          <input
            type="number"
            name="score.maths"
            value={marksData.score.maths}
            onChange={handleChange}
            placeholder="Enter marks"
            required
          />
          <label>Science:</label>
          <input
            type="number"
            name="score.science"
            value={marksData.score.science}
            onChange={handleChange}
            placeholder="Enter marks"
            required
          />
          <label>Social:</label>
          <input
            type="number"
            name="score.social"
            value={marksData.score.social}
            onChange={handleChange}
            placeholder="Enter marks"
            required
          />
        </div>
        <button onClick={handleSubmit} className="submit-button">
          Submit
        </button>
      </div>
      <div className="status-message">{status}</div>
    </div>
  );
}

export default AddMarks;
