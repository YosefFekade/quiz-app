import React from 'react';

const ScoreSummary = ({ score, total, onRetakeQuiz }) => (
  <div className="score-summary p-4 text-center">
    <h2 className="text-2xl font-bold">Quiz Complete!</h2>
    <p className="mt-4">You scored {score} out of {total}</p>
    <button onClick={onRetakeQuiz} className="p-2 bg-blue-500 text-white rounded mt-4">Retake Quiz</button>
  </div>
);

export default ScoreSummary;
