import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AptitudeTestList.css'; // Keep the existing CSS import

function AptitudeTestList() {
  const [score, setScore] = useState(null);
  const [selectedTest, setSelectedTest] = useState(null);

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
