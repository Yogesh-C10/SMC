import React, { useState } from 'react';
import decisionTree from '../utils/decisionTree';
import './MarksAnalysis.css';

function MarksAnalysis() {
  const [marks, setMarks] = useState([
    { maxMarks: '', scoredMarks: '' },
    { maxMarks: '', scoredMarks: '' },
    { maxMarks: '', scoredMarks: '' },
    { maxMarks: '', scoredMarks: '' }
  ]);
  const [courseRecommendation, setCourseRecommendation] = useState('');

  const subjects = ['Maths', 'Science', 'Social', 'English'];

  const handleChange = (index, field, value) => {
    const updatedMarks = [...marks];
    updatedMarks[index][field] = value;
    setMarks(updatedMarks);
  };

  const calculatePercentage = (scored, max) => {
    return max ? Math.min((scored / max) * 100, 100) : 0;
  };

  const analyzeMarks = () => {
    const transformedMarks = marks.map(({ scoredMarks, maxMarks }) => calculatePercentage(scoredMarks, maxMarks));
    const recommendation = decisionTree(transformedMarks);
    setCourseRecommendation(recommendation);
  };

  return (
    <div className="marks-analysis-container">
      <h2>Marks Analysis</h2>
      {marks.map((mark, index) => (
        <div className="marks-input-group" key={index}>
          <input
            type="number"
            placeholder="Max Marks"
            value={mark.maxMarks}
            onChange={(e) => handleChange(index, 'maxMarks', e.target.value)}
            min="1"
            required
          />
          <input
            type="number"
            placeholder="Marks Scored"
            value={mark.scoredMarks}
            onChange={(e) => handleChange(index, 'scoredMarks', e.target.value)}
            min="0"
            max={mark.maxMarks || 100}
            required
          />
        </div>
      ))}
      <button onClick={analyzeMarks}>Analyze</button>
      <hr className="divider-line" />
      {courseRecommendation && <p>Recommended Course: {courseRecommendation}</p>}

      <div className="graph-container">
        <div className="y-axis-label">Percentage</div>
        <div className="graph-bars">
          {marks.map((mark, index) => (
            <div className="graph-bar-container" key={index}>
              <div
                className="graph-bar"
                style={{ height: `${calculatePercentage(mark.scoredMarks, mark.maxMarks) * 2}px` }}
              ></div>
              <div className="x-axis-label">{subjects[index]}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MarksAnalysis;
