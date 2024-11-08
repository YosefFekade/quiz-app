{/* <button
              onClick={toggleTheme}
              className="bg-gray-800 text-white py-2 px-4 rounded-md hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-800 dark:hover:bg-gray-300 transition-colors"
            >
              {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
            </button> */}


// DarkModeToggle.jsx
import React from 'react';

export default function DarkModeToggle( {toggleTheme }) {


  return (
    <button
      onClick={toggleTheme }
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-100 transition-colors"
      aria-label="Toggle dark mode"
    >
      {true ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M17.293 17.293a8 8 0 01-11.313-11.313 8 8 0 0011.313 11.313z"
            clipRule="evenodd"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
           <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m8-8h1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707M16.95 7.05l.707-.707M7.05 16.95l.707-.707M12 5a7 7 0 100 14 7 7 0 000-14z"
          />
          
        </svg>
      )}
    </button>
  );
}