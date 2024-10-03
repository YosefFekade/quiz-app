import React from "react";

const footer = () =>{
    return(
        <footer className="footer-container bg-dark-900 p-6 md:p-8 text-white">
        <div className="flex justify-between items-center">
          <div className="footer-left">
            <h2 className="text-lg md:text-xl font-semibold">SafeTech</h2>
          </div>
          <div className="footer-right flex space-x-4">
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-facebook"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-white hover:text-gray-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-sm text-gray-400">
          ©SafeTech 2024
        </div>
      </footer>
    )
}

export default footer;