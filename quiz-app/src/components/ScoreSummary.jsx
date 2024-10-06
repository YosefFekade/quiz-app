import React from 'react';

const ScoreSummary = ({ score, total, questions, userAnswers, onRetakeQuiz }) => {
  return (
    <div className="score-summary bg-white dark:bg-gray-800 p-4 border rounded shadow-md text-center">
      <h2 className="bg-gradient-to-r from-blue-400 to-teal-600  text-transparent bg-clip-text text-xl md:text-3xl font-weight: 900 font-serif font-extrabold">Quiz Complete!</h2>
      
      <p className="text-xl mb-4">Your Score: {score} / {total}</p>
      
      <h3 className="text-2xl font-bold mb-4">Summary of Answers</h3>
      
      <div className="answers-summary mb-4">
        {questions.map((question, index) => (
          <div key={index} className="mb-4">
            <h4 className="font-semibold" dangerouslySetInnerHTML={{ __html: question.question }} />
            <p className="text-sm">
              <span className={`font-bold ${userAnswers[index] === question.correct_answer ? 'text-green-500' : 'text-red-500'}`}>
                {userAnswers[index] === question.correct_answer ? 'Correct' : 'Incorrect'}
              </span> 
              - Your Answer: <span dangerouslySetInnerHTML={{ __html: userAnswers[index] }} />
            </p>
            {userAnswers[index] !== question.correct_answer && (
              <p className="text-sm text-gray-500">
                Correct Answer: <span dangerouslySetInnerHTML={{ __html: question.correct_answer }} />
              </p>
            )}
          </div>
        ))}
      </div>
      
      <button 
        className="p-2 bg-blue-500 text-white rounded mt-4 dark:bg-gray-500 dark:text-gray-200" 
        onClick={onRetakeQuiz}
      >
        Take another quiz
      </button>
    </div>
  );
}

export default ScoreSummary;