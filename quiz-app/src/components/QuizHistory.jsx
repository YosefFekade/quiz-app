import React from 'react';

const QuizHistory = ({ history, clearHistory }) => {
  return (
    <div className="quiz-history p-4 border rounded shadow-md  border-black max-w-md mx-auto mt-8">
      <h2 className="text-center text-2xl font-bold mb-4">Quiz History</h2>
      
      {history.length > 0 ? (
        <ul className="space-y-4">
          {history.map((entry, index) => (
            <li key={index} className="p-4 border rounded shadow-sm bg-white dark:bg-gray-800">
              <div className="font-semibold ">
                <span className="text-gray-700  dark:text-gray-200">Topic:</span> {entry.topic || 'Unknown Topic'}
              </div>
              <div>
                <span className="text-gray-700 dark:text-gray-200">Score:</span> {entry.score} / {entry.total}
              </div>
              <div>
                <span className="text-gray-700 dark:text-gray-200">Date:</span> {entry.date}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        null
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
}

export default QuizHistory;
