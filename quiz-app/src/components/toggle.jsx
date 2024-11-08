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
    <div>
      <input  
      type="checkbox"
      id='check'
      className='toggle'
      onClick={toggleTheme}
       />
       <label htmlFor="check"> Dark Mood</label>
    </div>
  );
}