import React, { useState } from 'react';

const QuizStart = ({ categories, onStartQuiz }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [difficulty, setDifficulty] = useState('easy');
  const [numQuestions, setNumQuestions] = useState(5);
  
  // Filters the categories based on the search query from the user 
  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchQuery.toLowerCase())// The filter method checks if each category’s name includes a text in the searchQuery typed by the user
  )

  {/* Function to handel selection of a catagory when triggered from the dropdown*/}
  const handleCategorySelect = (category) => {
    setSelectedCategory(category)
    setSearchQuery(category.name)
    setDropdownOpen(false) // Close the dropdown on selection
  }

  
   {/* Function to make sure user has selected a catagory to move on to the questions */}
  const handleStartQuiz = () => {
    if (selectedCategory&&numQuestions.length>0) {
      onStartQuiz(selectedCategory.id, selectedCategory.name, difficulty, numQuestions) // This will send input values of the user to the app.jsx as parameters
    }
  }

  return (
    <div className="p-4 text-center bg-white mb-4 dark:bg-gray-800 shadow-md rounded-md">
      <h2 className="text-2xl text-center font-bold mb-4 text-gray-900 dark:text-gray-100">Start A Quiz</h2>

      {/* Filterable Dropdown for Categories */}
      <div className="mb-4 relative">
        <label className="block text-left text-lg mb-2 text-gray-900 dark:text-gray-100">Select a Category</label>
        <input
          type="text"
          placeholder="Search for a category to start a Quiz..."
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setDropdownOpen(true); // Show dropdown when user types
          }}
          className="border px-4 py-2 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
        {/* Dropdown logic controlled by a ternary operator*/}
        {dropdownOpen && (
          <ul className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-700 border rounded-md max-h-60 overflow-y-auto">
            {filteredCategories.length > 0 ? (
              filteredCategories.map((category) => (  // logic will make it displays only categories that match the search query
                <li
                  key={category.id}
                  onClick={() => handleCategorySelect(category)} //passing in the catagory that was selected by a user as a parameter to the handle function
                  className="px-4 py-2 cursor-pointer hover:bg-blue-200 dark:hover:bg-gray-600"
                >
                  {category.name}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-red-500 dark:text-red-300">No categories found</li>
            )}
          </ul>
        )}
      </div>

      {/* Difficulty selection */}
      <div className="mb-4">
        <label className="block text-left text-lg mb-2 text-gray-900 dark:text-gray-100">Select Difficulty</label>
        <select
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
          className="border px-4 py-2 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        >
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      {/* Number of questions */}
      <div className="mb-4">
        <label className="block text-left text-lg mb-2 text-gray-900 dark:text-gray-100">Number of Questions</label>
        <input
          type="number"
          min="1"
          max="25"
          value={numQuestions}
          onChange={(e) => setNumQuestions(e.target.value)}
          className="border px-4 py-2 rounded-md w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
        />
      </div>

      {/* Start Quiz Button */}
      <button
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-colors"
        onClick={handleStartQuiz}
        disabled={!selectedCategory}
      >
        Start Quiz
      </button>
    </div>
  )
}

export default QuizStart;
