import React, { useState } from 'react';

const QuizStart = ({ categories, onStartQuiz }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('easy');
  const [numberOfQuestions, setNumberOfQuestions] = useState(5);

  const startQuiz = () => {
    if (selectedCategory && selectedDifficulty) {
      onStartQuiz(selectedCategory, selectedDifficulty, numberOfQuestions);
    } else {
      alert('Please select a category and difficulty.');
    }
  };

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-2xl font-bold mb-4">Start Your Quiz</h1>
      <div className="flex flex-col mb-4">
        <label>Category:</label>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-2 border rounded">
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label>Difficulty:</label>
        <select value={selectedDifficulty} onChange={(e) => setSelectedDifficulty(e.target.value)} className="p-2 border rounded">
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
      <div className="flex flex-col mb-4">
        <label>Number of Questions:</label>
        <input type="number" min="1" max="50" value={numberOfQuestions} onChange={(e) => setNumberOfQuestions(e.target.value)} className="p-2 border rounded" />
      </div>
      <button onClick={startQuiz} className="p-2 bg-blue-500 text-white rounded">Start Quiz</button>
    </div>
  );
};

export default QuizStart;