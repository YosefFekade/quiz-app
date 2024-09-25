import React from 'react';

const QuizHistory = ({ history, clearHistory }) => {
  return (
    <div className="quiz-history mt-8">
      <h2 className="text-2xl font-bold mb-4">Quiz History</h2>
      {history.length > 0 ? (
        <>
          <table className="min-w-full table-auto bg-white border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Date</th>
                <th className="px-4 py-2 border">Topic</th>
                <th className="px-4 py-2 border">Score</th>
                <th className="px-4 py-2 border">Total Questions</th>
              </tr>
            </thead>
            <tbody>
              {history.map((entry, index) => (
                <tr key={index} className="text-center">
                  <td className="px-4 py-2 border">{entry.date}</td>
                  <td className="px-4 py-2 border">{entry.topic}</td>
                  <td className="px-4 py-2 border">{entry.score}</td>
                  <td className="px-4 py-2 border">{entry.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="mt-4 p-2 bg-red-500 text-white rounded"
            onClick={clearHistory}
          >
            Clear History
          </button>
        </>
      ) : (
        <p>No quizzes taken yet.</p>
      )}
    </div>
  );
};

export default QuizHistory;
