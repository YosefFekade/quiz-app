import React, { useState } from 'react';

const QuizStart = ({ categories, onStartQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);

  // Filter the categories based on the search query
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStartQuiz = () => {
    if (selectedCategory) {
      onStartQuiz(selectedCategory.id, selectedCategory.name, difficulty, numQuestions);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSearchQuery(category.name);
    setDropdownOpen(false); // Close the dropdown on selection
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Start a Quiz</h2>

      {/* Filterable Dropdown for Categories */}
      <div className="mb-4 relative">
        <label className="block text-lg mb-2">Select a Category</label>
        <div
          className="relative"
          onClick={() => setDropdownOpen((prev) => !prev)}
        >
          <input
            type="text"
            placeholder="Search or select a category..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setDropdownOpen(true); // Show dropdown when user types
            }}
            className="border px-4 py-2 rounded-md w-full cursor-pointer"
            readOnly={dropdownOpen ? false : true} // Disable typing when dropdown is closed
          />
        </div>

        {/* Dropdown Menu */}
        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white border rounded-md max-h-60 overflow-y-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (
                <li
                  key={category.id}
                  onClick={() => handleCategorySelect(category)}
                  className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500">No categories found</li>
            )}
          </ul>
        )}
      </div>

      {/* Difficulty selection */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Select Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>

      {/* Number of questions */}
      <div className="mb-4">
        <label className="block text-lg mb-2">Number of Questions</label>
        <input
          type="number"
          min="1"
          max="50"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border px-4 py-2 rounded-md w-full"
        />
      </div>

      {/* Start Quiz Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors"
        onClick={handleStartQuiz}
        disabled={!selectedCategory}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default QuizStart;
