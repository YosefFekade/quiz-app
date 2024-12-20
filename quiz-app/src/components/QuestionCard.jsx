import React, { useState, useEffect } from 'react';

const QuestionCard = ({ question, onAnswerSelect, currentQuestionIndex, totalQuestions, score }) => {
  const [shuffledAnswers, setShuffledAnswers] = useState([])
  const [selectedAnswer, setSelectedAnswer] = useState(null)
  const [correctAnswer, setCorrectAnswer] = useState(null)
  const [isAnswered, setIsAnswered] = useState(false)

  useEffect(() => {
    const answers = [question.correct_answer, ...question.incorrect_answers];
    setShuffledAnswers(answers.sort(() => Math.random() - 0.5)) //This randomization ensures that the correct answer is not always in the same position.
    //Reseting logic
    setSelectedAnswer(null) // Reset the selected answer on question change
    setIsAnswered(false) // Reset the answered state on question change
  }, [question])  // depends on the  question prop change, to shuffle the answers and reset any previous selections.

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer)
    setCorrectAnswer(question.correct_answer)
    setIsAnswered(true) // Mark the question as answered
  }

  return (
    <div className="question-card bg-white p-4 border rounded shadow-md mb-4  dark:bg-gray-800">
      {/* Question Number Display */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-xl font-bold">Question {currentQuestionIndex + 1} / {totalQuestions}</div>
        
        {/* Score Circle */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-600 text-white font-bold">
          {score}
        </div>
      </div>

      {/* Question Text */}
      <h2 className="text-xl mb-4" dangerouslySetInnerHTML={{ __html: question.question }} />

      {/* Answer Buttons */}
      <div className="answers grid grid-cols-1 gap-4">
        {shuffledAnswers.map((answer, index) => (
          <button
            key={index}
            className={`p-2 rounded border 
              ${selectedAnswer ? 
                (answer === correctAnswer ? 'bg-green-500 text-white dark:bg-green-400 ' : answer === selectedAnswer ? 'bg-red-500 text-white  dark:bg-red-400' : 'bg-gray-200 dark:bg-gray-800 dark:text-gray-200') 
                : 'bg-gray-200 dark:bg-gray-800 dark:text-gray-200'}
            `} //Conditinally renders to show the correct and incorrect answer after the user has selected the answer by clicking the button
            onClick={() => handleAnswerClick(answer)}
            dangerouslySetInnerHTML={{ __html: answer }}
            disabled={isAnswered} // Disable answers once one is selected
          />
        ))}
      </div>

      {/* Next Button */}
      {isAnswered && ( // When only answered the next button appear
        <div className="mt-4 text-center">
          <button
            className="p-2 bg-blue-500 text-white rounded dark:bg-gray-500 dark:text-gray-200"
            onClick={() => onAnswerSelect(selectedAnswer)}
          >
            Next
            
          </button>
        </div>
      )}
    </div>
  )
}

export default QuestionCard;