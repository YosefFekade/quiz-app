import React from 'react';

const Logo = () => {
  return (
    <div className="logo-container  flex items-center justify-center h-60 md:h-80"> 
      <div className="logo-circle bg-gradient-to-r from-gray-900 to-gray-700  rounded-full w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
        <h1 className="text-teal-400 text-xl md:text-3xl font-bold">Quizzy</h1>
      </div>
    </div>
  )
}

export default Logo;