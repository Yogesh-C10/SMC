import React, { useState } from 'react';
import './AptitudeTestList.css'; // Import the CSS file

function AptitudeTestList() {
  const [score, setScore] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

  // List of available tests
  const tests = [
    'Aptitude Test (Random Questions)',
    'Aptitude Test 1',
    'Aptitude Test 2',
    
  ];

  // Function to simulate taking a test
  const takeTest = (testName) => {
    const mockScore = Math.floor(Math.random() * 100);
    setSelectedTest(testName);
    setScore(mockScore);
  };

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
            <h3>{test}</h3>
            <p>Questions: 20 &nbsp; • &nbsp; 30 minutes</p>
          </div>
          <button className="take-test-btn" onClick={() => takeTest(test)}>
            Take Test
          </button>
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