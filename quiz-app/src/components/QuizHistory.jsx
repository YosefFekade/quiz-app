import React from 'react';

const QuizHistory = ({ history, clearHistory }) => {
  return (
    <div className="quiz-history p-4 border rounded shadow-md max-w-md mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="p-4 border rounded shadow-sm">
              <div className="font-semibold">
                <span className="text-gray-700">Topic:</span> {entry.topic || 'Unknown Topic'}
              </div>
              <div>
                <span className="text-gray-700">Score:</span> {entry.score} / {entry.total}
              </div>
              <div>
                <span className="text-gray-700">Date:</span> {entry.date}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No quiz history available.</p>
      )}

      {history.length > 0 && (
        <button
          className="p-2 bg-red-500 text-white rounded w-full mt-4"
          onClick={clearHistory}
        >
          Clear History
        </button>
      )}
    </div>
  );
};

export default QuizHistory;
