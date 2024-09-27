import React, { useState } from 'react';

const QuizStart = ({ categories, onStartQuiz }) => {
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const [amount, setAmount] = useState(5);
  const [searchQuery, setSearchQuery] = useState(''); // State to track the search query

  // Filter categories based on the search query
  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle category selection and also store category name
  const handleCategoryChange = (e) => {
    const selectedId = e.target.value;
    const selectedCategory = categories.find((cat) => cat.id == selectedId);

    setCategoryId(selectedId);
    setCategoryName(selectedCategory?.name || '');
  };

  // Handle start quiz
  const handleStartQuiz = () => {
    onStartQuiz(categoryId, categoryName, difficulty, amount);
  };

  return (
    <div className="quiz-start p-4 border rounded shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Start a Quiz</h2>

      {/* Search bar for quiz topics */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search quiz topics..."
          className="w-full p-2 border rounded"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Display filtered categories */}
      {filteredCategories.length > 0 ? (
        <div className="mb-4">
          <label className="block font-semibold mb-2">Select Topic:</label>
          <select
            className="w-full p-2 border rounded"
            value={categoryId}
            onChange={handleCategoryChange}
          >
            <option value="">-- Select a category --</option>
            {filteredCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      ) : (
        <p className="text-red-500 mb-4">No quiz topics found for "{searchQuery}".</p>
      )}

      {/* Difficulty Level */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Select Difficulty:</label>
        <select
          className="w-full p-2 border rounded"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Number of Questions */}
      <div className="mb-4">
        <label className="block font-semibold mb-2">Number of Questions:</label>
        <input
          type="number"
          min="1"
          max="50"
          value={amount}
          className="w-full p-2 border rounded"
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      {/* Start Quiz Button */}
      <button
        className="p-2 bg-blue-500 text-white rounded w-full"
        onClick={handleStartQuiz}
        disabled={!categoryId}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
