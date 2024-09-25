import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question, onAnswerSelect }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([]);

  useEffect(() => {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5));
  }, [question]);

  return (
    <div className="question-card p-4 border rounded shadow-md mb-4">
      <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />
      <div className="answers">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className="p-2 bg-gray-200 rounded mb-2 w-full"
            onClick={() => onAnswerSelect(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
          />
        ))}
      </div>
    </div>
  );
};

export default QuestionCard;
