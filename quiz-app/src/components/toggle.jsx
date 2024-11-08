import React from 'react';

import './Toggle.css'

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