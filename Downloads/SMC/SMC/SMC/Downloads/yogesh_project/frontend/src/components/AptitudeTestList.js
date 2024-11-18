import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate for redirecting
import './AptitudeTestList.css';

function AptitudeTestList() {
  const [score, setScore] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);
  const navigate = useNavigate(); // Initialize navigate for redirection

  // List of available tests
  const tests = [
    { name: 'Aptitude Test 1', link: '/test1' },
    { name: 'Aptitude Test 2', link: '/test2' },
  ];

  // Function to simulate taking a test
  const takeTest = (testName) => {
    const mockScore = Math.floor(Math.random() * 100);
    setSelectedTest(testName);
    setScore(mockScore);
  };

  // Check if the session is expired
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

  return (
    <div className="test-list-container">
      <h2 className="title">Available Aptitude Tests</h2>
      <p className="description">
        Challenge yourself with these carefully curated aptitude tests. Each test contains 20 questions and is timed for 30 minutes.
      </p>
      <p className="description">
        Select a test from the list below to evaluate your skills and get a score instantly!
      </p>

      {tests.map((test, index) => (
        <div key={index} className="test-card">
          <div className="test-details">
            <h3>{test.name}</h3>
          </div>
          <Link to={test.link}>
            <button className="take-test-btn" onClick={() => takeTest(test.name)}>Take Test</button>
          </Link>
        </div>
      ))}

      {score !== null && selectedTest && (
        <div className="score-display">
          <p>
            <strong>{selectedTest}</strong> - Your Score: {score}
          </p>
        </div>
      )}
    </div>
  );
}

export default AptitudeTestList;
