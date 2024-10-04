import React from 'react';

const Logo = () => {
  return (
    <div className="logo-container  flex items-center justify-center h-60 md:h-80"> 
      <div className="logo-circle bg-gradient-to-r from-gray-800 to-gray-600  shadow-2xl  rounded-full w-32 h-32 md:w-48 md:h-48 flex items-center justify-center">
        <h1 className=" bg-gradient-to-r from-blue-300 to-teal-600  text-transparent bg-clip-text text-xl md:text-3xl font-bold">Quizzy</h1>
      </div>
    </div>
  )
}

export default Logo;