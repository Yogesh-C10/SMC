import React, { useState, useEffect, useCallback } from 'react';
import API from '../services/api';
import './Test.css';

const questions = [
  { question: "The Quit India Movement was launched in which year?", options: ["1927", "1942", "1930", "1947"], correctAnswer: "1942" },
  { question: "Which of the following is NOT a cause of the First War of Indian Independence (1857)?", options: ["Political annexations", "Religious interference", "Economic exploitation", "Demand for independence"], correctAnswer: "Demand for independence" },
  { question: "Which of the following is NOT a type of rainfall?", options: ["Convectional", "Cyclonic", "Orographic", "Frontal"], correctAnswer: "Frontal" },
  { question: "The Indian Ocean is bordered by which of the following continents?", options: ["Europe, Asia, and Africa", "Asia, Africa, and Australia", "Asia, Africa, and Antarctica", "Asia, Europe, and North America"], correctAnswer: "Asia, Africa, and Australia" },
  { question: "Which river is known as the 'Sorrow of Bengal'?", options: ["Yamuna", "Brahmaputra", "Ganges", "Hooghly"], correctAnswer: "Brahmaputra" },
  { question: "What is the most important factor affecting the climate of India?", options: ["Latitude", "Altitude", "Monsoon winds", "Distance from the sea"], correctAnswer: "Monsoon winds" },
  { question: "Which of the following states is known for the cultivation of tea?", options: ["Punjab", "Rajasthan", "Assam", "Uttar Pradesh"], correctAnswer: "Assam" }
];

export default function TestPage2() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const [markedForReview, setMarkedForReview] = useState(Array(questions.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(questions.length * 60); // 1 minute per question
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSubmit = useCallback(() => {
    let calculatedScore = 0;
    answers.forEach((answer, index) => {
      if (answer === questions[index].correctAnswer) {
        calculatedScore += 1;
      }
    });
    setScore(calculatedScore);
    setSubmitted(true);

    // Call the API with the score
    const data = {
      email: localStorage.getItem('email'),
      label: "quiz1",
      score: calculatedScore
    };

    API.post('/api/quizmarks/', data)
      .then((response) => {
        console.log("API Response:", response.data);
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
      });
  }, [answers]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => setTimeLeft(prevTimeLeft => prevTimeLeft - 1), 1000);
      return () => clearInterval(timerId);
    } else {
      handleSubmit(); // Auto-submit on timeout
    }
  }, [timeLeft, handleSubmit]);

  const handleChange = (answer) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestionIndex] = answer;
    setAnswers(newAnswers);
  };

  const handleMarkForReview = () => {
    const newMarked = [...markedForReview];
    newMarked[currentQuestionIndex] = !newMarked[currentQuestionIndex];
    setMarkedForReview(newMarked);
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  if (submitted) {
    return (
      <div className="result-page">
        <h1>Test Submitted</h1>
        <p>Your Score: {score} out of {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="test-page">
      <header className="test-header">
        <h1>Mock Test</h1>
        <div className="timer">
          Time Left: {minutes}:{seconds < 10 ? `0${seconds}` : seconds} mins
        </div>
      </header>
      <div className="main-content">
        <div className="question-panel">
          <h2>Question {currentQuestionIndex + 1}</h2>
          <p>{questions[currentQuestionIndex].question}</p>
          <div className="options">
            {questions[currentQuestionIndex].options.map((option, idx) => (
              <div key={idx} className="option">
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={option}
                  checked={answers[currentQuestionIndex] === option}
                  onChange={() => handleChange(option)}
                />
                <label>{option}</label>
              </div>
            ))}
          </div>
          <button className="mark-for-review" onClick={handleMarkForReview}>
            {markedForReview[currentQuestionIndex] ? "Unmark Review" : "Mark for Review"}
          </button>
          <br />
          <div className="navigation">
            <button className="prev-btn" onClick={handlePrev} disabled={currentQuestionIndex === 0}>Previous</button>
            {currentQuestionIndex === questions.length - 1 && (
              <button className="submit-btn" onClick={handleSubmit}>Submit Test</button>
            )}
            <button className="next-btn" onClick={handleNext} disabled={currentQuestionIndex === questions.length - 1}>Next</button>
          </div>
        </div>

        <div className="answer-tracker">
          <h3>Question Analysis</h3>
          <div className="questions-grid">
            {questions.map((_, index) => (
              <button
                key={index}
                className={`question-btn ${answers[index] ? "answered" : "unanswered"} ${markedForReview[index] ? "marked" : ""}`}
                onClick={() => setCurrentQuestionIndex(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
